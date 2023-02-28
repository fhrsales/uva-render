<script>
    export let {
        alt,
        classe,
        imgProp,
        lazy,
        livro,
        src
    } = [];
    let contentWidth;
    let contentHeight;
    import {
        onMount
    } from "svelte";
    onMount(() => {
        function setImageSize(img) {
            contentWidth = img.clientWidth;
            contentHeight = img.clientHeight;
        }
        let images = document.querySelectorAll(".uva-image");
        if (images !== null) {
            images.forEach(image => {
                image.addEventListener("load", () => setImageSize(image));
            });
        }
    });
</script>

<style>
    :global(.uva-image) {
        width: 100%;
        height: auto;
        object-fit: cover;
    }

    .book-cover {
        position: absolute;
        top: 0;
        left: 0;
        width: 200px;
        transform: translateZ(22.5px);
        border-radius: 0 2px 2px 0;
        box-shadow: 5px 5px 20px #a4a4a4;
    }

    .book-spine {
        position: absolute;
        content: '';
        left: 0;
        top: 5px;
        width: 26px;
        height: var(--lombada);
        transform: translateX(182.5px) rotateY(90deg);
        background: linear-gradient(90deg,
                var(--cor-fundo) 0%,
                #f9f9f9 5%,
                var(--cor-fundo) 10%,
                #f9f9f9 15%,
                var(--cor-fundo) 20%,
                #f9f9f9 25%,
                var(--cor-fundo) 30%,
                #f9f9f9 35%,
                var(--cor-fundo) 40%,
                #f9f9f9 45%,
                var(--cor-fundo) 50%,
                #f9f9f9 55%,
                var(--cor-fundo) 60%,
                #f9f9f9 65%,
                var(--cor-fundo) 70%,
                #f9f9f9 75%,
                var(--cor-fundo) 80%,
                #f9f9f9 85%,
                var(--cor-fundo) 90%,
                #f9f9f9 95%,
                var(--cor-fundo) 100%);
    }

    .book-back-cover {
        position: absolute;
        top: 0;
        left: 0;
        content: '';
        width: 200px;
        height: var(--contraCapa);
        transform: translateZ(-6px);
        background-color: #01060f;
        border-radius: 0 2px 2px 0;
        box-shadow: -10px 0 50px 10px #a4a4a4;
    }
</style>

{#if livro}
    <div class="book-spine"></div>
{/if}
<img
    loaging={lazy}
    itemprop={imgProp}
    width={contentWidth} 
    height={contentHeight} 
    class="uva-image{classe ? " " + classe : ""}"
    src={src} 
    alt={alt} 
/>
{#if livro}
    <div class="book-back-cover"></div>
{/if}