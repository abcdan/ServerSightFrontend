<script lang="ts">
    import { fly } from 'svelte/transition';
    import type {Server} from "../../models/server/server";
    import ServerCard from "./ServerCard.svelte";
    import {onMount} from "svelte";

    export let servers: Server[] = [];

    let ready = false;
    onMount(() => {
        ready = true;
    })
</script>

<style>
    ol {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        list-style-type: none;
        grid-gap: 25px;
        margin: 0;
        padding: 0;
    }
    @media only screen and (max-width: 1200px) {
        ol {
            grid-template-columns: 1fr 1fr;
        }
    }
    @media only screen and (max-width: 800px) {
        ol {
            grid-template-columns: 1fr;
        }
    }
</style>

<ol>
    {#key ready}
        {#each servers as server}
                <li transition:fly|local={{ y: 100, duration: 500 }}>
                    <ServerCard
                        {server}
                    />
                </li>
        {/each}
    {/key}
</ol>
