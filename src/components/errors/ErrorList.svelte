<script lang="ts">
    import {FieldsErrors} from "../../services/error/fields.error";
    import Error from "../shared/Error.svelte";

    export let fieldsErrors: FieldsErrors[]
</script>

<style>
    div {
        margin-bottom: 12px;
    }
</style>

{#each fieldsErrors as error}
    <div>
        <Error>
            {error.error}
        </Error>
    </div>
{/each}
