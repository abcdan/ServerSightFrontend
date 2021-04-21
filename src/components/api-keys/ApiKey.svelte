<script lang="ts">
    import Button from "../shared/buttons/Button.svelte";
    import {createEventDispatcher} from "svelte";

    export let apiKey: string;

    const eventDispatcher = createEventDispatcher()

    function deleteKey() {
        eventDispatcher('delete', apiKey)
    }
</script>

<style>
    article {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
    }

    span {
        font-size: 18px;
    }
    .button-wrapper {
        margin-left: auto;
        width: 10rem;
    }
</style>
<article>
    <span>Api key: <b>{ apiKey }</b></span>
    <div class="button-wrapper">
        <Button on:click={deleteKey} backgroundColor="#721c24">Delete API key</Button>
    </div>
</article>
