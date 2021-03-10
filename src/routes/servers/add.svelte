<script lang="ts">
    import Container from "../../components/shared/Container.svelte";
    import ServerForm from "../../components/server/ServerForm.svelte";
    import type {Server} from "../../models/server";
    import Button from "../../components/shared/buttons/Button.svelte";
    import {ServerService} from "../../services/server/serverService";
    import {FieldsErrors} from "../../services/error/fields.error";
    import {FieldError} from "../../services/error/field.error";
    import ErrorList from "../../components/errors/ErrorList.svelte";
    import {popUpMessageStore} from "../../stores/popupMessages";
    import {goto} from "@sapper/app";

    let server: Server
    let fieldsErrors: FieldError[] = []

    let serverIcon: File
    let serverCreated = true

    function saveServer() {
        popUpMessageStore.addMessage('Saving new server. Please wait!')

        ServerService.saveSaver(server, serverIcon[0]).then((savedServer) => {
            popUpMessageStore.addMessage(`Added ${server.name}`)
            goto('/servers', {});
        }).catch((err) => {
            if (err instanceof FieldsErrors) {
                fieldsErrors = (err as FieldsErrors).fields
            }
        })
    }
</script>

<style>
    div {
        width: 100%;
        min-height: 25%;
        padding-top: 10px;
    }
</style>

<svelte:head>
    <title>Add server</title>
</svelte:head>

<Container cssClass="large">
    <h1>
        Add a server
    </h1>
    <p>
        Here you can add a server and add documentation.
        Also when the server is created you can create a key to push data from your server to this platform.
    </p>
    <div>
        <ErrorList fieldsErrors={fieldsErrors} />
        <ServerForm
            bind:server={server}
            bind:serverIcon={serverIcon}
        />
    </div>
    <br>
    <Button on:click={saveServer}>Save</Button>
</Container>
