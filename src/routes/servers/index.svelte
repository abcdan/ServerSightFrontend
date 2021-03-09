<script lang="ts">
    import {ServerService} from "../../services/server/serverService";
    import {onMount} from "svelte";
    import ServerList from "../../components/server/ServerList.svelte";
    import ServerFilter from "../../components/server/ServerFilter.svelte";
    import Link from "../../components/shared/buttons/Link.svelte";

    let servers = []
    onMount(async () => {
        servers = await ServerService.getUserServers()
    })

    function onFilter(event): void {
        const filterData = event.detail

        // TODO add exception handling
        ServerService.getUserServers({
            name: filterData.name,
            powerstatus: filterData.powerstatus
        }).then((filteredServers) => {
            console.log(servers)
            servers = filteredServers
        })
    }
</script>

<style>
    section {
        margin: 0;
        padding: 10px;
    }

    p {
        margin: 0;
        padding: 0;
    }

    div.add-server {
        width: 125px;
        margin-bottom: 10px;
    }

    span {
        display: block;
        text-align: center;
    }

    span.plus-sign {
        display: inline;
        font-size: 24px;
        color: #BFCC94;
    }

    div.container {
        width: 100%;
        min-height: 100%;
    }

    section.server-filter {
        display: inline-block;
        border-right: 2px solid #344966;
        width: 25vw;
        height: 100vh;
    }
    section.servers-list {
        display: inline-block;
        width: calc(75vw - 60px);
        float: right;
        height: 100vh;
    }
</style>
<svelte:head>
    <title>Your servers</title>
</svelte:head>

<div class="container">
    <section class="server-filter">
        <header>
            <h1>Filter servers</h1>
        </header>
        <ServerFilter on:filter={onFilter} />
    </section>
    <section class="servers-list">
        <header>
            <h1>Your servers</h1>
        </header>
        <p>
            Here are all your servers you have previously added.
            On the left you can choose between different filters.
        </p>
        <div class="add-server">
            <Link href="/servers/add/">
                <span>
                    <span class="plus-sign">+</span>
                    Add server
                </span>
            </Link>
        </div>
        <!--TODO add loading spinner-->
        <ServerList {servers} />
    </section>
</div>
