<script lang="ts">
    // https://github.com/himynameisdave/svelte-frappe-charts
    import Chart from 'svelte-frappe-charts';
    import type {CpuUsage} from "../../../models/server/cpuUsage";

    export let cpuUsages: CpuUsage[] = []

    // TODO move to its own component
    let chartData
    $: chartData = {
        labels: cpuUsages.map((usage) => usage.createdAt.toLocaleString()),
        yMarkers: [{ label: "CPU Usage%", value: 100 }],
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

    function getStartDate() {
        try {
            return new Date(cpuUsages[0].createdAt)
        } catch (ignored) {
            return Date()
        }
    }

    function getEndDate() {
        try {
            return new Date(cpuUsages[cpuUsages.length - 1].createdAt)
        } catch (ignored) {
            return Date()
        }
    }

    $: console.log(chartData)
</script>


{#if chartData}
    <Chart
        data={chartData}
        type="line"
    />
{/if}
