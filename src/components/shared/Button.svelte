<script lang="ts">
    export let text:string;
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
        border-radius: 1px;
    }
</style>

<button on:click>
    { text }
</button>
