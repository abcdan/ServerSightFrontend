<script lang="ts">
    import Input from "../shared/Input.svelte";
    import Toggler from "../shared/Toggler.svelte";
    import {createEventDispatcher} from "svelte";

    const eventDispatcher = createEventDispatcher()

    let nameSearch = ''
    let powerStatusToggle = true;

    function onNewValue(nameSearch, powerStatusToggle) {
        eventDispatcher('filter', {
            name: nameSearch,
            powerstatus: powerStatusToggle
        })
    }

    $: onNewValue(nameSearch, powerStatusToggle)
</script>

<form on:submit|preventDefault>
    <Input bind:value={nameSearch} labelTxt="Search by name" placeholder="Search by name" type="text" />
    <label for="powerToggler">Power status</label>
    <Toggler id="powerToggler" bind:value={powerStatusToggle}>
        Search power {powerStatusToggle ? 'on': 'off'}
    </Toggler>
</form>
