<script lang="ts">
    import {stores} from "@sapper/app";
    import {Server} from "../../../models/server/server";
    import {onMount} from "svelte";
    import {ServerService} from "../../../services/server/serverService";
    import {popUpMessageStore} from "../../../stores/popupMessagesStore";

    const {page} = stores();
    const {id} = ($page as any).params;

    let server: Server
    let ready: boolean = false

    onMount(() => {
        getAndSetServer()
        ready = true
    })

    function getAndSetServer(): void {
        ServerService.getServer(id).then((fetchedServer) => {
            server = fetchedServer
        }).catch(() => {
            popUpMessageStore.addMessage("404 Server with id not found!")
        })
    }
</script>

