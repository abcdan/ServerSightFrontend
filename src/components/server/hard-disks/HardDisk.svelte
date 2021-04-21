<script lang="ts">
    import type {HardDiskServer} from "../../../models/server/hardDisk";

    export let hardDisk: HardDiskServer

    function formatBytes(bytes): string {
        if(bytes == 0) return '0 Bytes';

        const k = 1024
        const decimals = 2
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))

        return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i]
    }

    let percentageAvailable = 0
    $: percentageAvailable = isNaN(hardDisk.spaceAvailable / hardDisk.spaceTotal)
        ? 0 : hardDisk.spaceAvailable / hardDisk.spaceTotal
</script>

<style>
    progress {
        background-color: #344966;
        box-shadow: 0 3px 6px #344966 inset;
        border-radius: 5px;
    }
</style>
<pre>
Disk name: {hardDisk.diskName}
Consumed space: {formatBytes(hardDisk.spaceAvailable)}
Total space: {formatBytes(hardDisk.spaceTotal)}
</pre>
<article>
    Space available:
    <progress value={percentageAvailable}>
        <strong>Space consumed {percentageAvailable} </strong>
    </progress>
</article>
