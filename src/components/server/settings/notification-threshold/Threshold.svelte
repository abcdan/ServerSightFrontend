<script lang="ts">
    export let thresholdValue: number
</script>

<style>
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    input[type=number] {
        -moz-appearance: textfield;
    }

    div {
        display: flex;
        flex-direction: row;
    }
    input, span {
        width: 1rem;
        height: 1rem;
    }
</style>

<div>
    <input bind:value={thresholdValue} placeholder="Threshold in %" type="number" min="0" max="100">
    <span>%</span>
</div>
