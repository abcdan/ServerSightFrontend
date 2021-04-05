<script lang="ts">
    import CPUGraph from "./CPUGraph.svelte";
    import type {CpuUsage} from "../../../../models/server/cpuUsage";
    import type {Server} from "../../../../models/server/server";
    import {ServerCpuUsageService} from "../../../../services/server/serverCpuUsageService";
    import {popUpMessageStore} from "../../../../stores/popupMessagesStore";
    import {onMount} from "svelte";
    import {fillEmptyTimestamps} from "../utils";
    import GraphTiming from "../GraphTiming.svelte";

    export let server: Server
    let cpuUsageOfServer: CpuUsage[] = []
    let graphTimeText: string = ''

    onMount(() => {
        getAndSetCpuUsage(5)
    })

    function getAndSetCpuUsage(minutesBackWordsToFetch: number): void {
        let fromDate: Date = new Date()
        fromDate.setMinutes(fromDate.getMinutes() - minutesBackWordsToFetch)
        let toDate: Date = new Date()

        ServerCpuUsageService.getCpuUsageOfServer(server, {
            from: fromDate,
            to: toDate
        }).then((cpuUsages) => {
            // TODO replace with promise
            cpuUsageOfServer = fillEmptyTimestamps(cpuUsages, minutesBackWordsToFetch, fromDate, toDate, (generatedDate: Date) => {
                    return {
                        averageCpuUsagePastMinute: null,
                        createdAt: generatedDate
                    }
                }
            ) as CpuUsage[]
        }).catch((ex) => {
            popUpMessageStore.addMessage("Could not fetch cpu usages.")
        })
    }

    function onNewGraph(event): void {
        graphTimeText = event.detail.text
        getAndSetCpuUsage(event.detail.minutesFromNow)
    }
</script>

<article>
    <h3>CPU Graph of past {graphTimeText}</h3>
    <CPUGraph cpuUsages={cpuUsageOfServer} />
    <GraphTiming on:time-selected={onNewGraph} />
</article>
