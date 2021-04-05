<script lang="ts">
    import {fillEmptyTimestamps} from "../utils";
    import {popUpMessageStore} from "../../../../stores/popupMessagesStore";
    import {onMount} from "svelte";
    import LoadingSpinner from "../../../shared/LoadingSpinner.svelte";
    import DateTimeGraph from "../components/DateTimeGraph.svelte";
    import GraphTiming from "../components/GraphTiming.svelte";
    import {ServerRAMUsageService} from "../../../../services/server/serverRAMUsageService";
    import type {RamUsage} from "../../../../models/server/ramUsage";
    import type {Server} from "../../../../models/server/server";

    export let server: Server

    let unitSizeUsed: string = 'byte'
    let fetchingPromise;
    let ramUsagesOfServer: RamUsage[]
    let graphTimeText: string = ''

    onMount(() => {
        getAndSetRamUsages(5)
    })

    function getAndSetRamUsages(minutesBackWordsToFetch: number): void {
        let fromDate: Date = new Date()
        fromDate.setMinutes(fromDate.getMinutes() - minutesBackWordsToFetch)
        let toDate: Date = new Date()

        fetchingPromise = ServerRAMUsageService.getRAMUsagesOfServer(server, {
            from: fromDate,
            to: toDate
        }).then((cpuUsages) => {
            ramUsagesOfServer = fillEmptyTimestamps(cpuUsages, minutesBackWordsToFetch, fromDate, toDate, (generatedDate: Date) => {
                    return {
                        usageInBytes: null,
                        totalAvailableInBytes: null,
                        createdAt: generatedDate
                    }
                }
            ) as RamUsage[]
        }).catch((ex) => {
            popUpMessageStore.addMessage('Could not fetch RAM usages.')
        })
    }

    function getMaximumAvailableRAM(): number {
        // searches for the highest possible ram available in current list
        const max = ramUsagesOfServer.reduce(function(prev, current) {
            return (prev.totalAvailableInBytes > current.totalAvailableInBytes) ? prev : current
        }).totalAvailableInBytes

        console.log(max)
        return max
    }

    function onNewGraphTime(event): void {
        graphTimeText = event.detail.text
        getAndSetRamUsages(event.detail.minutesFromNow)
    }
</script>

<article>
    <h3>RAM usage Graph of past {graphTimeText}</h3>
    {#await fetchingPromise}
        <LoadingSpinner />
    {:catch e}
        <span>Failed to load ram usage data</span>
    {/await}

    {#if ramUsagesOfServer}
        <DateTimeGraph
            x={ramUsagesOfServer.map((cpuUsage) => cpuUsage.usageInBytes)}
            y={ramUsagesOfServer.map((cpuUsage) => cpuUsage.createdAt)}
            maxYValue="{getMaximumAvailableRAM()}"
        />
    {/if}
    <GraphTiming on:time-selected={onNewGraphTime} />
</article>
