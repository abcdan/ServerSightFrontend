<script lang="ts">
    // https://github.com/himynameisdave/svelte-frappe-charts
    import Chart from 'svelte-frappe-charts';

    export let y: Date[] = []
    export let x: number[] = []
    export let maxYValue = 100;
    export let colors = ['#344966']

    const lineOptions = {
        regionFill: 1,
        xIsSeries: true,
        dotSize: 4,
    }

    let chartData
    $: if (y.length > 0 && x.length > 0) {
        chartData = {
            // if there are more than 720 minutes then also display the date because it is bigger than a day.
            labels: y.length > 720  ?
                y.map((date) => date.toLocaleString()):
                y.map((date) => `${date.getHours()}:${date.getMinutes()}`),
            yMarkers: [
                {
                    label: "CPU Usage%",
                    value: maxYValue,
                }
            ],
            datasets: [
                {
                    name: "Cpu usage",
                    type: 'line',
                    values: x,
                    barOptions: {
                        max: maxYValue
                    },
                }
            ]
        }
    }
</script>

<style>
    span {
        font-style: italic;
    }
</style>

{#if chartData}
    <Chart
            data={chartData}
            {lineOptions}
            {colors}
            type="line"
    />
    <span>If a point is blank that means there was no cpu usage for that given minute</span>
{/if}
