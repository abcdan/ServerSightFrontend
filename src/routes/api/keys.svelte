<script lang="ts">
    import Button from "../../components/shared/buttons/Button.svelte";
    import {onMount} from "svelte";
    import {ApiKeyService} from "../../services/apiKey/apiKeyService";
    import {popUpMessageStore} from "../../stores/popupMessagesStore";
    import Container from "../../components/shared/Container.svelte";
    import {slide} from "svelte/transition";
    import ApiKeyList from "../../components/api-keys/ApiKeyList.svelte";

    let apiKeys: string[] = []

    onMount(() => {
        ApiKeyService.getKeys().then((key) => {
            apiKeys = key
        }).catch((ignored) => {
            popUpMessageStore.addMessage('Failed to get keys. Try again later!')
        })
    })

    function createKey() {
        ApiKeyService.saveKey().then((key) => {
            popUpMessageStore.addMessage('New api key generated!')
            apiKeys = [key, ...apiKeys]
        })
    }

    function deleteKey(event) {
        const apiKeyToDelete = event.detail
        ApiKeyService.deleteKey(apiKeyToDelete).then(() => {
            popUpMessageStore.addMessage('Api key deleted')
            apiKeys = apiKeys.filter(apiKey => apiKey !== apiKeyToDelete)
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
    <div transition:slide|local>
        <Button on:click={createKey}>Create API key</Button>
    </div>
    {#if apiKeys}
        <ApiKeyList on:delete={deleteKey} {apiKeys} />
    {/if}
</Container>
