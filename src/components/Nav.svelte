<script>
    import SecondaryLink from "./shared/buttons/SecondaryLink.svelte";
    import Img from "./shared/Img.svelte";
    import {fly} from "svelte/transition"

    let expanded = false
</script>

<style>
    nav.desktop {
        position: absolute;
        display: block;
        top: 0;
        height: 75px;
        width: 100%;
        background-color: #344966;
    }

    nav.mobile {
        position: absolute;
        display: none;
        top: 0;
        height: auto;
        width: 100vw;
        z-index: 50;
        background-color: #344966;
    }

    img {
        height: 50px;
        outline: none;
        color: transparent;
        float: left;
    }

    div.mobile-container {
        width: 100vw;
        height: auto;
        margin: 0;
    }

    h1{
        display: inline-block;
        color: #F0F4EF;
        float: left;
    }

    div {
        display: inline-block;
        margin-top: 17px;
    }

    div.pages {
        float: left;
        margin-left: 10px;
        margin-right: 10px;
    }

    div.logo {
        height: 75px;
        margin: 0 !important;
    }

    div.mobile-item {
        display: block;
        width: calc(100% - 20px);
        margin: 5px;
    }

    div.logout {
        float: right;
        margin-right: 10px;
    }

    span {
        display: block;
        padding-top: 7px;
        padding-left: 5px;
        padding-right: 5px;
    }

    @media only screen and (max-width: 1000px) {
        h1 {
            float: none;
        }
        nav.desktop {
            display: none;
        }
        nav.mobile {
            display: block;
        }
    }
</style>
<nav class="desktop">
    <div class="pages logo">
        <Img src="favicon.png" alt="server icon" />
    </div>
    <div class="pages">
        <h1>Server sight dashboard</h1>
    </div>
    <div class="pages">
        <SecondaryLink href="/servers">
            <span>Your servers</span>
        </SecondaryLink>
    </div>
    <div class="pages">
        <SecondaryLink href="/api/keys">
            <span>API key management</span>
        </SecondaryLink>
    </div>
    <div class="pages">
        <SecondaryLink href="https://serversight.lukas.sh/swagger/index.html">
            <span>API Documentation</span>
        </SecondaryLink>
    </div>
    <div class="logout">
        <SecondaryLink href="/auth/logout">
            <span>Logout</span>
        </SecondaryLink>
    </div>
</nav>
<nav class="mobile">
    <div class="mobile-container">
        <h1>Server sight dashboard</h1>
        <img on:click={() => expanded = !expanded} src="/hamburger-icon.svg" alt="hamburger icon" />
    </div>
    {#if expanded}
        <div class="mobile-container" transition:fly|local on:click={() => {expanded=false}}>
            <div class="mobile-item">
                <SecondaryLink href="/servers">
                    <span>Your servers</span>
                </SecondaryLink>
            </div>
            <div class="mobile-item">
                <SecondaryLink href="/api/keys">
                    <span>API key management</span>
                </SecondaryLink>
            </div>
            <div class="mobile-item">
                <SecondaryLink href="https://serversight.lukas.sh/swagger/index.html">
                    <span>API Documentation</span>
                </SecondaryLink>
            </div>
            <div class="mobile-item">
                <SecondaryLink href="/servers">
                    <span>Logout</span>
                </SecondaryLink>
            </div>
        </div>
    {/if}
</nav>

