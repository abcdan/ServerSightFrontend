<script lang="ts">
    import Input from "../shared/Input.svelte";
    import type {User} from "../../models/user";
    import {createEventDispatcher} from "svelte";

    let user: User = {
        email: '',
        password: ''
    }

    let eventDispatcher = createEventDispatcher()
    $: eventDispatcher('value', user)


</script>
<form on:submit|preventDefault>
    <div>
        <Input bind:value={user.email} labelTxt="Email:" placeholder="Your email" type="email"/>
    </div>
    <div>
        <Input bind:value={user.password} labelTxt="Password:" placeholder="Your password" type="password"/>
    </div>
</form>
