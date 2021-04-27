<script lang="ts">
    import { fly } from 'svelte/transition';

    import { popUpMessageStore } from "../../stores/popupMessagesStore";

    let messages = []

    popUpMessageStore.subscribe(newMessages => {
        messages = newMessages
    })

    // remove last message every 5 seconds
    setInterval(() => {
        popUpMessageStore.removeMessage(messages.length - 1)
    }, 5000)
</script>

<style>
    section {
        position: absolute;
        top: 80px;
        left: 20%;
        width: 60%;
        margin: 0 auto;
        height: 20vh;
        z-index: 100;
    }

    div {
        margin-bottom: 5px;
        padding: 5px;
        background-color: #F0F4EF;
        box-shadow: 0 1px 1px 0 rgba(0,0,0,0.07),0 3px 1px -2px rgba(0,0,0,0.6),0 1px 5px 0 rgba(0,0,0,0.2);
        border-radius: 5px;
    }

    @media only screen and (max-width: 1000px) {
        section {
            top: 50px;
            left: 10%;
            width: 80%;
        }
    }
</style>

{#if messages.length > 0}
    <section>
        {#each messages as message}
            <div transition:fly|local={{duration: 500}}>
                <b>{ message }</b>
            </div>
        {/each}
    </section>
{/if}
