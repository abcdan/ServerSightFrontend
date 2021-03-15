<script lang="ts">
    import Button from "../../components/shared/buttons/Button.svelte";
    import {onMount} from "svelte";
    import {ApiKeyService} from "../../services/apiKey/apiKeyService";
    import {popUpMessageStore} from "../../stores/popupMessagesStore";
    import Container from "../../components/shared/Container.svelte";
    import {slide} from "svelte/transition";

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

<svelte:head>
    <title>Api key management</title>
</svelte:head>
<Container>
    <h1>Api keys</h1>
    <p>
        Here you can manage your api keys that will be used on your servers.
    </p>
    {#if !apiKey}
        <div transition:slide|local>
            <Button on:click={createKey}>Create API key</Button>
        </div>
    {:else}
        <div transition:slide|local>
            <p>API key: {apiKey} </p>
            <Button on:click={deleteKey} backgroundColor="#721c24">Delete API key</Button>
        </div>
    {/if}
</Container>
