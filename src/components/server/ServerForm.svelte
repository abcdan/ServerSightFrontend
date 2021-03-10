<script lang="ts">
    import Input from "../shared/Input.svelte";
    import type {Server} from "../../models/server";
    import RichTextEditor from "../shared/RichTextEditor.svelte";
    import Button from "../shared/buttons/Button.svelte";

    export let server: Server = {
        id: "",
        name: '',
        description: '',
        powerStatus: true,
        createdAt: new Date(),
        imagePath: ''
    };

    export let serverIcon:File;
</script>

<style>
    form {
        width: 100%;
    }

    div {
        display: block;
    }

    div.input {
        width: 50%;
    }

    div.editor {
        width: 100%;
        min-height: auto;
    }

    label, input {
        display: block;
    }
</style>

<form on:submit|preventDefault>
    <div class="input">
        <Input
            required="true"
            bind:value={server.name}
            labelTxt="Name"
            errorMessage="Name is required. Please enter a name."
            placeholder="Name"
        />
    </div>
    <div class="editor">
        <RichTextEditor bind:value={server.description}
            labelTxt="Description"
            placeholder="Enter your description / documentation for this server (with markdown support)."
        />
    </div>
    <!-- TODO add image upload button -->
    <div>
        <label>
            Server icon:
            <input type="file" accept="image/*" bind:files={serverIcon}>
        </label>
    </div>
</form>
