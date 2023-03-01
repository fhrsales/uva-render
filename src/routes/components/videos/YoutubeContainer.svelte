<script>
    import UvaRepositorioMediaOnce from "../observer/Uva-repositorio-media-once.svelte";
    import ImagePlaceholder from "../images/ImagePlaceholder.svelte";
    export let value;
    const { fonte, id, tamanho } = value;
    const rootMargin = "0px 0px 0px 0px";
    const descrição = "Vídeo do Youtube";
    let clientWidth;
    let clientHeight;
    // $: contentWidth = clientWidth;
    // $: contentHeight = clientHeight;
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
    </figure>

    <placeholder slot="placeholder">
        <ImagePlaceholder {descrição} src="https://img.youtube.com/vi/{fonte}/sddefault.jpg" />
    </placeholder>
</UvaRepositorioMediaOnce>

<style>
    figure {
        margin: calc(var(--margem-vertical) * 1.5) auto;
    }

    div {
        position:relative;
        padding-bottom:56.25%;
        height:0;
        overflow:hidden;
        margin: calc(var(--margem-vertical) * 1) auto;
        background-color: var(--cor-texto);
        border-radius: 6px;
        box-shadow: var(--sombra-forte);
    }
    iframe {
        position:absolute;
        top:0;
        left:0;
        width:100%;
        height:100%;
    }
</style>