<script lang="ts">
    import type {ServerEvent} from "../../../models/server/serverEvent";
    import EventIcon from "./EventIcon.svelte";

    export let event: ServerEvent
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
        display: inline-block;
        vertical-align: middle;
        height: 100%;
        margin-right: 5px;
        padding: 0;
    }

    div.container {
        display: inline-block;
        width: calc(100% - 50px);
        margin: 0;
        padding: 0;
    }

    span {
        text-align: left;
        display: block;
        padding-top: 5px;
    }
</style>
<article>
    <div class="img">
        <EventIcon {event} />
    </div>
    <div class="container">
        <span>{event.description}</span>
        <span>Event occurred at: {event.createdAt.toLocaleString()}</span>
    </div>
</article>
