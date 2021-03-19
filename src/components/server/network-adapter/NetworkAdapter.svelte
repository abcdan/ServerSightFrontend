<script lang="ts">
    import type {NetworkAdapterServer} from "../../../models/server/networkAdapter";

    export let networkAdapter: NetworkAdapterServer
</script>

<span>
    Adapter name: {networkAdapter.adapterName}
</span>
<br>
<span>
    Ip: {networkAdapter.ip}
</span>
