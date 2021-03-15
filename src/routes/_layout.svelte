<script lang="ts">
    import Nav from "../components/Nav.svelte";
    import Popup from "../components/shared/Popup.svelte";
    import {setup} from "../services/httpClient/httpRequestListener";

    setup()
    export let segment;
</script>

<style>
    div {
        position: absolute;
        top: 75px;
        left: 0;
        right: 0;
        bottom: 0;
    }

    @media only screen and (max-width: 1200px) {
        div {
            position: absolute;
            top: 150px;
            left: 0;
            right: 0;
            bottom: 0;
        }
    }
</style>
<main>
    <Nav {segment} />
    <Popup />
    <div>
        <slot />
    </div>
</main>

