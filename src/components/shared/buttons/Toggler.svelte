<script>
    import { slide } from 'svelte/transition';
    export let value = false
    let cssClass = value ? 'true' : 'false'

    function onToggle() {
        value = !value
        cssClass = value ? 'true' : 'false'
    }
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

    button:hover {
        cursor: pointer;
    }

    button.true {
        background-color: #344966;
    }

    button.false {
        background-color: #E5E5E5;
    }

    button.false > span {
        color: black;
    }
</style>

{#key value}
    <button transition:slide|local={{x:50,duration:200}} class={cssClass} on:click|preventDefault={onToggle}>
        <span>
            <slot />
        </span>
    </button>
{/key}
