<script lang="ts">
    import type {HardDiskServer} from "../../../models/server/hardDisk";
    import HardDisk from "./HardDisk.svelte";

    export let hardDisks: HardDiskServer[] = []
</script>

<ol>
    {#each hardDisks as hardDisk}
        <li>
            <HardDisk {hardDisk} />
        </li>
    {/each}
</ol>
