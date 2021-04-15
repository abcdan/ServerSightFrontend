<script lang="ts">
    import type {ServerEvent} from "../../../models/server/serverEvent";
    import Event from "./Event.svelte";

    export let events: ServerEvent[]
</script>
<style>
    ol {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
        grid-gap: 25px;
        margin: 0;
        padding: 0;
    }
</style>
<ol>
    {#each events as event}
        <Event event={event} />
    {/each}
</ol>
