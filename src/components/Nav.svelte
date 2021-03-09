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
        /*padding-left: 10px;*/
        /*padding-right: 10px;*/
        background-color: #344966;
    }

    h1{
        display: inline-block;
        color: #F0F4EF;
        float: left;
    }

    div {
        display: inline-block;
        margin-top: 17px;
    }

    div.pages {
        float: left;
        margin-left: 10px;
        margin-right: 10px;
    }

    div.logout {
        float: right;
        margin-right: 10px;
    }

    span {
        display: block;
        padding-top: 7px;
        padding-left: 5px;
        padding-right: 5px;
    }
</style>
<nav>
    <!--  TODO add logo  -->
    <div class="pages">
        <h1>Server sight dashboard</h1>
    </div>
    <div class="pages">
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
