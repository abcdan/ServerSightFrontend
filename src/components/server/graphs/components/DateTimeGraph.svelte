<script lang="ts">
    // https://github.com/himynameisdave/svelte-frappe-charts
    import Chart from 'svelte-frappe-charts';

    export let y: Date[] = []
    // for 1 line a chart
    export let x: number[] = []
    // for multiple lines in a single chart
    export let datasets: { name: string, values: number[]}[] = []
    export let maxYValue:number = 0;
    export let colors: string[] = ['#344966']
    export let label: string

    let lineOptions
    $: lineOptions = {
        regionFill: 1,
        xIsSeries: true,
        dotSize: 4,
        maxValue: maxYValue,
        max: maxYValue
    }

    let chartData
    $: if ((y.length > 0 && x.length > 0) || datasets) {
        chartData = {
            // if there are more than 720 minutes then also display the date because it is bigger than a day.
            labels: y.length > 720  ?
                y.map((date) => date.toLocaleString()):
                y.map((date) => `${date.getHours()}:${date.getMinutes() < 9 ? '0' : ''}${date.getMinutes()}`),
            yMarkers: [
                {
                    label: label,
                    value: maxYValue,
                }
            ],
            datasets:
                x.length !== 0 ?
                 [
                    {
                        name: label,
                        type: 'line',
                        values: x,
                    }
                ]
                : datasets
        }
    }
</script>

{#if chartData}
    <Chart
        data={chartData}
        {lineOptions}
        {colors}
        type="line"
    />
{/if}
