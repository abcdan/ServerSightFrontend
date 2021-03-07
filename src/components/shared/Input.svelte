<script lang="ts">
    export let labelTxt: string;
    export let placeholder: string;
    export let type: string;

    export let value
    const onInput = e => (value = e.target.value);
</script>
<style>
    input {
        outline: none;
        display: block;
        width: 100%;
        height: 40px;
        background-color: #F0F4EF;
        border: none;
        border-bottom: 2px solid #344966;
        border-radius: 1px;
    }
</style>

<label>
    {labelTxt}
    <input {value} placeholder={placeholder} on:input={onInput} type={type}>
</label>
