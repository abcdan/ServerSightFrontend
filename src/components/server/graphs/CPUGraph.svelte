<script lang="ts">
    // https://github.com/himynameisdave/svelte-frappe-charts
    import Chart from 'svelte-frappe-charts';
    import type {CpuUsage} from "../../../models/server/cpuUsage";

    export let cpuUsages: CpuUsage[] = []

    // TODO move to its own component
    let chartData
    $: chartData = {
        labels: cpuUsages.map((usage) => usage.createdAt),
        datasets: [
            {
                name: "Cpu usage",
                values: cpuUsages.map((usage) => usage.averageCpuUsagePastMinute),
                // start: getStartDate(),
                // end: getEndDate()
                barOptions: {
                    max: 100
                }
            }
        ]
    };

    function getStartDate() {
        try {
            return cpuUsages[0].createdAt
        } catch (ignored) {
            return Date()
        }
    }

    function getEndDate() {
        try {
            cpuUsages[cpuUsages.length - 1].createdAt
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
