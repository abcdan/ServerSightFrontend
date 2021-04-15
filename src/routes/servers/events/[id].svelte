<script lang="ts">
    // getting server-id
    import {stores} from "@sapper/app";
    import {onMount} from "svelte";
    import {ServerService} from "../../../services/server/serverService";
    import {ServerEventService} from "../../../services/server/serverEventService";
    import type {ServerEvent} from "../../../models/server/serverEvent";

    const {page} = stores();
    const {id} = ($page as any).params;

    let serverEvents: ServerEvent[]
    onMount(async () => {
        const server = await ServerService.getServer(id);
        serverEvents = await ServerEventService.getEventsOfServer(server)
    })

    $: console.log(serverEvents)
</script>
{serverEvents}
