<script lang="ts">
    import DatePicker from "@beyonk/svelte-datepicker/src/components/DatePicker.svelte";
    import Button from "../../../shared/buttons/Button.svelte";
    import {createEventDispatcher} from "svelte";

    const eventDispatcher = createEventDispatcher()
    function onNewGraph(minutesFromNow: number, text: string): void {
        let fromDate: Date = new Date()
        fromDate.setMinutes(fromDate.getMinutes() - minutesFromNow - 1)
        fromDate.setSeconds(0)

        let toDate: Date = new Date()

        eventDispatcher('time-selected', {
            toDate,
            fromDate,
            text
        })
    }

    function onCustomDate(event): void{
        const fromDate = event.detail.from
        const toDate = event.detail.to

        let text = `${fromDate} to ${toDate}`
        eventDispatcher('time-selected', {
            toDate,
            fromDate,
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
            text: 'past hour',
            minutesToRetrieve: 60
        },
    ]

</script>
<style>
    .button-graph-wrapper {
        display: flex;
        flex-direction: row;
        list-style-type: none;
        flex-wrap: wrap;
        padding: 0;
        margin-bottom: 5px;
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
Pick custom timeframe:
<DatePicker
    time=true
    range={true}
    on:range-selected={onCustomDate}
    >
    <Button
            backgroundColor="#0d1821"
    >
        <span>Select custom time</span>
    </Button>
</DatePicker>
