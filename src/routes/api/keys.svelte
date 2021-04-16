<script lang="ts">
    import Button from "../../components/shared/buttons/Button.svelte";
    import {onMount} from "svelte";
    import {ApiKeyService} from "../../services/apiKey/apiKeyService";
    import {popUpMessageStore} from "../../stores/popupMessagesStore";
    import Container from "../../components/shared/Container.svelte";
    import {slide} from "svelte/transition";
    import ApiKeyList from "../../components/api-keys/ApiKeyList.svelte";

    let apiKeys: string[] = []

    $: console.log(apiKeys)
    onMount(() => {
        ApiKeyService.getKeys().then((key) => {
            apiKeys = key
        }).catch((ignored) => {
            popUpMessageStore.addMessage('Failed to get keys. Try again later!')
        })
    })

    function createKey() {
        ApiKeyService.setKey().then((key) => {
            popUpMessageStore.addMessage('New api key generated!')
            apiKeys = [key, ...apiKeys]
        })
    }

    function deleteKey(event) {
        ApiKeyService.deleteKey(event.detail).then(() => {
            popUpMessageStore.addMessage('Api key deleted')
            apiKeys = undefined
        })
    }
</script>

<svelte:head>
    <title>Api key management</title>
</svelte:head>

<style>
    div {
        margin-bottom: 10px;
        width: 100%;
    }
</style>

<Container>
    <h1>Api keys</h1>
    <p>
        Here you can manage your api keys that will be used on your servers.
    </p>
    {#if apiKeys}
        <div transition:slide|local>
            <Button on:click={createKey}>Create API key</Button>
        </div>
        <ApiKeyList on:delete={deleteKey} {apiKeys} />
<!--        <div transition:slide|local>-->
<!--            <p>API key: {apiKeys} </p>-->
<!--            <Button on:click={deleteKey} backgroundColor="#721c24">Delete API key</Button>-->
<!--        </div>-->
    {/if}
</Container>
