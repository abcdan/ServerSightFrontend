<script lang="ts">
    import type {Server} from "../../models/server/server";

    export let server: Server
</script>

<style>
    section {
        display: flex;
        flex-direction: row;
        list-style-type: none;
        flex-wrap: wrap;
        margin: 0;
        padding: 0;
        text-decoration: underline;
        text-decoration-width: 2px;
    }

    a {
        font-size: 30px;
        margin-right: 5px;
        text-decoration: none;
    }

    a:hover {
        animation-duration: 200ms;
        animation-name: toBlue;
        color: rgb(52, 73, 102);

    }
</style>

<section>
    <a href="/servers/{server.id}">
        Overview
    </a>
    <a href="/servers/graphs/{server.id}">
        Graphs
    </a>
</section>
