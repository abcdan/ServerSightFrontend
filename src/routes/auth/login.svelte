<script lang="ts">
    import {goto} from '@sapper/app';
    import Button from "../../components/shared/buttons/Button.svelte";
    import type {User} from "../../models/user";
    import {Auth} from "../../services/auth/auth";
    import {FieldsErrors} from "../../services/error/fields.error";
    import {FieldError} from "../../services/error/field.error";
    import AuthForm from "../../components/auth/AuthForm.svelte";
    import Container from "../../components/shared/Container.svelte";
    import ErrorList from "../../components/errors/ErrorList.svelte";

    let user: User = {
        email: '',
        password: ''
    }
    let fieldsErrors: FieldError[] = []

    function submitLogin(): void {
        Auth.login(user).then(() => {
            fieldsErrors = []
            goto('/servers', {});
        }).catch((err) => {
            if (err instanceof FieldsErrors) {
                fieldsErrors = (err as FieldsErrors).fields
            }
        })
    }
</script>

<style>
    div {
        margin-bottom: 12px;
    }
</style>

<svelte:head>
    <title>Login server sight</title>
</svelte:head>

<Container>
    <h1>Server sight login</h1>
    <ErrorList fieldsErrors={fieldsErrors} />
    <form on:submit|preventDefault={submitLogin}>
        <div>
            <AuthForm on:value={(newUser) => user = newUser.detail}/>
        </div>
        <div>
            <Button on:click={submitLogin}>
                Login
            </Button>
        </div>
    </form>
</Container>
