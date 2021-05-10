<script lang="ts">
    import type {CpuUsage} from "../../../../models/server/cpuUsage";
    import type {Server} from "../../../../models/server/server";
    import {ServerCpuUsageService} from "../../../../services/server/serverCpuUsageService";
    import {popUpMessageStore} from "../../../../stores/popupMessagesStore";
    import {onMount} from "svelte";
    import {fillEmptyTimestamps} from "../serverGraphUtils";
    import GraphTiming from "../components/GraphTiming.svelte";
    import DateTimeGraph from "../components/DateTimeGraph.svelte";
    import LoadingSpinner from "../../../shared/LoadingSpinner.svelte";
    import {fly} from "svelte/transition"

    export let server: Server

    let fetchingPromise;
    let cpuUsageOfServer: CpuUsage[]
    let graphTimeText: string = ''

    onMount(() => {
        let fromDate: Date = new Date()
        fromDate.setMinutes(fromDate.getMinutes() - 4)
        fromDate.setSeconds(0)
        let toDate: Date = new Date()
        getAndSetCpuUsage(fromDate, toDate)
    })

    function getAndSetCpuUsage(fromDate: Date, toDate: Date): void {
        setGraphTimeText(fromDate, toDate)
        fetchingPromise = ServerCpuUsageService.getCpuUsageOfServer(server, {
            from: fromDate,
            to: toDate
        }).then((cpuUsages) => {
            cpuUsageOfServer = fillEmptyTimestamps(cpuUsages, fromDate, toDate, (generatedDate: Date) => {
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

    function setGraphTimeText(fromDate: Date, toDate:Date) {
        let t2 = toDate.getTime();
        let t1 = fromDate.getTime();

        let differenceInMinutes = parseInt(String((t2 - t1) / 60000));
        graphTimeText = `past ${differenceInMinutes} minutes`

    }

    function onNewSelectedTime(event): void {
        const fromDate = event.detail.fromDate
        const toDate = event.detail.toDate

        getAndSetCpuUsage(fromDate, toDate)
    }
</script>

<article>
    {#key graphTimeText}
        <h3 transition:fly|local>CPU Graph of past {graphTimeText}</h3>
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
        <span>If a point is blank that means there was no cpu usage for that given minute</span>
    {/if}
    <GraphTiming
        on:time-selected={onNewSelectedTime}
    />
</article>
