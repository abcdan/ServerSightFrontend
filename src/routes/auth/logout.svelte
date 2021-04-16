<script lang="ts">
    import {Auth} from "../../services/auth/auth";
    import {onMount} from "svelte";
    import {goto} from "@sapper/app.mjs";
    import LoadingSpinner from "../../components/shared/LoadingSpinner.svelte";

    onMount(() => {
        Auth.logoutUser()
        goto('/auth/register')
    })
</script>

<span>Logging you out please wait....</span>
<LoadingSpinner />
