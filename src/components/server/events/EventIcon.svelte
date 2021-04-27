<script lang="ts">
    import type {ServerEvent} from "../../../models/server/serverEvent";
    import {ServerEventType} from "../../../models/server/enums/serverEventType";

    export let event: ServerEvent
</script>

<style>
    img {
        height: 30px;
        width: 30px;
    }
</style>
{#if event.eventType === ServerEventType.PowerStatus}
    <img src="/event-icons/power.svg" alt="power status icon">
{:else if event.eventType === ServerEventType.HardDiskThresholdReached}
    <img src="/event-icons/hard-disk.png" alt="hard-disk icon">
{:else if event.eventType === ServerEventType.CPUUsageThresholdReached}
    <img src="/event-icons/cpu.png" alt="cpu icon">
{:else if event.eventType === ServerEventType.RAMUsageThresholdReached}
    <img src="/event-icons/ram.png" alt="ram icon">
{/if}
