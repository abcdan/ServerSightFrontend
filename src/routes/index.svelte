<script>
    import {onMount} from "svelte";
    import {fade} from 'svelte/transition';
    import {Auth} from "../services/auth/auth";
    import LoadingSpinner from "../components/shared/LoadingSpinner.svelte";
    import SecondaryLink from "../components/shared/buttons/SecondaryLink.svelte";
    import FeatureCard from "../components/about/FeatureCard.svelte";
    import Container from "../components/shared/Container.svelte";

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
    .gradient-background {
        position: fixed;
        height: 100vw;
        width: 100%;
        background: linear-gradient(180deg, rgba(52, 73, 102, 1) 0%, rgba(13, 24, 33, 1) 100%);
    }

    section.welcome-message {
        padding: 10px;
        margin: 0;
        display: inline-flex;
        gap: 5px;
        flex-direction: row;
        align-items: flex-start;
        justify-content: center;
        width: 100%;
    }

    .feature-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        list-style-type: none;
        grid-gap: 25px;
        margin: 0;
        padding: 0;
    }

    img {
        height: 175px;
    }

    h1.welcome-message {
        display: block;
        font-size: 80px;
        float: left;
    }

    p.welcome-message {
        font-size: 20px;
    }

    span {
        display: block;
        padding-top: 7px;
        padding-left: 5px;
        padding-right: 5px;
    }

    div.link-wrapper {
        width: 150px;
    }

    h1.welcome-message, p.welcome-message {
        color: white;
        margin: 0;
        padding: 0;
        text-align: left;
    }

    @media only screen and (max-width: 1000px) {
        p.welcome-message, h1.welcome-message {
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
    <section class="gradient-background" transition:fade={{duration: animationDurationInMs}}>
        <Container cssClass="super-large">
            <section class="welcome-message">
                <img src="/logo-512.png" alt="server sight logo" />
                <div>
                    <h1 class="welcome-message">Welcome to server sight!</h1>
                    <p class="welcome-message">
                        Start documenting and getting insights into your servers. This will be done with the following features.
                    </p>
                    <div class="link-wrapper">
                        <SecondaryLink href="/servers">
                            <span>Start using!</span>
                        </SecondaryLink>
                    </div>
                </div>
            </section>
            <section class="feature-grid">
                <FeatureCard icon="/logo-512.png" name="Documentation">
                    <p>Write server documentation in markdown!</p>
                </FeatureCard>
                <FeatureCard icon="/logo-512.png" name="Documentation">
                    <p>Write server documentation in markdown!</p>
                </FeatureCard>
                <FeatureCard icon="/logo-512.png" name="Documentation">
                    <p>Write server documentation in markdown!</p>
                </FeatureCard>
            </section>
        </Container>
    </section>
{:else}
    <span>Redirecting to server page</span>
    <LoadingSpinner/>
{/if}
