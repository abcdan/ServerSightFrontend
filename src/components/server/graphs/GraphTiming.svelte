<script lang="ts">
    import Button from "../../shared/buttons/Button.svelte";
    import {createEventDispatcher} from "svelte";

    const eventDispatcher = createEventDispatcher()
    function onNewGraph(minutesFromNow: number, text: string): void {
        eventDispatcher('time-selected', {
            minutesFromNow,
            text
        })
    }

    const TIME_RETRIEVAL_OPTIONS: { minutesToRetrieve: number; text: string }[] = [
        {
            text: 'past 5 minutes',
            minutesToRetrieve: 5
        },
        {
            text: 'past 30 minutes',
            minutesToRetrieve: 30
        }, {
            text: 'past day',
            minutesToRetrieve: 720
        },
    ]

</script>
<style>
    .button-graph-wrapper {
        display: flex;
        flex-direction: row;
        list-style-type: none;
        flex-wrap: wrap;
        margin: 0;
        padding: 0;
    }
    .button-graph-wrapper > li {
        margin-right: 6px;
    }

    span {
        padding: 12px;
    }
</style>
<ol class="button-graph-wrapper">
    {#each TIME_RETRIEVAL_OPTIONS as timeRetrieval}
        <li>
            <Button on:click={() => onNewGraph(timeRetrieval.minutesToRetrieve, timeRetrieval.text)}>
                <span>{ timeRetrieval.text }</span>
            </Button>
        </li>
    {/each}
</ol>
