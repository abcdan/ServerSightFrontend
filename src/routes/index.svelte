<script>
    import {onMount} from "svelte";
    import {fade} from 'svelte/transition';
    import {Auth} from "../services/auth/auth";
    import LoadingSpinner from "../components/shared/LoadingSpinner.svelte";
    import Link from "../components/shared/buttons/Link.svelte";
    import SecondaryLink from "../components/shared/buttons/SecondaryLink.svelte";

    const animationDurationInMs = 500
    let showInformationPage = false

    onMount(async () => {
        if (Auth.isUserLoggedIn()) {
            const goto = await import("@sapper/app");
            goto('/servers', {})
        } else {
            showInformationPage = true
        }
    })
</script>
<style>
    section {
        display: inline-flex;
        gap: 5px;
        flex-direction: row;
        align-items: flex-start;
        justify-content: center;
        height: 100vw;
        width: 100%;
        background: linear-gradient(180deg, rgba(52, 73, 102, 1) 0%, rgba(13, 24, 33, 1) 100%);
        margin: auto;
    }

    img {
        height: 150px;
    }

    h1 {
        font-size: 90px;
    }

    p {
        font-size: 20px;
    }

    span {
        display: block;
        padding-top: 7px;
        padding-left: 5px;
        padding-right: 5px;
    }

    div.link-wrapper {
        width: 200px;
    }

    h1, p {
        color: white;
        margin: 0;
        padding: 0;
        text-align: left;
    }

    @media only screen and (max-width: 1000px) {
        p, h1 {
            font-size: initial;
        }
        div.link-wrapper {
            width: 100%;
        }
    }
</style>

<svelte:head>
    <title>Welcome to server sight</title>
</svelte:head>

{#if showInformationPage}
    <section transition:fade={{duration: animationDurationInMs}} >
        <img src="/logo-512.png" alt="server sight logo" />
        <div>
            <h1>Welcome to server sight!</h1>
            <p>
                Start documenting and getting insights into your servers. This will be done with the following features.
            </p>
            <div class="link-wrapper">
                <SecondaryLink href="/servers">
                    <span>Start using!</span>
                </SecondaryLink>
            </div>
        </div>
    </section>
{:else}
    <span>Redirecting to server page</span>
    <LoadingSpinner/>
{/if}
