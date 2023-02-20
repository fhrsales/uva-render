<!-- <script>
    import VideoContainer from "./VideoContainer.svelte.old";
    export let value;
    const { id, fonte, mostrarLegenda, tamanho, legenda, crédito } = value;
    let rootMargin = "0px 0px 35% 0px";
    let descrição = "Vídeo do Youtube";
</script> -->
<!-- <style>
    div::after {
        padding-top: 56.25%;
        display: block;
        content: '';

    }
    iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
</style> -->
<!-- 
<VideoContainer {id} {tamanho} {rootMargin} {descrição} {mostrarLegenda} {legenda} {crédito}>
    <div>
        <iframe 
            title="Vídeo do Youtube" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen="" 
            src="https://www.youtube.com/embed/{fonte}">
        </iframe>
    </div>
</VideoContainer> -->



<script>
    import UvaRepositorioMediaOnce from "../observer/Uva-repositorio-media-once.svelte";
    import Image from "../images/Image.svelte";
    import Caption from "../images/Caption.svelte";
    import ImagePlaceholder from "../images/ImagePlaceholder.svelte";
    export let value;
    const { classe, crédito, fonte, id, legenda, mostrarLegenda, tamanho } = value;
    const rootMargin = "0px 0px 35% 0px";
    const descrição = legenda;
    let clientWidth;
    let clientHeight;
    $: contentWidth = clientWidth;
    $: contentHeight = clientHeight;
    import { onMount } from "svelte";
    onMount(() => {    
        window.addEventListener("resize", () => {
            let image = document.querySelectorAll(".uva-imagem");
            if (image !== null) {
                image.width = image.clientWidth;
                image.height = image.clientHeight;
            }
        });
    });
</script>

<style>
    figure {
        margin: calc(var(--margem-vertical) * 1.5) auto;
    }

    div::after {
        padding-top: 56.25%;
        display: block;
        content: '';

    }
    iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
</style>

<UvaRepositorioMediaOnce {id} {tamanho} {rootMargin}>
    <figure bind:clientWidth bind:clientHeight>
        <div>
            <iframe 
                title="Vídeo do Youtube" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen="" 
                src="https://www.youtube.com/embed/{fonte}">
            </iframe>
        </div>
        <!-- <figcaption style="{tamanho === "GG" ? "width: var(--largura-celular); margin-left: auto; margin-right: auto" : ""}{mostrarLegenda === "não" ? "text-align: right; margin-top: 0" : ""}">
            <Caption 
                mostrarLegenda={mostrarLegenda} 
                tamanho={tamanho}
                legenda={legenda} 
                crédito={crédito} 
            />
        </figcaption> -->
    </figure>

    <placeholder slot="placeholder">
        <ImagePlaceholder {descrição} />
    </placeholder>
</UvaRepositorioMediaOnce>