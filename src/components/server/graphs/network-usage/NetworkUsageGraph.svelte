<script lang="ts">
    import {fillEmptyTimestamps} from "../utils";
    import {popUpMessageStore} from "../../../../stores/popupMessagesStore";
    import {onMount} from "svelte";
    import LoadingSpinner from "../../../shared/LoadingSpinner.svelte";
    import DateTimeGraph from "../components/DateTimeGraph.svelte";
    import GraphTiming from "../components/GraphTiming.svelte";
    import type {Server} from "../../../../models/server/server";
    import {fly} from "svelte/transition"
    import type {NetworkUsage} from "../../../../models/server/networkUsage";
    import {ServerNetworkUsageService} from "../../../../services/server/serverNetworkUsageService";

    export let server: Server

    const k = 1024
    const decimals = 2
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

    let currentUnitSize = 'KB'
    let fetchingPromise;
    let networkUsageOfServer: NetworkUsage[]
    let graphTimeText: string = ''

    onMount(() => {
        graphTimeText = 'past 5 minutes'
        let fromDate: Date = new Date()
        fromDate.setMinutes(fromDate.getMinutes() - 5)
        let toDate: Date = new Date()
        getAndSetNetworkUsage(fromDate, toDate)
    })

    function getAndSetNetworkUsage(fromDate:Date, toDate: Date): void {
        fetchingPromise = ServerNetworkUsageService.getNetworkUsageOfServer(server, {
            from: fromDate,
            to: toDate
        }).then((cpuUsages) => {
            networkUsageOfServer = fillEmptyTimestamps(cpuUsages, fromDate, toDate, (generatedDate: Date) => {
                    return {
                        downloadInBytes: null,
                        uploadInBytes: null,
                        createdAt: generatedDate
                    }
                }
            ) as NetworkUsage[]
        }).catch((ex) => {
            popUpMessageStore.addMessage('Could not fetch NetworkUSage usages.')
        })
    }

    function getMaximumAvailableNetworkUsageInBytes(): number {
        // searches for the highest possible network usage in current list
        const highestNetworkUsage =  networkUsageOfServer.reduce(function(prev, current) {
            return (prev.downloadInBytes > current.downloadInBytes) ? prev : current
        })

        return highestNetworkUsage.downloadInBytes + highestNetworkUsage.uploadInBytes
    }

    // TODO refactor
    function getMaximumAvailableNetworkUsageCalculatedWithUnitType(): number {
        // searches for the highest possible ram available in current list
        const maxRamAvailable = networkUsageOfServer.reduce(function(prev, current) {
            return (prev.downloadInBytes + prev.uploadInBytes > current.downloadInBytes + current.downloadInBytes) ? prev : current
        })

        const sizeOfIndex = Math.floor(Math.log(getMaximumAvailableNetworkUsageInBytes()) / Math.log(k));
        return parseFloat((maxRamAvailable / Math.pow(k, sizeOfIndex)).toFixed(decimals))
    }

    function convertNetworkUsagesToUnitSize(networkUsages:NetworkUsage[], variableName: string): number[] {
        const dm = decimals < 0 ? 0 : decimals;

        const sizeOfIndex = Math.floor(Math.log(getMaximumAvailableNetworkUsageInBytes()) / Math.log(k));
        currentUnitSize = sizes[sizeOfIndex]

        return networkUsages.map((networkUsage) => {
            return parseFloat((networkUsage[variableName] / Math.pow(k, sizeOfIndex)).toFixed(dm));
        })
    }

    function onNewSelectedTime(event): void {
        const fromDate = event.detail.fromDate
        const toDate = event.detail.toDate

        getAndSetNetworkUsage(fromDate, toDate)
    }
</script>

<article>
    {#key graphTimeText}
        <h3 transition:fly|local>Network usage Graph of past {graphTimeText}</h3>
    {/key}
    {#await fetchingPromise}
        <LoadingSpinner />
    {:catch e}
        <span>Failed to load network usage data</span>
    {/await}

    {#if networkUsageOfServer}
        <DateTimeGraph
                maxYValue="{getMaximumAvailableNetworkUsageCalculatedWithUnitType()}"
                datasets={
                    [
                        {
                            name: `Upload speed in ${currentUnitSize}`,
                            type: 'line',
                            values: convertNetworkUsagesToUnitSize(networkUsageOfServer, "uploadInBytes")
                        },
                        {
                            name: `Download speed in ${currentUnitSize}`,
                            type: 'line',
                            values: convertNetworkUsagesToUnitSize(networkUsageOfServer, "downloadInBytes")
                        },
                    ]
                }
                y={networkUsageOfServer.map((networkUsage) => networkUsage.createdAt)}
        />
        <span>If a point is blank that means there was no network usage for that given minute</span>
    {/if}
    <GraphTiming on:time-selected={onNewSelectedTime} />
</article>
