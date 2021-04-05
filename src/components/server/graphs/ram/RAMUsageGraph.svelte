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
    import {fly} from "svelte/transition"

    export let server: Server

    let unitSizeUsed: string = 'byte'
    let fetchingPromise;
    let ramUsagesOfServer: RamUsage[]
    let graphTimeText: string = ''

    onMount(() => {
        graphTimeText = 'past 5 minutes'
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
        return ramUsagesOfServer.reduce(function(prev, current) {
            return (prev.totalAvailableInBytes > current.totalAvailableInBytes) ? prev : current
        }).totalAvailableInBytes
    }

    function onNewGraphTime(event): void {
        graphTimeText = event.detail.text
        getAndSetRamUsages(event.detail.minutesFromNow)
    }
</script>

<article>
    {#key graphTimeText}
        <h3 transition:fly>RAM usage Graph of past {graphTimeText}</h3>
    {/key}
    {#await fetchingPromise}
        <LoadingSpinner />
    {:catch e}
        <span>Failed to load ram usage data</span>
    {/await}

    {#if ramUsagesOfServer}
        <DateTimeGraph
            label="RAM usage in bytes"
            x={ramUsagesOfServer.map((ramUsage) => ramUsage.usageInBytes)}
            y={ramUsagesOfServer.map((ramUsage) => ramUsage.createdAt)}
            maxYValue="{getMaximumAvailableRAM()}"
        />
    {/if}
    <GraphTiming on:time-selected={onNewGraphTime} />
</article>
