<script>
    import { boolean } from "../../../scripts/boolean.js";
    import UvaRepositorioMediaOnce from "../observer/Uva-repositorio-media-once.svelte";
    import Video from "../videos/Video.svelte";
    import Caption from "../images/Caption.svelte";
    import ImagePlaceholder from "../images/ImagePlaceholder.svelte";
    
    export let value;
    export const { id, classe, crédito, fonteMobile, fonteDesk, legenda, mostrarLegenda, posterDesk, posterMobile, preload, tamanho } = value;
    export const playsinline = boolean(value.playsinline);
    export const autoplay = boolean(value.autoplay);
    export const muted = boolean(value.muted);
    export const loop = boolean(value.loop); 
    export const rootMargin = "0px 0px 35% 0px";
    export const descrição = legenda;   
    let clientWidth;
    let clientHeight;
    $: contentWidth = clientWidth;
    $: contentHeight = clientHeight;
    let videoPlaying = false;
    function handleIntersection({ entry }) {
        const { intersectionRatio } = entry;
        if ( intersectionRatio > 0 ) {
            videoPlaying = true;
            entry.target.play();
        } else {
            videoPlaying = false;
            entry.target.pause();
        }
    }
</script>

<UvaRepositorioMediaOnce {id} {tamanho} {rootMargin} on:intersection={handleIntersection} threshold={[0, 1]}>
    <figure bind:clientWidth bind:clientHeight>
        <Video
            contentWidth={contentWidth} 
            contentHeight={contentHeight} 
            classe={classe} 
            playsinline={playsinline} 
            autoplay={autoplay}
            muted={!videoPlaying}
            preload={preload} 
            loop={loop}
            fonteDesk={fonteDesk}
            fonteMobile={fonteMobile}
            src={window.innerWidth > 580 ? fonteDesk : fonteMobile}
        />
        {#if mostrarLegenda}
            <figcaption style="{tamanho === "GG" ? "width: var(--largura-celular);" : ""}{mostrarLegenda === "não" ? "text-align: right; margin-top: 0;" : ""}">
                <Caption 
                    mostrarLegenda={mostrarLegenda} 
                    legenda={legenda} 
                    crédito={crédito} 
                />
            </figcaption>
        {/if}
    </figure>
    <placeholder slot="placeholder">
        <ImagePlaceholder {descrição} />
    </placeholder>
</UvaRepositorioMediaOnce>

<style>
    figure {
        margin: calc(var(--margem-vertical) * 1.5) auto;
    }
</style>