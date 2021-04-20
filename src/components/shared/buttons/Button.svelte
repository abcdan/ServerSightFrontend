<script lang="ts">
    export let color: string = '#F0F4EF';
    export let backgroundColor: string = '#344966';
</script>

<style>
    button {
        outline: none;
        display: block;
        width: 100%;
        height: 40px;
        background-color: var(--background-color);
        color: var(--main-color);
        text-align: center;
        border: none;
        border-radius: 5px;
        padding: 0 !important;
        margin: 0 !important;
    }

    button:hover {
        cursor: pointer;
        animation: toblock 1s ease-in-out;
    }

    @keyframes toblock {
        to {
            border: 10px solid var(--background-color);
        }
    }
</style>

<button on:click style="--background-color: {backgroundColor}; --main-color: {color};">
    <slot />
</button>
