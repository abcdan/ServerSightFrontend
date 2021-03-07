<script lang="ts">
    export let href: string
</script>

<style>
    a {
        color: #0D1821;
    }
</style>

<a href={href}>
    <slot></slot>
</a>
