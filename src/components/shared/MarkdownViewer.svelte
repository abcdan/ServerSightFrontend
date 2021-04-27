<script lang="ts">
    import marked from "marked";
    export let markdown;
</script>

<div>
    {@html marked(markdown)}
</div>
