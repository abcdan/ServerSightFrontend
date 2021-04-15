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
        position: relative;
        width: 98%;
        margin: 0;
        padding: 0;
    }

    span, h1 {
        text-align: left;
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
        <!--   TODO set icon for event type     -->
        <EventIcon {event} />
    </div>
    <span>{event.description}</span>
    <span>Event occured: {event.createdAt.toLocaleString()}</span>
</article>
