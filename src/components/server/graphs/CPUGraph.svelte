<script lang="ts">
    // https://github.com/himynameisdave/svelte-frappe-charts
    import Chart from 'svelte-frappe-charts';
    import type {CpuUsage} from "../../../models/server/cpuUsage";

    export let cpuUsages: CpuUsage[] = []

    // TODO move to its own component
    let chartData
    $: chartData = {
        labels: cpuUsages.map((usage) => usage.createdAt.toLocaleString()),
        yMarkers: [
            {
                label: "CPU Usage%", value: 100
            }
        ],
        datasets: [
            {
                name: "Cpu usage",
                values: cpuUsages.map((usage) => usage.averageCpuUsagePastMinute),
                barOptions: {
                    max: 100
                }
            }
        ]
    };
</script>


{#if chartData}
    <Chart
        data={chartData}
        type="line"
    />
{/if}
