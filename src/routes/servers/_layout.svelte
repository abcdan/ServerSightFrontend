<script lang="ts">
    import {Jwt} from "../../services/auth/jwt";
    import {goto} from "@sapper/app.mjs";
    import {onMount} from "svelte";

    onMount(() => {
        // TODO ook iets doen met als je een 401/3 krijgt ofzo
        if(Jwt.getJwt() === undefined) {
            goto('/auth/register', {})
        }
    })
</script>

<main>
    <slot></slot>
</main>
