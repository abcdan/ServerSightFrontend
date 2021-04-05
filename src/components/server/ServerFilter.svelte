<script lang="ts">
    import Input from "../shared/Input.svelte";
    import Toggler from "../shared/buttons/Toggler.svelte";
    import {createEventDispatcher} from "svelte";

    const eventDispatcher = createEventDispatcher()

    let nameSearch = ''
    let ipSearch = ''
    let powerStatusToggle = true;

    function onNewValue(nameSearch, powerStatusToggle, ipSearch) {
        eventDispatcher('filter', {
            name: nameSearch,
            powerstatus: powerStatusToggle,
            ip: ipSearch
        })
    }

    $: onNewValue(nameSearch, powerStatusToggle, ipSearch)
</script>

<form on:submit|preventDefault>
    <Input bind:value={ipSearch} labelTxt="Search by ip" placeholder="Search by ip" type="text" />
    <Input bind:value={nameSearch} labelTxt="Search by name" placeholder="Search by name" type="text" />

    <label for="powerToggler">Power status</label>
    <Toggler id="powerToggler" bind:value={powerStatusToggle}>
        Search power {powerStatusToggle ? 'on': 'off'}
    </Toggler>
</form>
