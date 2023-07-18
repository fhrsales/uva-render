<script>
    import UvaRepositorioMediaOnce from '../observer/Uva-repositorio-media-once.svelte';
    import ImagePlaceholder from '../../components/images/ImagePlaceholder.svelte';
    import Text from "../texts/Text.svelte";
    import { onMount } from "svelte";
    import { UvaPath } from "../../../scripts/store.js"
    import { gsap } from "gsap";
    import { ScrollTrigger } from "gsap/ScrollTrigger";
    gsap.registerPlugin(ScrollTrigger);

    let UvaPages = "";
    UvaPath.subscribe(value => {
        UvaPages = value;
    });

    export let value;
    const {
        tamanho,
        tamanho_fundo,
        id,
        guias,
        classe,
        offset,
        frames,
        duração,
        conteúdo,
        videoDesk,
        videoMobile
    } = value;
    const height = Math.round(frames) * (duração * frames) - window.innerHeight;
    
    let videoElement;
    let scrollTimeout;
    let node;
    let descrição = 'scroll animado'
    let isPlaying = false;
    let lastScrollTime = 0;
    const rootMargin = '0px 0px 95% 0px';

    function animateVideo() {
        if (!videoElement) {
            console.error("Video element not found");
            return;
        }

        gsap.to(videoElement, {
            scrollTrigger: {
                trigger: `#${id} > div`,
                markers: false,
                ease: "none",
                start: `top top`,
                end: `bottom bottom`,
                offset: `${offset}px`,
                delay: 1,
                scrub: false,
                onEnter: () => {
                    if (videoElement && !isPlaying) {
                        videoElement.play().catch((error) => {
                            console.error("Erro ao reproduzir vídeo:", error);
                        });
                        isPlaying = true;
                    }
                },
                onUpdate: (self) => {
                    const progress = self.progress;
                    if (videoElement && videoElement.duration) {
                        videoElement.currentTime = videoElement.duration * progress;
                    }
                    if (videoElement && !isPlaying) {
                        videoElement.play().catch((error) => {
                            console.error("Erro ao reproduzir vídeo:", error);
                        });
                        isPlaying = true;
                    }
                    lastScrollTime = gsap.ticker.time;
                },

                onLeave: () => {
                    if (videoElement) {
                        videoElement.pause();
                        isPlaying = false;
                    }
                },
            }
        });
    }

    onMount(async () => {
        gsap.ticker.add(() => {
            if (isPlaying && gsap.ticker.time - lastScrollTime > 0.15) {
                if (videoElement) {
                    videoElement.pause();
                    isPlaying = false;
                }
            }
        });
    });
</script>

<UvaRepositorioMediaOnce {id} {classe} {tamanho} {rootMargin} bind:this={node}>
    <div class={tamanho_fundo} style="height: {height}px;">
        <figure class="fundo">
            <video 
                on:loadedmetadata={()=> animateVideo()}
                on:timeupdate={() => {
                    if (videoElement.currentTime >= videoElement.duration) {
                        videoElement.pause();
                        isPlaying = false;
                    }
                }}
                bind:this={videoElement}
                width="100%"
                height="100%"
                preload="auto"
                muted
                playsinline
                loop={false}
                src={window.innerWidth > 580 ? videoDesk : videoMobile}
            />
        </figure>
    </div>
    <div class="passos">
        {#each conteúdo as passo , i}
            {#if passo.type === 'passo'}
                <div 
                    data-index={i + 1} 
                    class="passo{passo.value.classe !== undefined ? ' ' + passo.value.classe : ''}"
                    style="height: auto; position: absolute; top: {passo.value.percentual * height}px; left: 50%; transform: translate(-50%, 0%);"
                >
                    <Text value={passo.value.texto} />
                </div>
            {/if}
        {/each}
        {#if guias === "sim"}
            {#each Array.from({length: 100}) as _, i}
                <div class="guias-scrolly-animado" style="height: 1px; position: absolute; top: {(i / 100) * height}px;">
                    {i / 100}
                </div>
            {/each}
        {/if}
    </div>
<placeholder slot='placeholder'>
    <ImagePlaceholder {descrição} />
</placeholder>
</UvaRepositorioMediaOnce>

<style>
    :global(.scrolly-animado) {
        position: relative;
        width: 100%;
        margin: calc(var(--margem-vertical) * 2) auto;
        pointer-events: none;        
    }
    
    .fundo {
        position: sticky;
        width: 100%;
        height: 100vh;
        top: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        margin: 0;
    }
    
    video {
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        overflow: hidden;
        position: absolute;
        object-fit: cover;
        -o-object-fit: cover;
        transition: opacity 0.5s;
    }
    
    .passo {
        opacity: 1;
        z-index: 1;
        width: 80%;
    }

    :global(.guias-scrolly-animado) {
        width: 100%;
        line-height: -0.344rem;
        color: red;
        background-color: red;
    }

    @media (min-width:740px) { 
        /* Desktop */
        .passo {
            width: 45%;
            max-width: 580px;
        }
    }
</style>