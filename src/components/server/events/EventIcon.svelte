<script lang="ts">
    import type {ServerEvent} from "../../../models/server/serverEvent";
    import {ServerEventType} from "../../../models/server/enums/serverEventType";

    export let event: ServerEvent
</script>



{#if event.eventType === ServerEventType.PowerStatus}
    <img src="/event-icons/power.svg" alt="power status icon">
{/if}
