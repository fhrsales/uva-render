<script>
    import UvaRepositorioMediaOnce from "../observer/Uva-repositorio-media-once.svelte";
    import Image from "./Image.svelte";
    import Caption from "./Caption.svelte";
    import ImagePlaceholder from "./ImagePlaceholder.svelte";
    export let value;
    export const { classe, crédito, fonte, id, legenda, mostrarLegenda, tamanho } = value;
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
</style>

<UvaRepositorioMediaOnce {id} {tamanho} {rootMargin}>
    <figure bind:clientWidth bind:clientHeight>
            <Image
                contentWidth={contentWidth} 
                contentHeight={contentHeight} 
                classe={classe} 
                src="https://www.estadao.com.br{fonte}" 
                alt={legenda} 
            />
        <figcaption style="{tamanho === "GG" ? "width: var(--largura-celular); margin-left: auto; margin-right: auto" : ""}{mostrarLegenda === "não" ? "text-align: right; margin-top: 0" : ""}">
            <Caption 
                mostrarLegenda={mostrarLegenda} 
                tamanho={tamanho}
                legenda={legenda} 
                crédito={crédito} 
            />
        </figcaption>
    </figure>

    <placeholder slot="placeholder">
        <ImagePlaceholder {descrição} />
    </placeholder>
</UvaRepositorioMediaOnce>