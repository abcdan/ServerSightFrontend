<script lang="ts">
    import {onMount} from "svelte";
    import {stores} from "@sapper/app";
    import {ServerService} from "../../services/server/serverService";
    import type {Server} from "../../models/server";
    import {popUpMessageStore} from "../../stores/popupMessages";
    import Img from "../../components/shared/Img.svelte";
    import marked from "marked";
    import Container from "../../components/shared/Container.svelte";
    import Button from "../../components/shared/buttons/Button.svelte";
    import {BASE_MEDIA_URL} from "../../configs";

    const {page} = stores();

    const {id} = ($page as any).params;

    let server: Server = undefined
    onMount(() => {
        ServerService.getServer(id).then((fetchedServer) => {
            server = fetchedServer
        }).catch(() => {
            popUpMessageStore.addMessage("404 Server with id not found!")
        })
    })
</script>

<style>
    div.icon {
        display: inline-block;
        width: 200px;
    }

    div.header, h1 {
        width: auto;
        margin: 0;
        padding: 0;
    }

    div.header {
        display: inline-block;
        height: 40px;
    }

    h1 {
        vertical-align: top;
        height: 100%;
    }

    div.inline {
        display: inline-block;
        vertical-align: bottom;
        width: 150px;
    }

    div.red :global(.style-in-parent) {
        background-color: #721c24;
    }
</style>

<svelte:head>
    {#if server}
        <title>Server { server.name }</title>
    {/if}
</svelte:head>

<Container cssClass="large">
    <section>
        {#if server}
            <div>
                <div class="icon">
                    <Img src={ BASE_MEDIA_URL + server.imagePath } alt={server.name} />
                </div>
                <div class="header">
                    <h1>{server.name}</h1>
                    <div class="inline">
                        <Button>Create server key</Button>
                    </div>
                    <div class="inline">
                        <Button>Edit</Button>
                    </div>
                    <div class="inline red">
                        <Button>Delete</Button>
                    </div>
                </div>
            </div>

            <div>
                <!-- seperate function -->
                {@html marked(server.description)}
            </div>
        {:else}
            <!--  TODO add loading thingie (also to server page)  -->
        {/if}
    </section>
</Container>
