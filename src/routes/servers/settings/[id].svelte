<script lang="ts">
    import type {NotificationThresHold} from "../../../models/server/notificationThresHold";
    import type {Server} from "../../../models/server/server";
    import {onMount} from "svelte";
    import {ServerService} from "../../../services/server/serverService";
    import {popUpMessageStore} from "../../../stores/popupMessagesStore";
    import TresholdSettings from "../../../components/server/settings/notification-threshold/ThresholdSettings.svelte";
    import {NotificationThresholdService} from "../../../services/server/notificationThresholdService";
    import LoadingSpinner from "../../../components/shared/LoadingSpinner.svelte";
    import {stores} from "@sapper/app";
    import ServerNavBar from "../../../components/server/ServerNavBar.svelte";
    import Container from "../../../components/shared/Container.svelte";
    import Button from "../../../components/shared/buttons/Button.svelte";

    const {page} = stores();
    const {id} = ($page as any).params;

    let server: Server
    let notificationThreshold: NotificationThresHold = getDefaultNotificationThreshold();

    onMount(() => {
        getAndSetServer()
    })

    function getAndSetServer(): void {
        ServerService.getServer(id).then((fetchedServer) => {
            server = fetchedServer
            setNotificationThreshold()
        }).catch(() => {
            popUpMessageStore.addMessage("404 Server with id not found!")
        })
    }

    function setNotificationThreshold() {
        NotificationThresholdService.getNotificationThreshold(server).then((existingNotificationTreshold) => {
            if (!existingNotificationTreshold) {
                notificationThreshold = getDefaultNotificationThreshold()
            } else {
                notificationThreshold = existingNotificationTreshold
            }
        }).catch(() => {
            notificationThreshold = getDefaultNotificationThreshold()
            popUpMessageStore.addMessage("Could not fetch existing notification threshold settings.")
        })
    }

    function saveThreshold() {
        NotificationThresholdService.saveNotificationThreshold(server, notificationThreshold).then(() => {
            popUpMessageStore.addMessage("Notification threshold settings saved")
        }).catch(() => {
            popUpMessageStore.addMessage("Failed to save notification threshold settings")
        })
    }

    function getDefaultNotificationThreshold(): NotificationThresHold {
        return {
            ramUsageThresholdInPercentage: 70,
            cpuUsageThresholdInPercentage: 70,
            hardDiskUsageThresholdInPercentage: 70
        }
    }
</script>

<style>
    .settings {
        width: 600px;
        margin: 0 auto;
    }

    @media screen and (max-width: 1000px) {
        .settings {
            width: auto;
            margin-left: 10px;
            margin-right: 10px;
        }
    }
</style>

<svelte:head>
    {#if server}
        <title>Settings of server {server.name}</title>
    {/if}
</svelte:head>

{#if server}
    <ServerNavBar server={server} />
    <section class="settings">
        <header>
            <h1>Settings</h1>
        </header>
        <p>
            Here you can set when you should receive a notification for this server when a certain threshold is reached.
        </p>
        {#if notificationThreshold}
            <TresholdSettings bind:notificationsThresHold={notificationThreshold} />
        {/if}
        <Button on:click={saveThreshold}>
            Save threshold settings
        </Button>
    </section>
{:else}
    <LoadingSpinner />
{/if}
