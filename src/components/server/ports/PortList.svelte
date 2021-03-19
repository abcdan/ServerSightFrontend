<script lang="ts">
    import type {PortServer} from "../../../models/server/port";
    import Port from "./Port.svelte";

    export let ports: PortServer[]
</script>

<ol>
    {#each ports as port}
        <li>
            <Port {port} />
        </li>
    {/each}
</ol>
