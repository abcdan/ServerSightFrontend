<script>
    import {goto} from "@sapper/app.mjs";
    import {onMount} from "svelte";

    onMount(() => {
        goto('/servers', {})
    })
</script>
