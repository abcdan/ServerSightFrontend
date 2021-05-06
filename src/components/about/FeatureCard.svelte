<script lang="ts">
    export let icon: string
    export let name: string
</script>

<style>
    article {
        display: flex;
        flex-direction: row;
        position: relative;
        box-shadow: 0 1px 1px 0 rgba(0,0,0,0.07),0 3px 1px -2px rgba(0,0,0,0.6),0 1px 5px 0 rgba(0,0,0,0.2);
        border-radius: 5px;
        background-color: white;
        text-align: left;
        padding: 5px;
    }

    div, h1 {
        color: black;
    }

    img {
        width: 4rem;
        height: 4rem;
        margin: 5px;
        fill: #344966;
    }
</style>

<article>
    <img src={icon} alt={icon} />
    <div>
        <h1>{name}</h1>
        <div>
            <slot />
        </div>
    </div>
</article>
