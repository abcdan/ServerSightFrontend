<script lang="ts">
    import marked from "marked";
    export let markdown;
</script>

<div>
    <!-- TODO seperate component -->

            {@html marked(markdown)}
</div>
