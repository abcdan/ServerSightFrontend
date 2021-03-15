<script lang="ts">
    import Button from "../../components/shared/buttons/Button.svelte";
    import {onMount} from "svelte";
    import {ApiKeyService} from "../../services/apiKey/apiKeyService";
    import {popUpMessageStore} from "../../stores/popupMessagesStore";
    import Container from "../../components/shared/Container.svelte";

    let apiKey: string = undefined

    onMount(() => {
        ApiKeyService.getKey().then((key) => {
            console.log(key)
            apiKey = key
        }).catch((ignored) => {
            // TODO handle
        })
    })

    function createKey() {
        ApiKeyService.setKey().then((key) => {
            popUpMessageStore.addMessage('New api key generated!')
            apiKey = key
        })
    }

    function deleteKey() {
        ApiKeyService.deleteKey().then(() => {
            popUpMessageStore.addMessage('Api key deleted')
            apiKey = undefined
        })
    }
</script>


<Container>
    <h1>Api keys</h1>
    <p>
        Here you can manage your api keys that will be used on your servers.
    </p>
    {#if apiKey}
        <Button on:click={deleteKey} backgroundColor="#721c24">Delete API key</Button>
        <p>API key: {apiKey} </p>
    {:else}
        <Button on:click={createKey}>Create API key</Button>
    {/if}
</Container>
