<script>
    import UvaRepositorioMediaOnce from "../observer/Uva-repositorio-media-once.svelte";
    import ImagePlaceholder from "../images/ImagePlaceholder.svelte";
    export let value;
    const { classe, crédito, fonte, id, legenda, mostrarLegenda, tamanho } = value;
    const rootMargin = "0px 0px 35% 0px";
    let descrição = legenda;
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
    
    figure > img {
        width: 100%;
        height: auto;
        object-fit: cover;
        background-color: #f0f0f0;
    }
    
    :global(figcaption) {
        margin: calc(var(--margem-vertical) * 0.2) auto calc(var(--margem-vertical) * 1) auto;
        font: 500 calc(var(--corpo-mobile) * 0.7) var(--sans-serif);
        letter-spacing: 0.01rem;
    }
    
    :global(.uva-credits) {
        font: 400 calc(var(--corpo-mobile) * 0.45) var(--semicondensed);
        letter-spacing: 0.04rem;
        text-transform: uppercase;
        opacity: 0.9;
    }
    
    @media (min-width:748px) { /* Desktop */
        :global(figcaption) {
            font-size: calc(var(--corpo-desktop) * 0.7);
        }
        :global(.uva-credits) {
            font-size: calc(var(--corpo-desktop) * 0.5);
        }
    }
</style>

<UvaRepositorioMediaOnce {id} {tamanho} {rootMargin}>
    <figure bind:clientWidth bind:clientHeight>
        <img 
            width={contentWidth}
            height={contentHeight}
            class="uva-imagem{classe ? " " + classe : ""}"
            src="https://www.estadao.com.br{fonte}"
            alt={legenda}
        />
    <figcaption style="{tamanho === "GG" ? "width: var(--largura-celular)" : ""} {mostrarLegenda === "não" ? "text-align: right; margin-top: 0" : ""}">
        {#if mostrarLegenda === "sim"}
                <span>{legenda}</span>
                <span class="uva-credits"> • {crédito}</span>
        {:else}
                <span class="uva-credits">{crédito}</span>
        {/if}
    </figcaption>
    </figure>
    <placeholder slot="placeholder">
        <ImagePlaceholder {descrição} />
    </placeholder>
</UvaRepositorioMediaOnce>