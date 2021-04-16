<script lang="ts">
    // getting server-id
    import {stores} from "@sapper/app";
    import {onMount} from "svelte";
    import {ServerService} from "../../../services/server/serverService";
    import {ServerEventService} from "../../../services/server/serverEventService";
    import type {ServerEvent} from "../../../models/server/serverEvent";
    import EventList from "../../../components/server/events/EventList.svelte";
    import ServerNavBar from "../../../components/server/ServerNavBar.svelte";

    const {page} = stores();
    const {id} = ($page as any).params;

    let server = undefined
    let serverEvents: ServerEvent[] = []

    onMount(async () => {
        server = await ServerService.getServer(id);
        serverEvents = await ServerEventService.getEventsOfServer(server)
    })
</script>

<style>
    section.events {
        padding-right: 25px;
        padding-left: 25px;
    }
</style>

<svelte:head>
    {#if server}
        <title>Server { server.name }</title>
    {/if}
</svelte:head>

{#if server}
    <section class="events">
        <ServerNavBar {server} />
        <h1>All the events of the {server.name}</h1>
        {#if serverEvents}
            <EventList
                events={serverEvents}
            />
        {/if}
    </section>
{/if}
