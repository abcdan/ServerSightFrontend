<script lang="ts">
    export let href: string
</script>

<style>
    a {
        text-decoration: none;
        vertical-align: middle;
        outline: none;
        display: block;
        width: 100%;
        height: 40px;
        background-color: #344966;
        color: #F0F4EF;
        text-align: center;
        border: none;
        border-radius: 5px;
    }
</style>

<a href={href}>
    <slot />
</a>
