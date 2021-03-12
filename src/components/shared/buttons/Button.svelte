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
        background-color: #344966;
        color: #F0F4EF;
        text-align: center;
        border: none;
        border-radius: 5px;
        padding: 0 !important;
        margin: 0 !important;
    }

    button:hover {
        cursor: pointer;
    }
</style>

<button on:click style="color: {color}; background-color: {backgroundColor}">
    <slot />
</button>
