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

        // TODO replace
        let fromDate: Date = new Date('2021-04-01T15:32:23.224')
        let toDate: Date = new Date()
        minutesBackWordsToFetch = 120
        ServerCpuUsageService.getCpuUsageOfServer(server, {
            from: fromDate,
            to: toDate
        }).then((cpuUsages) => {
            console.log(cpuUsages)
            if(cpuUsages.length === 0) {
                popUpMessageStore.addMessage("There are no cpu usages of the past 5 minutes.")
            } else {
                // TODO replace with promise
                cpuUsageOfServer = fillEmptyTimestamps(cpuUsages, minutesBackWordsToFetch, fromDate, toDate)
            }
        }).catch((ex) => {
            popUpMessageStore.addMessage("Could not fetch cpu usages.")
            throw ex
        })
    }

    // Will fill a cpu usage if there is a CPU usage missing from a given minute.
    // For example you want to fetch the last 30 minutes but there are only 28 cpu usages.
    // this method will then fill these 2 so that there is a cpu usage of every minute.
    function fillEmptyTimestamps(cpuUsages: CpuUsage[], totalAmount: number, startDate: Date, endDate: Date): CpuUsage[] {
        // we got them all.
        if(totalAmount === cpuUsages.length) {
            return cpuUsages
        }

        const newCpUsagesList: CpuUsage[] = []

        let previousCpuUsage: CpuUsage = cpuUsages[0]
        for (let i = 1; i < totalAmount; i++) {
            const dateToFill = new Date(previousCpuUsage.createdAt)
            dateToFill.setMinutes(previousCpuUsage.createdAt.getMinutes() + 1)

            if(cpuUsages[i] === undefined) {
                newCpUsagesList.push({
                    averageCpuUsagePastMinute: 0,
                    createdAt: dateToFill
                })
                continue
            }
            let cpuUsage = cpuUsages[i]
            newCpUsagesList.push(cpuUsage)

            const minuteDifference = _getDifferenceInMinutes(cpuUsage.createdAt, previousCpuUsage.createdAt);

            // if there is a minute difference it means there is a difference
            if(minuteDifference > 1) {
                newCpUsagesList.push({
                    averageCpuUsagePastMinute: 0,
                    createdAt: dateToFill
                })
            }
            previousCpuUsage = cpuUsage
        }

        return newCpUsagesList
    }

    function _getDifferenceInMinutes(startDate: Date, endDate: Date): number {
        let diffMs = (startDate - endDate); // milliseconds between now & Christmas

         // minutes
        return Math.round(((diffMs % 86400000) % 3600000) / 60000)
    }
</script>

<svelte:head>
    {#if server}
        <title>Graphs of server {server.name}</title>
    {/if}
</svelte:head>

<!--Will else render server sided and fail-->
{#if ready}
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
