<script lang="ts">
    import type {HardDiskServer} from "../../../models/server/hardDisk";

    export let hardDisk: HardDiskServer

    let percentageAvailable: number = 0
    $: percentageAvailable = hardDisk.spaceAvailable / hardDisk.spaceTotal
</script>

<style>
    progress {
        background-color: #344966;
        box-shadow: 0 3px 6px #344966 inset;
        border-radius: 5px;
    }
</style>

<span>
    Diskname name: {hardDisk.diskName}
</span>
<br>
<span>
    Space available:
    <progress value={percentageAvailable}>
        <strong>Space available {percentageAvailable} </strong>
    </progress>
</span>
