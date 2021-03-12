<script>
    import marked from 'marked'
    import MarkdownViewer from "./MarkdownViewer.svelte";

    export let placeholder = ""
    export let labelTxt = ""
    export let value = ""
</script>

<style>
    textarea, .preview {
        display: block;
        width: 50%;
        max-width: 50%;
    }

    div {
        min-height: 200px;
    }

    textarea {
        height: 100%;
        background-color: #F0F4EF;
        border: none;
        float: left;
    }

    .preview {
        height: 100%;
        width: calc(50% - 20px);
        border-radius: 5px;
        padding: 5px;
        float: right;
    }

    span {
        float: right;
    }

    label {
        width: 100%;
        display: block;
    }
</style>

<label for="editor">
    {labelTxt}
</label>
<div>
    <textarea id="editor" rows="10" bind:value={value} {placeholder}></textarea>

    {#if !value}
        <span>Here will your rendered markdown appear. Start typing on the left</span>
    {:else}
        <div class="preview">
            <MarkdownViewer markdown={value} />
        </div>
    {/if}
</div>
