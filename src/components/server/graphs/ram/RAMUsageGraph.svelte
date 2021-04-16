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

    const k = 1024
    const decimals = 2
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

    let currentUnitSize = 'KB'
    let fetchingPromise;
    let ramUsagesOfServer: RamUsage[]
    let graphTimeText: string = ''

    onMount(() => {
        graphTimeText = 'past 5 minutes'
        let fromDate: Date = new Date()
        fromDate.setMinutes(fromDate.getMinutes() - 5)
        fromDate.setSeconds(0)

        let toDate: Date = new Date()
        getAndSetRamUsages(fromDate, toDate)
    })

    function getAndSetRamUsages(fromDate:Date, toDate: Date): void {
        fetchingPromise = ServerRAMUsageService.getRAMUsagesOfServer(server, {
            from: fromDate,
            to: toDate
        }).then((cpuUsages) => {
            ramUsagesOfServer = fillEmptyTimestamps(cpuUsages, fromDate, toDate, (generatedDate: Date) => {
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

    function getMaximumAvailableRAMInBytes(): number {
        // searches for the highest possible ram available in current list
        return ramUsagesOfServer.reduce(function(prev, current) {
            return (prev.totalAvailableInBytes > current.totalAvailableInBytes) ? prev : current
        }).totalAvailableInBytes
    }

    // TODO refactor
    function getMaximumAvailableRAMCalculatedWithUnitType(): number {
        // searches for the highest possible ram available in current list
        const maxRamAvailable = ramUsagesOfServer.reduce(function(prev, current) {
            return (prev.totalAvailableInBytes > current.totalAvailableInBytes) ? prev : current
        }).totalAvailableInBytes

        const sizeOfIndex = Math.floor(Math.log(getMaximumAvailableRAMInBytes()) / Math.log(k));
        return parseFloat((maxRamAvailable / Math.pow(k, sizeOfIndex)).toFixed(decimals))
    }

    function convertRAMUsageToUnitSize(ramUsages:RamUsage[]): number[] {
        const dm = decimals < 0 ? 0 : decimals;

        const sizeOfIndex = Math.floor(Math.log(getMaximumAvailableRAMInBytes()) / Math.log(k));
        currentUnitSize = sizes[sizeOfIndex]

        return ramUsages.map((ramUsage) => {
            return parseFloat((ramUsage.usageInBytes / Math.pow(k, sizeOfIndex)).toFixed(dm));
        })
    }
    function setGraphTimeText(fromDate: Date, toDate:Date) {
        let t2 = toDate.getTime();
        let t1 = fromDate.getTime();

        let differenceInMinutes = parseInt(String((t2 - t1) / 60000));
        graphTimeText = `past ${differenceInMinutes} minutes`

    }

    function onNewSelectedTime(event): void {
        const fromDate = event.detail.fromDate
        const toDate = event.detail.toDate

        setGraphTimeText(fromDate, toDate)
        getAndSetRamUsages(fromDate, toDate)
    }
</script>

<article>
    {#key graphTimeText}
        <h3 transition:fly|local>RAM usage Graph of past {graphTimeText}</h3>
    {/key}
    {#await fetchingPromise}
        <LoadingSpinner />
    {:catch e}
        <span>Failed to load ram usage data</span>
    {/await}

    {#if ramUsagesOfServer}
        <DateTimeGraph
            maxYValue="{getMaximumAvailableRAMCalculatedWithUnitType()}"
            label="Maximum ram available in {currentUnitSize}"
            x={convertRAMUsageToUnitSize(ramUsagesOfServer)}
            y={ramUsagesOfServer.map((ramUsage) => ramUsage.createdAt)}
        />
        <span>If a point is blank that means there was no RAM usage for that given minute</span>
    {/if}
    <GraphTiming on:time-selected={onNewSelectedTime} />
</article>
