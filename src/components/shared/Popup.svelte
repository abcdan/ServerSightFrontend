<script lang="ts">
    import { slide } from 'svelte/transition';

    import { popUpMessageStore } from "../../stores/popupMessagesStore";

    let messages = []

    popUpMessageStore.subscribe(newMessages => {
        messages = newMessages
    })

    // remove last message every 3 seconds
    setInterval(() => {
        // console.log(messages.length - 1)
        popUpMessageStore.removeMessage(messages.length - 1)
    }, 5000)
</script>

<style>
    section {
        position: absolute;
        top: 80px;
        left: 30%;
        width: 40%;
        margin: 0 auto;
        height: 20vh;
        z-index: 100;
    }

    div {
        margin-bottom: 5px;
        padding: 5px;
        background-color: #F0F4EF;
        border: 1px solid #344966;
        border-radius: 5px;
    }

    @media only screen and (max-width: 1200px) {
        section {
            top: 150px;
            left: 20%;
            width: 60%;
        }
    }
</style>

{#if messages.length > 0}
    <section>
        {#each messages as message}
            <div transition:slide|local>
                <b>{ message }</b>
            </div>
        {/each}
    </section>
{/if}
