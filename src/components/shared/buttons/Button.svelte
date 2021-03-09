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
</style>

<button on:click>
    <slot />
</button>
