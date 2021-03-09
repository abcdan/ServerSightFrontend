<script>
    import SecondaryLink from "./shared/buttons/SecondaryLink.svelte";
    export let segment;
</script>

<style>
    nav {
        position: absolute;
        display: block;
        top: 0;
        height: 75px;
        width: 100%;
        padding-left: 10px;
        padding-right: 10px;
        background-color: #344966;
    }

    h1{
        display: inline-block;
        color: #F0F4EF;
        margin-top: 17.5px;
    }

    div {
        display: inline-block;
        width: 150px;
        margin-top: 17.5px;
    }
</style>
<nav>
    <!--  TODO add logo  -->
    <h1>Server sight dashboard</h1>
    <div>
        <SecondaryLink href="/servers">
            <span>Your servers</span>
        </SecondaryLink>
    </div>
    <div class="logout">
        <SecondaryLink href="/servers">
            <span>Logout</span>
        </SecondaryLink>
    </div>
</nav>
<div>

</div>
