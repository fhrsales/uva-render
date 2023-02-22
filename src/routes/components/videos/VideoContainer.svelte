<script>
    import UvaRepositorioMediaOnce from "../observer/Uva-repositorio-media-once.svelte";
    import { boolean } from "../../../scripts/boolean.js";
    import Video from "../videos/Video.svelte";
    import Caption from "../images/Caption.svelte";
    import ImagePlaceholder from "../images/ImagePlaceholder.svelte";
    export let value;
    const { id, classe, crédito, fonteMobile, fonteDesk, legenda, mostrarLegenda, posterDesk, posterMobile, preload, tamanho } = value;
    const playsinline = boolean(value.playsinline);
    const autoplay = boolean(value.autoplay);
    const muted = boolean(value.muted);
    const loop = boolean(value.loop); 
    const rootMargin = "0px 0px 35% 0px";
    const descrição = legenda;   
    let dimensions = window.innerWidth;
    let clientWidth;
    let clientHeight;
    $: contentWidth = clientWidth;
    $: contentHeight = clientHeight;
    import { onMount } from "svelte";
    onMount(() => {    
        window.addEventListener("resize", () => {
            let image = document.querySelectorAll(".uva-video");
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
        <Video
            contentWidth={contentWidth} 
            contentHeight={contentHeight} 
            classe={classe} 
            playsinline={playsinline} 
            autoplay={autoplay}
            muted={muted}
            preload={preload} 
            loop={loop}
            fonteDesk={fonteDesk}
            fonteMobile={fonteMobile}
            src={dimensions > 580 ? fonteDesk : fonteMobile}
        />
        <figcaption style="{tamanho === "GG" ? "width: var(--largura-celular);" : ""}{mostrarLegenda === "não" ? "text-align: right; margin-top: 0;" : ""}">
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