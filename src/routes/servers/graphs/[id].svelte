<script lang="ts">
    import {onMount} from "svelte";
    import {ServerService} from "../../../services/server/serverService";
    import {popUpMessageStore} from "../../../stores/popupMessagesStore";
    import type {Server} from "../../../models/server/server";
    import {stores} from "@sapper/app";
    import CPUUsageGraph from "../../../components/server/graphs/cpu/CPUUsageGraph.svelte";
    import RAMUsageGraph from "../../../components/server/graphs/ram/RAMUsageGraph.svelte";
    import ServerNavBar from "../../../components/server/ServerNavBar.svelte";
    import NetworkUsageGraph from "../../../components/server/graphs/network-usage/NetworkUsageGraph.svelte";
    import Link from "../../../components/shared/buttons/Link.svelte";
    import PostScriptSetupGuide from "../../../components/server/PostScriptSetupGuide.svelte";

    // getting server-id
    const {page} = stores();
    const {id} = ($page as any).params;

    let server: Server
    let ready: boolean = false

    onMount(() => {
        getAndSetServer()
        ready = true
    })

    function getAndSetServer(): void {
        ServerService.getServer(id).then((fetchedServer) => {
            server = fetchedServer
        }).catch(() => {
            popUpMessageStore.addMessage("404 Server with id not found!")
        })
    }
</script>

<style>
    section.container {
        padding-right: 25px;
        padding-left: 25px;
    }
    section.graphs {
        display: grid;
        grid-template-columns: 1fr;
        list-style-type: none;
        grid-gap: 25px;
        margin: 0;
        padding: 0;
    }

    .post-script-wrapper {
        width: 800px;
    }

    @media screen and (max-width: 1000px) {
        .post-script-wrapper {
            width: 100%;
        }
    }
</style>

<svelte:head>
    {#if server}
        <title>Graphs of server {server.name}</title>
    {/if}
</svelte:head>

<!--Will else render server sided and fail-->
{#if ready && server}
    <section class="container">
        <ServerNavBar {server} />
        <header>
            <h1>Graphs of {server.name} server</h1>
        </header>
        <div class="post-script-wrapper">
            <PostScriptSetupGuide />
        </div> />
        <section class="graphs">
            <CPUUsageGraph {server} />
            <RAMUsageGraph {server} />
            <NetworkUsageGraph {server} />
        </section>
    </section>
{/if}
