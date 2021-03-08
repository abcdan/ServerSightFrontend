<script lang="ts">
    import {ServerService} from "../../services/server/serverService";
    import {onMount} from "svelte";
    import ServerList from "../../components/server/ServerList.svelte";
    import ServerFilter from "../../components/server/ServerFilter.svelte";

    let servers = []
    onMount(async () => {
        servers = await ServerService.getUserServers()
    })
</script>

<style>
    section {
        margin: 0;
        padding: 0;
    }

    div.container {
        width: 100%;
        height: 100vw;
    }

    section.server-filter {
        display: inline-block;
        border-right: 1px solid #344966;
        width: 30vw;
        height: 100vh;
    }
    section.servers-list {
        display: inline-block;
        width: 68.9vw;
        height: 100vh;
    }
</style>
<svelte:head>
    <title>Your servers</title>
</svelte:head>

<div class="container">
    <section class="server-filter">
        <header>
            <h1>Server filters</h1>
        </header>
        <ServerFilter />
    </section>
    <section class="servers-list">
        <header>
            <h1>Your servers</h1>
        </header>
        <p>
            Here are all your servers you have previously added.
            On the left you can choose between different filters.
        </p>
        <!--TODO add loading spinner-->
        <ServerList {servers} />
    </section>
</div>
