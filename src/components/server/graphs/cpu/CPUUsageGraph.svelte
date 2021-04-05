<script lang="ts">
    import type {CpuUsage} from "../../../../models/server/cpuUsage";
    import type {Server} from "../../../../models/server/server";
    import {ServerCpuUsageService} from "../../../../services/server/serverCpuUsageService";
    import {popUpMessageStore} from "../../../../stores/popupMessagesStore";
    import {onMount} from "svelte";
    import {fillEmptyTimestamps} from "../utils";
    import GraphTiming from "../components/GraphTiming.svelte";
    import DateTimeGraph from "../components/DateTimeGraph.svelte";
    import LoadingSpinner from "../../../shared/LoadingSpinner.svelte";
    import {fly} from "svelte/transition"

    export let server: Server

    let fetchingPromise;
    let cpuUsageOfServer: CpuUsage[]
    let graphTimeText: string = ''

    onMount(() => {
        graphTimeText = 'past 5 minutes'
        getAndSetCpuUsage(5)
    })

    function getAndSetCpuUsage(minutesBackWordsToFetch: number): void {
        let fromDate: Date = new Date()
        fromDate.setMinutes(fromDate.getMinutes() - minutesBackWordsToFetch)
        let toDate: Date = new Date()

        fetchingPromise = ServerCpuUsageService.getCpuUsageOfServer(server, {
            from: fromDate,
            to: toDate
        }).then((cpuUsages) => {
            cpuUsageOfServer = fillEmptyTimestamps(cpuUsages, minutesBackWordsToFetch, fromDate, toDate, (generatedDate: Date) => {
                    return {
                        averageCpuUsagePastMinute: null,
                        createdAt: generatedDate
                    }
                }
            ) as CpuUsage[]
        }).catch((ex) => {
            popUpMessageStore.addMessage('Could not fetch cpu usages.')
        })
    }

    function onNewGraphTime(event): void {
        graphTimeText = event.detail.text
        getAndSetCpuUsage(event.detail.minutesFromNow)
    }
</script>

<article>
    {#key graphTimeText}
        <h3 transition:fly>CPU Graph of past {graphTimeText}</h3>
    {/key}
    {#await fetchingPromise}
        <LoadingSpinner />
    {:catch e}
        <span>Failed to load cpu usages data</span>
    {/await}

    {#if cpuUsageOfServer}
        <DateTimeGraph
            x={cpuUsageOfServer.map((cpuUsage) => cpuUsage.averageCpuUsagePastMinute)}
            y={cpuUsageOfServer.map((cpuUsage) => cpuUsage.createdAt)}
            label="CPU usage in %"
            maxYValue="100"
        />
    {/if}
    <GraphTiming on:time-selected={onNewGraphTime} />
</article>
