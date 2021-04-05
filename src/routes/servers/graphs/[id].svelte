<script lang="ts">
    import {onMount} from "svelte";
    import {ServerService} from "../../../services/server/serverService";
    import {popUpMessageStore} from "../../../stores/popupMessagesStore";
    import type {Server} from "../../../models/server/server";
    import {stores} from "@sapper/app";
    import {ServerCpuUsageService} from "../../../services/server/serverCpuUsageService";
    import type {CpuUsage} from "../../../models/server/cpuUsage";
    import CPUGraph from "../../../components/server/graphs/CPUGraph.svelte";
    import Button from "../../../components/shared/buttons/Button.svelte";

    // getting server-id
    const {page} = stores();
    const {id} = ($page as any).params;

    let server: Server
    let cpuUsageOfServer: CpuUsage[] = []
    let graphTimeText: string = 'past 5 minutes'

    let ready: boolean = false
    onMount(() => {
        getAndSetServer()
        ready = true
    })

    function getAndSetServer(): void {
        ServerService.getServer(id).then((fetchedServer) => {
            server = fetchedServer
            getAndSetCpuUsage(5)
        }).catch(() => {
            popUpMessageStore.addMessage("404 Server with id not found!")
        })
    }

    function getAndSetCpuUsage(minutesBackWordsToFetch:number): void {
        // get from past 5 minutes
        // let fromDate: Date = new Date()
        // fromDate.setMinutes(fromDate.getMinutes() - minutesBackWordsToFetch)
        // let toDate: Date = new Date()
        // TODO replace
        let fromDate: Date = new Date('2021-04-05T12:50:23.224')
        let toDate: Date = new Date('2021-04-05T12:56:23.224')
        minutesBackWordsToFetch = 120
        ServerCpuUsageService.getCpuUsageOfServer(server, {
            from: fromDate,
            to: toDate
        }).then((cpuUsages) => {
            // TODO replace with promise
            cpuUsageOfServer = fillEmptyTimestamps(cpuUsages, minutesBackWordsToFetch, fromDate, toDate)
        }).catch((ex) => {
            popUpMessageStore.addMessage("Could not fetch cpu usages.")
            throw ex
        })
    }

    // Will fill a cpu usage if there is a CPU usage missing from a given minute.
    // For example you want to fetch the last 30 minutes but there are only 28 cpu usages.
    // this method will then fill these 2 so that there is a cpu usage of every minute.
    function fillEmptyTimestamps(cpuUsages: CpuUsage[], totalAmount: number, startDate: Date, endDate: Date): CpuUsage[] {
        let newCpuUsages: CpuUsage[] = []

        generateAllDatesBetweenDates(startDate, endDate).forEach((generatedDate) => {
            let cpuUsage = cpuUsages.find((cpuUsage) => {
                console.log(dateMatches(cpuUsage.createdAt, generatedDate))
                console.log(cpuUsage)
                console.log(generatedDate)
                return dateMatches(cpuUsage.createdAt, generatedDate)}
            )
            if(cpuUsage) {
                newCpuUsages.push(cpuUsage)
            } else {
                newCpuUsages.push({
                    averageCpuUsagePastMinute: null,
                    createdAt: generatedDate
                })
            }
        })

        // TODO add sorting
        return newCpuUsages
    }

    function dateMatches(date1: Date, date2: Date) {
        // because we don't want to compare to the second
        return date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getHours() === date2.getHours() &&
            date1.getMinutes() === date2.getMinutes()
    }

    function generateAllDatesBetweenDates(startDate: Date, endDate: Date): Date[] {
        let generatedDates: Date[] = []
        const dateMove = new Date(startDate);

        while (dateMove < endDate) {
            console.log(dateMove)
            generatedDates.push(new Date(dateMove));

            // increase minute by 1
            dateMove.setMinutes(dateMove.getMinutes() + 1);
        }

        return generatedDates
    }

    function setNewGraph(minutesFromNow: number, newGraphText: string): void {

    }
</script>

<svelte:head>
    {#if server}
        <title>Graphs of server {server.name}</title>
    {/if}
</svelte:head>

<!--Will else render server sided and fail-->
{#if ready}
    <h1>CPU Graph of past {graphTimeText}</h1>
    <CPUGraph cpuUsages={cpuUsageOfServer} />
    <!--  TODO improve  -->
    <Button on:click={() => getAndSetCpuUsage(5)}>
        Past 5 minutes
    </Button>
    <Button on:click={() => getAndSetCpuUsage(30)}>
        Past 30 minutes
    </Button>
    <Button on:click={() => getAndSetCpuUsage(720)}>
        Past day
    </Button>
{/if}
