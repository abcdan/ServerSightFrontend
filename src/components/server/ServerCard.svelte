<script lang="ts">
    import type {Server} from "../../models/server";
    import Link from "../shared/Link.svelte";
    import Img from "../shared/Img.svelte";

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
            <Img src={server.imagePath} alt={server.title} />
        {:else}
            <!--TODO set default image-->
            <Img src="no-image-available.png" alt={server.title} />
        {/if}
    </div>
    <h1>{server.title}</h1>
    <div>
        <Link href="/server/{server.id}">
            <span>View {server.title} server</span>
        </Link>
    </div>
</article>
