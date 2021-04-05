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
    let graphTimeText: string = ''

    let ready: boolean = false

    const TIME_RETRIEVAL_OPTIONS: { minutesToRetrieve: number; text: string }[] = [
        {
            text: 'past 5 minutes',
            minutesToRetrieve: 5
        },
        {
            text: 'past 30 minutes',
            minutesToRetrieve: 30
        },        {
            text: 'past day',
            minutesToRetrieve: 720
        },
    ]
    onMount(() => {
        getAndSetServer()
        ready = true
    })

    function getAndSetServer(): void {
        ServerService.getServer(id).then((fetchedServer) => {
            server = fetchedServer
            getAndSetCpuUsage(5)
            setNewGraph(5, 'past 5 minutes')
        }).catch(() => {
            popUpMessageStore.addMessage("404 Server with id not found!")
        })
    }

    function getAndSetCpuUsage(minutesBackWordsToFetch:number): void {
        let fromDate: Date = new Date()
        fromDate.setMinutes(fromDate.getMinutes() - minutesBackWordsToFetch)
        let toDate: Date = new Date()

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
            let cpuUsage = cpuUsages.find((cpuUsage) => dateMatches(cpuUsage.createdAt, generatedDate))
            if(cpuUsage) {
                newCpuUsages.push(cpuUsage)
            } else {
                newCpuUsages.push({
                    averageCpuUsagePastMinute: null,
                    createdAt: generatedDate
                })
            }
        })

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
            generatedDates.push(new Date(dateMove));

            // increase minute by 1
            dateMove.setMinutes(dateMove.getMinutes() + 1);
        }

        return generatedDates
    }

    function setNewGraph(minutesFromNow: number, newGraphTimeText: string): void {
        graphTimeText = newGraphTimeText
        getAndSetCpuUsage(minutesFromNow)

    }
</script>

<style>
    section.graphs {
        display: grid;
        grid-template-columns: 1fr 1fr;
        list-style-type: none;
        grid-gap: 25px;
        margin: 0;
        padding: 0;
    }

    .button-graph-wrapper {
        display: flex;
        flex-direction: row;
        list-style-type: none;
        flex-wrap: wrap;
        margin: 0;
        padding: 0;
    }

    .button-graph-wrapper > li {
        margin-right: 6px;
    }

    span {
        padding: 12px;
    }

    @media only screen and (max-width: 1200px) {
        ol {
            grid-template-columns: 1fr;
        }
    }
</style>

<svelte:head>
    {#if server}
        <title>Graphs of server {server.name}</title>
    {/if}
</svelte:head>

<!--Will else render server sided and fail-->
{#if ready}
    <section>
        {#if server}
            <header>
                <h1>Graphs of {server.name} server</h1>
            </header>
            <section class="graphs">
                <article>
                    <h3>CPU Graph of past {graphTimeText}</h3>
                    <CPUGraph cpuUsages={cpuUsageOfServer} />
                    <!--  TODO improve  -->
                    <ol class="button-graph-wrapper">
                        {#each TIME_RETRIEVAL_OPTIONS as timeRetrieval}
                            <li>
                                <Button on:click={() => setNewGraph(timeRetrieval.minutesToRetrieve, timeRetrieval.text)}>
                                    <span>{ timeRetrieval.text }</span>
                                </Button>
                            </li>
                        {/each}
                    </ol>
                </article>
            </section>
        {/if}
    </section>
{/if}
