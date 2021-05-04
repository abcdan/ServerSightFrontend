<script lang="ts">
    import {fillEmptyTimestamps} from "../serverGraphUtils";
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
        let fromDate: Date = new Date()
        fromDate.setMinutes(fromDate.getMinutes() - 5)
        fromDate.setSeconds(0)

        let toDate: Date = new Date()
        getAndSetNetworkUsage(fromDate, toDate)
    })

    function getAndSetNetworkUsage(fromDate:Date, toDate: Date): void {
        setGraphTimeText(fromDate, toDate)
        fetchingPromise = ServerNetworkUsageService.getNetworkUsageOfServer(server, {
            from: fromDate,
            to: toDate
        }).then((cpuUsages) => {
            networkUsageOfServer = fillEmptyTimestamps(cpuUsages, fromDate, toDate, (generatedDate: Date) => {
                    return {
                        downloadInBytes: 0,
                        uploadInBytes: 0,
                        createdAt: generatedDate
                    }
                }
            ) as NetworkUsage[]
        }).catch((ex) => {
            popUpMessageStore.addMessage('Could not fetch Network usages.')
        })
    }

    function getMaximumAvailableNetworkUsageInBytes(): number {
        // searches for the highest possible network usage in current list
        const highestUploadInBytes =  networkUsageOfServer.reduce(function(prev, current) {
            return (prev.downloadInBytes > current.downloadInBytes) ? prev : current
        }).downloadInBytes

        const highestDownloadInBytes =  networkUsageOfServer.reduce(function(prev, current) {
            return (prev.uploadInBytes > current.uploadInBytes) ? prev : current
        }).uploadInBytes

        return highestDownloadInBytes >= highestUploadInBytes ?
            highestDownloadInBytes : highestUploadInBytes
    }

    // TODO refactor
    function getMaximumAvailableNetworkUsageCalculatedWithUnitType(): number {
        // searches for the highest possible network usage available in current list
        const maxNetworkUsageAvailable = getMaximumAvailableNetworkUsageInBytes()

        const sizeOfIndex = Math.floor(Math.log(maxNetworkUsageAvailable) / Math.log(k));

        return parseFloat((maxNetworkUsageAvailable / Math.pow(k, sizeOfIndex)).toFixed(decimals))
    }

    function convertNetworkUsagesToUnitSize(networkUsages:NetworkUsage[], variableName: string): number[] {
        const dm = decimals < 0 ? 0 : decimals;

        const sizeOfIndex = Math.floor(Math.log(getMaximumAvailableNetworkUsageInBytes()) / Math.log(k));
        currentUnitSize = sizes[sizeOfIndex]

        return networkUsages.map((networkUsage) => {
            return parseFloat((networkUsage[variableName] / Math.pow(k, sizeOfIndex)).toFixed(dm));
        })
    }

    function setGraphTimeText(fromDate: Date, toDate:Date) {
        let t2 = toDate.getTime();
        let t1 = fromDate.getTime();

        let differenceInMinutes = parseInt(String((t2 - t1) / 60000));
        graphTimeText = `past ${differenceInMinutes} minutes`

    }

    function onNewSelectedTime(event): void {
        const fromDate = event.detail.fromDate
        const toDate = event.detail.toDate

        getAndSetNetworkUsage(fromDate, toDate)
    }

    let datasets = undefined
    $: if (networkUsageOfServer)  {
        datasets =
            [
                {
                    values: convertNetworkUsagesToUnitSize(networkUsageOfServer, "uploadInBytes"),
                    name: `Upload in ${currentUnitSize}`,
                    type: 'line',
                },
                {
                    values: convertNetworkUsagesToUnitSize(networkUsageOfServer, "downloadInBytes"),
                    name: `Download in ${currentUnitSize}`,
                    type: 'line',
                },
            ]
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

    {#if networkUsageOfServer && datasets}
        <DateTimeGraph
            maxYValue="{getMaximumAvailableNetworkUsageCalculatedWithUnitType()}"
            y={networkUsageOfServer.map((networkUsage) => networkUsage.createdAt)}
            label={`Max network usage ${currentUnitSize}`}
            datasets={datasets}
        />
        <span>If a point is blank that means there was no network usage for that given minute</span>
    {/if}
    <GraphTiming on:time-selected={onNewSelectedTime} />
</article>
