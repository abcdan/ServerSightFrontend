<script lang="ts">
    import ApiKey from "./ApiKey.svelte";
    import {fly} from "svelte/transition";

    export let apiKeys: string[]
</script>

<style>
    div {
        margin-bottom: 10px;
    }
</style>

{#each apiKeys as apiKey (apiKey)}
    <div in:fly={{duration: 500}} out:fly={{duration: 500}}>
        <ApiKey on:delete {apiKey} />
    </div>
{/each}
