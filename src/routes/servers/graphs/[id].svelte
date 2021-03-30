<script lang="ts">
    import {onMount} from "svelte";
    import {ServerService} from "../../../services/server/serverService";
    import {popUpMessageStore} from "../../../stores/popupMessagesStore";
    import type {Server} from "../../../models/server/server";
    import {stores} from "@sapper/app";
    import {ServerCpuUsageService} from "../../../services/server/serverCpuUsageService";
    import type {CpuUsage} from "../../../models/server/cpuUsage";
    import CPUGraph from "../../../components/server/graphs/CPUGraph.svelte";

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
            getAndSetCpuUsage()
        }).catch(() => {
            popUpMessageStore.addMessage("404 Server with id not found!")
        })
    }

    function getAndSetCpuUsage(): void {
        // TODO let the user select it dynamically ()
        // get from past 5 minutes
        let fromDate: Date = new Date()
        fromDate.setMinutes(fromDate.getMinutes() - 5)

        ServerCpuUsageService.getCpuUsageOfServer(server, {
            from: fromDate,
            to: new Date()
        }).then((cpuUsages) => {
            // TODO replace with promise
            cpuUsageOfServer = cpuUsages
            console.log(cpuUsages)
        }).catch(() => {
            popUpMessageStore.addMessage("Could not fetch cpu usages.")
        })
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
{/if}
