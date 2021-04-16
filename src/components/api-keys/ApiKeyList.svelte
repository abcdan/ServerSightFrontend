<script lang="ts">
    import ApiKey from "./ApiKey.svelte";
    export let apiKeys: string[]
</script>

{#each apiKeys as apiKey}
    <ApiKey on:delete {apiKey} />
{/each}
