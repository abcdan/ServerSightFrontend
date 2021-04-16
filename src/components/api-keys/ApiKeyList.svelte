<script lang="ts">
    import ApiKey from "./ApiKey.svelte";
    import {fade} from "svelte/transition";

    export let apiKeys: string[]
</script>

<style>
    div {
        margin-bottom: 10px;
    }
</style>

{#each apiKeys as apiKey}
    <div transition:fade>
        <ApiKey on:delete {apiKey} />
    </div>
{/each}
