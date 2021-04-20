<script lang="ts">
    export let href: string
</script>

<style>
    a {
        outline: none;
        display: block;
        text-decoration: none;
        vertical-align: middle;
        width: 100%;
        height: 40px;
        background-color: #BFCC94;
        color: #F0F4EF;
        text-align: center;
        border: none;
        border-radius: 5px;
    }

    a:hover {
        cursor: pointer;
    }
</style>

<a href={href}>
    <slot />
</a>
