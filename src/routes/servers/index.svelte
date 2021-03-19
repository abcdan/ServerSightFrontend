<script lang="ts">
    import {ServerService} from "../../services/server/serverService";
    import {onMount} from "svelte";
    import ServerList from "../../components/server/ServerList.svelte";
    import ServerFilter from "../../components/server/ServerFilter.svelte";
    import Link from "../../components/shared/buttons/Link.svelte";
    import LoadingSpinner from "../../components/shared/LoadingSpinner.svelte";
    import {popUpMessageStore} from "../../stores/popupMessagesStore";
    import type {Server} from "../../models/server/server";

    let servers: Server[] = []
    let serversFetchingPromise;

    onMount(() => {
        getAllServers()
    })

    function getAllServers(): void {
        serversFetchingPromise = ServerService.getUserServers()
    }

    function onFilter(event): void {
        const filterData = event.detail

        // TODO add exception handling
        // TODO make loading spinner working
        serversFetchingPromise = ServerService.getUserServers({
            name: filterData.name,
            powerstatus: filterData.powerstatus
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
        position: fixed;
        top: 75px;
        left: 0;
        width: 100%;
        min-height: 100%;
        height: 100vh;
    }

    section.server-filter {
        display: inline-block;
        border-right: 2px solid #344966;
        width: 25vw;
        height: 100vh;
    }

    section.servers-list {
        display: inline-block;
        position: absolute;
        top: 0;
        bottom: 0;
        overflow-y: scroll;
        width: calc(75vw - 45px);
        float: right;
        height: calc(100% - 290px);
        padding-bottom: 200px;
    }

    div.loading-spinner-container {
        margin: 0 auto;
        text-align: center;
        width: 100%;
    }

    @media only screen and (max-width: 1200px) {
        section.server-filter {
            height: auto;
            position: relative;
            top: 50px;
        }

        section.servers-list {
            top: 50px;
            position: relative;
        }
        section.servers-list, section.server-filter {
            border: none;
            display: block;
            width: calc(100% - 20px);
        }
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
        {#await serversFetchingPromise}
            <div class="loading-spinner-container">
                <LoadingSpinner />
            </div>
        {:then fetchedServers }
            <ServerList servers={fetchedServers} />
        {:catch error}
            <p>Failed to fetch servers. Please try again later!</p>
        {/await}
        {#if servers.length === 0}
            You have no servers yet. Start by creating one.
        {/if}
    </section>
</div>
