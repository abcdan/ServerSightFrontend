<script lang="ts">
    import {Jwt} from "../../services/auth/jwt";
    import {goto} from "@sapper/app.mjs";
    import {onMount} from "svelte";
    import Nav from "../../components/Nav.svelte";

    export let segment;
    onMount(() => {
        // TODO ook iets doen met als je een 401/3 krijgt ofzo
        if (Jwt.getJwt() === undefined) {
            goto('/auth/register', {})
        }
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
</style>
<main>
    <Nav {segment} />
    <div>
        <slot />
    </div>
</main>
