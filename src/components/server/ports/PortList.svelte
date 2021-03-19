<script lang="ts">
    import type {PortServer} from "../../../models/server/port";
    import Port from "./Port.svelte";

    export let ports: PortServer[]

    let sortedPorts: PortServer[] = []
    $: sortedPorts = ports.sort((p1:PortServer, p2:PortServer) => p1.port < p2.port ? -1: 1)
</script>

<ol>
    {#each sortedPorts as port}
        <li>
            <Port {port} />
        </li>
    {/each}
</ol>
