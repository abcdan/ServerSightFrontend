<script lang="ts">
    import type {NotificationThresHold} from "../../../../models/server/notificationThresHold";
    import Treshold from "./Threshold.svelte";

    export let notificationsThresHold: NotificationThresHold
</script>

<style>
    div.container {
        display: flex;
        flex-direction: column;
    }

    div.child {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
    }

    div.threshold-container {
        margin-left: auto;
        width: 50px;
    }
</style>

<div class="container">
    <div class="child">
        <span>CPU usage threshold</span>
        <div class="threshold-container">
            <Treshold bind:thresholdValue={notificationsThresHold.cpuUsageThresholdInPercentage} />
        </div>
    </div>
    <div class="child">
        <span>RAM usage threshold</span>
        <div class="threshold-container">
            <Treshold bind:thresholdValue={notificationsThresHold.ramUsageThresholdInPercentage} />
        </div>
    </div>
    <div class="child">
        <span>Hard disk storage usage threshold</span>
        <div class="threshold-container">
            <Treshold bind:thresholdValue={notificationsThresHold.hardDiskUsageThresholdInPercentage} />
        </div>
    </div>
</div>
