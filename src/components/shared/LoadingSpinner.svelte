<style>
    /* Safari 4.0 - 8.0 */
    @-webkit-keyframes infiniteRotate {
        0% { -webkit-transform: rotate(0deg); }
        100% { -webkit-transform: rotate(360deg); }
    }

    /* Standard syntax */
    @keyframes infinite-rotate {
        0% { -webkit-transform: rotate(0deg); }
        100% { -webkit-transform: rotate(360deg); }
    }

    div {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    img {
        height: 50px;
        width: 50px;
        -webkit-animation: infiniteRotate 2s linear infinite;
        animation: infiniteRotate 2s linear infinite;
        text-align: center;
        justify-content: center;
    }
</style>

<div>
    <img src="favicon.png" alt="favicon">
</div>
