<script>
    import {goto} from "@sapper/app.mjs";
    import {onMount} from "svelte";
    import LoadingSpinner from "../components/shared/LoadingSpinner.svelte";

    onMount(() => {
        goto('/servers', {})
    })
</script>
<span>Redirecting to server page</span>
<LoadingSpinner/>
