<script lang="ts">
    import {stores} from "@sapper/app";

    export let server;
    const {page} = stores();
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
        width: 25%;
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
         <hr class={$page.path.startsWith("/servers/graph") ? 'second-activated': ''} />
    </ul>
</section>
