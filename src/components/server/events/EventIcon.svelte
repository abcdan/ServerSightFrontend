<script lang="ts">
    import type {ServerEvent} from "../../../models/server/serverEvent";
    import {ServerEventType} from "../../../models/server/enums/serverEventType";

    export let event: ServerEvent
    $:  console.log(event.eventType.toString())
    $:  console.log(ServerEventType.PowerStatus.toString())
    $:  console.log(event.eventType.toString() === ServerEventType.PowerStatus.toString())
</script>



{#if event.eventType === ServerEventType.PowerStatus}
    <img src="static/event-icons/power.svg" alt="power status icon">
{/if}
