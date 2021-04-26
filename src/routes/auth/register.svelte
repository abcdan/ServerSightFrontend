<script lang="ts">
    import {goto} from '@sapper/app';
    import Button from "../../components/shared/buttons/Button.svelte";
    import type {User} from "../../models/user/user";
    import {Auth} from "../../services/auth/auth";
    import {FieldsErrors} from "../../services/error/fields.error";
    import {FieldError} from "../../services/error/field.error";
    import AuthForm from "../../components/auth/AuthForm.svelte";
    import Container from "../../components/shared/Container.svelte";
    import ErrorList from "../../components/errors/ErrorList.svelte";
    import Link from "../../components/shared/buttons/Link.svelte";
    import {FirebaseDeviceService} from "../../services/firebase/firebaseDevice";
    import {onMount} from "svelte";
    let getFirebaseConfig

    onMount(async() => {
        const firebaseSetupModule = await import("../../services/firebase/getFirebaseConfig");
        getFirebaseConfig = firebaseSetupModule.getFirebaseConfig
    })

    let user: User = {
        email: '',
        password: ''
    }

    let fieldsErrors: FieldError[] = []

    function submitRegister(): void {
        Auth.register(user).then(() => {
            fieldsErrors = []

            getFirebaseConfig().then((firebaseConfig) => {
                FirebaseDeviceService.registerFirebaseDevice(firebaseConfig).then()
            })

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

    span {
        display: block;
        text-align: center;
        padding-top: 5px;
    }
</style>

<svelte:head>
    <title>Register server sight</title>
</svelte:head>

<Container>
    <h1>Register on Server Sight</h1>
    <p>
        Server sight is an application where you can document your servers and get insights to them.
        Register here to check it out!
    </p>
    <Link href="auth/login">
        <span>Already have an account?</span>
    </Link>
    <ErrorList fieldsErrors={fieldsErrors} />
    <form on:submit|preventDefault={submitRegister}>
        <div>
            <AuthForm on:value={(newUser) => user = newUser.detail}/>
        </div>
        <div>
            <Button>
                Register
            </Button>
        </div>
    </form>
</Container>
