<script>
    import Link from "../shared/buttons/Link.svelte";
</script>

<style>
    article {
        position: relative;
    }

    .link-wrapper {
        position: relative;
        width: 100%;
        margin-bottom: 10px;
    }
    span {
        display: block;
        padding-top: 10px;
    }
</style>

<article>
    <span>
        Not showing any data? Click the link below to add your system.
    </span>
    <div class="link-wrapper">
        <Link href="https://github.com/lukasvdberk/ServerSightPostScript/">
            <span>
                System information setup
            </span>
        </Link>
    </div>
</article>
