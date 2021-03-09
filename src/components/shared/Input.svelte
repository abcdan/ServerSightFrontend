<script lang="ts">
    export let labelTxt: string
    export let placeholder: string
    export let type: string
    export let required: boolean = false
    export let errorMessage = ''
    export let value

    let touched = false
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
        margin: 0;
        padding: 0;
    }

    span {
        color: #721c24;
    }
</style>

<label for="input">{required ? '*':''} {labelTxt}</label>
<input id="input" {value} {placeholder} on:input={onInput} {type} on:blur={()=> {touched=true}}>

{#if touched && required && errorMessage && value === ''}
    <span>{ errorMessage }</span>
{/if}
