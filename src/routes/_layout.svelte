<script lang="ts">
    import Popup from "../components/popup/Popup.svelte";
    import {setup} from "../services/httpClient/httpRequestListener";
    import {onMount} from "svelte";
    import {stores} from '@sapper/app'
    import Nav from "../components/Nav.svelte";

    const {page} = stores()

    onMount(async () => {
        // import needs to be like this else the wrong firebase will be initialized
        const firebaseSetupModule = await import("../services/firebase/firebaseMessenger");
        firebaseSetupModule.setupMessagingNotificationReceiver()
        setup()
    })

</script>
<style>
    div {
        position: absolute;
        top: 75px;
        left: 0;
        right: 0;
        bottom: 0;
    }

    @media only screen and (max-width: 1000px) {
        div {
            top: 50px;
        }
    }
</style>

<!--  Exclude the home page  -->
{#if $page.path === "/"}
    <main>
        <slot />
    </main>
{:else}
    <Nav />
    <main>
        <Popup />
        <div>
            <slot />
        </div>
    </main>
{/if}
