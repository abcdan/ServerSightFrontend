<script lang="ts">
    import {onMount} from "svelte";
    import {goto, stores} from "@sapper/app";
    import {ServerService} from "../../services/server/serverService";
    import type {Server} from "../../models/server/server";
    import {popUpMessageStore} from "../../stores/popupMessagesStore";
    import Img from "../../components/shared/Img.svelte";
    import Container from "../../components/shared/Container.svelte";
    import Button from "../../components/shared/buttons/Button.svelte";
    import {BASE_MEDIA_URL} from "../../configs";
    import ServerForm from "../../components/server/ServerForm.svelte";
    import type {FieldError} from "../../services/error/field.error";
    import ErrorList from "../../components/errors/ErrorList.svelte";
    import {FieldsErrors} from "../../services/error/fields.error";
    import MarkdownViewer from "../../components/shared/MarkdownViewer.svelte";
    import {ServerNetworkAdapterService} from "../../services/server/serverNetworkAdapterService";
    import type {NetworkAdapterServer} from "../../models/server/networkAdapter";
    import NetworkAdapterList from "../../components/server/network-adapter/NetworkAdapterList.svelte";
    import LoadingSpinner from "../../components/shared/LoadingSpinner.svelte";
    import {ServerHardDiskService} from "../../services/server/serverHardDiskService";
    import {HardDiskServer} from "../../models/server/hardDisk";


    const {page} = stores();

    const {id} = ($page as any).params;

    let server: Server = undefined
    let serverIcon: any = undefined

    let fieldsErrors: FieldError[] = []
    let editMode: boolean = false

    let networkAdapters: NetworkAdapterServer[] = []
    let hardDisks: HardDiskServer[] = []

    onMount(() => {
        getAndSetServer()
    })

    function toggleEditMode(): void {
        editMode = !editMode
    }

    function updateServer(): void {
        ServerService.updateServer(server, serverIcon ? serverIcon[0] : undefined).then(() => {
            popUpMessageStore.addMessage(`Updated ${server.name}`)
            editMode = false
            getAndSetServer()
        }).catch((err) => {
            if (err instanceof FieldsErrors) {
                fieldsErrors = (err as FieldsErrors).fields
            }
        })
    }

    function deleteServer(): void {
        ServerService.deleteServer(server).then(() => {
            popUpMessageStore.addMessage(`Deleted ${server.name}`)
            goto('/servers', {}).then()
        }).catch((ignored) => {
            popUpMessageStore.addMessage('Failed to delete server')
        })
    }

    function getAndSetServer(): void {
        ServerService.getServer(id).then((fetchedServer) => {
            server = fetchedServer
            _getAndSetNetworkAdapters()
        }).catch(() => {
            popUpMessageStore.addMessage("404 Server with id not found!")
        })
    }

    function _getAndSetNetworkAdapters(): void {
        ServerNetworkAdapterService.getNetworkAdaptersOfServer(server).then((networkAdaptersServer) => {
            networkAdapters = networkAdaptersServer
        }).catch((err) => {
            popUpMessageStore.addMessage("Could not fetch network adapters of server")
        })
    }

    function _getAndSetHardDisks(): void {
        ServerHardDiskService.getHardDisksOfServer(server).then((hardDisksOfServers) => {
            hardDisks = hardDisksOfServers
        }).catch((err) => {
            popUpMessageStore.addMessage("Could not fetch the hard disks of this server")
        })
    }
</script>

<style>
    div.icon, div.side-bar {
        display: inline-block;
        width: 250px;
    }
    div.main-content {
        display: inline-block;
        vertical-align: top;
        width: 70%;
    }

    details {
        position: relative;
        box-shadow: 0 1px 1px 0 rgb(52, 73, 102),0 3px 1px -2px rgb(52, 73, 102),0 1px 5px 0 rgba(0,0,0,0.2);
        border-radius: 5px;
        text-align: left;
        padding: 5px;
        margin-right: 5px;
    }
    summary {
        font-weight: bold;
    }

    div.header {
        width: auto;
        display: inline-block;
        vertical-align: top;
        margin: 0;
        padding: 0;
    }

    h3 {
        height: 40px;
        font-weight: bold;
    }

    div.inline {
        display: inline-block;
        vertical-align: bottom;
        width: 150px;
    }
</style>

<svelte:head>
    {#if server}
        <title>Server { server.name }</title>
    {/if}
</svelte:head>

<Container cssClass="large">
    {#if server}
        <div>
            <div class="icon">
                {#if server.imagePath}
                    <Img src={ BASE_MEDIA_URL + server.imagePath } alt={server.name} />
                {:else }
                    <Img src="no-server-image.svg" alt={server.name} />
                {/if}
            </div>
            <div class="header">
                <h1>{server.name}</h1>
                <div class="inline">
                    <Button on:click={toggleEditMode}>{editMode ? 'View mode' : 'Edit mode' }</Button>
                </div>
                <div class="inline">
                    <Button on:click={deleteServer} backgroundColor="#721c24">Delete</Button>
                </div>
            </div>
        </div>
        <div class="side-bar">
            <details>
                <summary>Network adapters of server</summary>
                <NetworkAdapterList {networkAdapters} />
            </details>
        </div>
        <div class="main-content">
            {#if editMode}
                <div>
                    <ErrorList fieldsErrors={fieldsErrors} />
                    <ServerForm
                        bind:server={server}
                        bind:serverIcon={serverIcon}
                    />
                    <Button on:click={updateServer}>Save</Button>
                </div>
            {:else }
                <h3>Server description:</h3>
                <MarkdownViewer markdown={server.description} />
            {/if}
        </div>
    {:else}
        <LoadingSpinner />
    {/if}
</Container>
