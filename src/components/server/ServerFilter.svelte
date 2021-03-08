<script lang="ts">
    import Input from "../shared/Input.svelte";
    import Toggler from "../shared/Toggler.svelte";

    let nameSearch = ''
</script>

<Input bind:value={nameSearch} labelTxt="Search by name" placeholder="Search by name" type="text" />
<label>Power status</label>
<Toggler>
    Power status
</Toggler>
