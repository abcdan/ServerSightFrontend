<script lang="ts">
    // https://github.com/himynameisdave/svelte-frappe-charts
    import Chart from 'svelte-frappe-charts';
    import type {CpuUsage} from "../../../../models/server/cpuUsage";

    export let cpuUsages: CpuUsage[] = []

    const lineOptions = {
        regionFill: 1,
        xIsSeries: true,
        dotSize: 4,
    }

    const colors = ['#344966']

    let chartData
    $: chartData = {
        // if there are more than 720 minutes then also display the date because it is bigger than a day.
        labels: cpuUsages.length > 720  ?
            cpuUsages.map((usage) => usage.createdAt.toLocaleString()):
            cpuUsages.map((usage) => `${usage.createdAt.getHours()}:${usage.createdAt.getMinutes()}`),
        yMarkers: [
            {
                label: "CPU Usage%",
                value: 100,
            }
        ],
        datasets: [
            {
                name: "Cpu usage",
                type: 'line',
                values: cpuUsages.map((usage) => usage.averageCpuUsagePastMinute),
                barOptions: {
                    max: 100
                },
            }
        ]
    };
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
