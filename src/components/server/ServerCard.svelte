<script lang="ts">
    import type {Server} from "../../models/server";
    import Link from "../shared/buttons/Link.svelte";
    import Img from "../shared/Img.svelte";
    import {BASE_MEDIA_URL} from "../../configs";
    export let server: Server
</script>

<style>
    article {
        position: relative;
        box-shadow: 0 1px 1px 0 rgba(0,0,0,0.07),0 3px 1px -2px rgba(0,0,0,0.6),0 1px 5px 0 rgba(0,0,0,0.2);
        border-radius: 5px;
        text-align: left;
        padding: 5px;
    }

    div.img {
        position: relative;
        height: 350px;
        width: 98%;
        margin: 0;
        padding: 0;
    }

    span, h1 {
        text-align: center;
        display: block;
        padding-top: 5px;
    }

    div {
        text-align: center;
        padding-left: 20px;
        padding-right: 20px;
    }
</style>
<article>
    <div class="img">
        {#if server.imagePath}
            <Img src={ BASE_MEDIA_URL  + server.imagePath} alt={server.name} />
        {:else}
            <!--TODO set default image-->
            <Img src="no-image-available.png" alt={server.name} />
        {/if}
    </div>
    <h1>{server.name}</h1>
    <!--TODO add badge-->
    <span>Server power: {server.powerStatus ? 'on': 'off'}</span>
    <div>
        <Link href="/server/{server.id}">
            <span>View {server.name} server</span>
        </Link>
    </div>
</article>
