<script lang="ts">
    import {stores} from "@sapper/app";
    import {onMount} from "svelte";

    export let server;
    const {page} = stores();

    const urlToActivation = [
        {
            url: "/servers/graphs",
            cssClass: "second-activated"
        },
        {
            url: "/servers/events",
            cssClass: "third-activated"
        },
        {
            url: "/servers/settings",
            cssClass: "fourth-activated"
        },
    ]

    onMount(() => {

    })

    function getActivationCssClass(route: string): string {
        for (let i = 0; i < urlToActivation.length; i++){
            const path = urlToActivation[i];
            if(route.startsWith(path.url)) return  path.cssClass;
        }

        return 'first-activated'
    }
</script>
<style>
    section.container {
        width: 100%;
        margin: 0 !important;;
        padding: 0 !important;;
    }
    ul {
        margin: 0 !important;
        padding: 0 !important;
    }

    li {
        display: inline;
        text-align: center;
        margin: 0 !important;
        padding: 0 !important;
    }

    a {
        display: inline-block;
        width: 24.5%;
        padding: .75rem 0;
        margin: 0;
        text-decoration: none;
        color: #333;
    }

    .first:hover ~ hr {
        margin-left: 0;
    }

    hr.second-activated, .second:hover ~ hr {
        margin-left: 25%;
    }

    hr.third-activated, .third:hover ~ hr {
        margin-left: 50%;
    }

    hr.fourth-activated, .fourth:hover ~ hr {
        margin-left: 75%;
    }

    hr {
        height: .32rem;
        width: 25%;
        margin: 0;
        background: rgb(52, 73, 102);
        border: none;
        transition: .3s ease-in-out;
    }
</style>

<section class="container">
    <ul>
         <li class="first">
             <a href="/servers/{server.id}">Overview</a>
         </li>
         <li class="second">
             <a href="/servers/graphs/{server.id}">Graphs</a>
         </li>
        <li class="third">
            <a href="/servers/events/{server.id}">Events</a>
        </li>
        <li class="fourth">
            <a href="/servers/settings/{server.id}">Settings</a>
        </li>
        <hr class={getActivationCssClass($page.path)} />
    </ul>
</section>
