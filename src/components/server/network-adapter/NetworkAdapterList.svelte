<script lang="ts">
    import type {NetworkAdapterServer} from "../../../models/server/networkAdapter";
    import NetworkAdapter from "./NetworkAdapter.svelte";

    export let networkAdapters: NetworkAdapterServer[]
</script>

<style>
    li {
        margin-top: 10px;
    }
</style>
<ol>
    {#each networkAdapters as networkAdapter}
        <li>
            <NetworkAdapter {networkAdapter} />
        </li>
    {/each}
</ol>
