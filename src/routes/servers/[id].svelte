<script lang="ts">
    import {onMount} from "svelte";
    import {goto, stores} from "@sapper/app";
    import {ServerService} from "../../services/server/serverService";
    import type {Server} from "../../models/server";
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


    const {page} = stores();

    const {id} = ($page as any).params;

    let server: Server = undefined
    let serverIcon: any = undefined
    let fieldsErrors: FieldError[] = []
    let editMode: boolean = false

    onMount(() => {
        getAndSetServer()
    })

    function toggleEditMode(): void {
        editMode = !editMode
    }

    function updateServer(): void {
        ServerService.updateServer(server, serverIcon ? serverIcon[0] : undefined).then((savedServer) => {
            popUpMessageStore.addMessage(`Updated ${server.name}`)
            editMode = false
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
        }).catch(() => {
            popUpMessageStore.addMessage("404 Server with id not found!")
        })
    }
</script>

<style>
    div.icon, div.side-bar {
        display: inline-block;
        width: 175px;
    }
    div.main-content {
        display: inline-block;
        width: 100%;
    }

    div.header {
        width: auto;
        display: inline-block;
        vertical-align: top;
        margin: 0;
        padding: 0;
    }

    h1 {
        height: 40px;
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
                    <Button on:click={toggleEditMode}>{editMode ? 'Edit mode' : 'View mode' }</Button>
                </div>
                <div class="inline">
                    <Button on:click={deleteServer} backgroundColor="#721c24">Delete</Button>
                </div>
            </div>
        </div>
        <div class="side-bar">
            <!-- TODO fill-->
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
                <h1>Server description:</h1>
                <MarkdownViewer markdown={server.description} />
            {/if}
        </div>
    {:else}
        <!--  TODO add loading thingie (also to server page)  -->
    {/if}
</Container>
