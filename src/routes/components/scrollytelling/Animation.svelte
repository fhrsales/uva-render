<script>
    import { UvaPath } from "../../../scripts/store.js"
    let UvaPages = "";
    UvaPath.subscribe(value => {
        UvaPages = value;
    });

    export let value;
    const { tamanho, id, classe, guias, frames, framesTotais, conteúdo } = value;
    const height = Math.round(frames) * (framesTotais) - window.innerHeight;

    import { gsap } from "gsap";
    import { ScrollTrigger } from "gsap/ScrollTrigger";
    gsap.registerPlugin(ScrollTrigger);
    let dimensões = window.innerWidth;
    let images= [];
        for (let i = 1; i <= framesTotais; i++) {
            { dimensões > 580 ? 
                images.push("https://arte.estadao.com.br/public/pages/" + UvaPages + i.toString().padStart(4, `0`) + `.jpg`) : 
                images.push("https://arte.estadao.com.br/public/pages/" + UvaPages + i.toString().padStart(4, `0`) + `-mobile.jpg`) 
            }
        }
    let firstImage = 0;

    import { onMount } from "svelte";
    onMount(async () => {
        let ImageContainer = document.querySelector("#" + id + "> div:nth-child(1) > figure > img");
        gsap.to({}, {
            scrollTrigger: {
                trigger: ".scrolly-animado > div",
                start: "top top",
                end: "bottom bottom",
                scrub: true,
                onUpdate: (self) => {
                    const progress = self.progress;
                    const newImage = Math.floor(progress * (images.length));
                    if (newImage !== firstImage) {
                        firstImage = newImage;
                        ImageContainer.setAttribute('src', images[firstImage]);
                    }
                    if (progress === 1) {
                        ImageContainer.setAttribute('src', images[images.length - 1]);
                    }
                }
            }
        }
        );

        let passos = document.querySelector("#" + id + " > div.passos");
        if (guias === "sim") {
            for (let i = 0; i < 1; i += 0.01) {
                let debug = document.createElement("div");
                debug.classList.add("guias-scrolly-animado");
                debug.setAttribute(`style`, `height: 1px; position: absolute; top: ${height * i}px;`);
                debug.innerHTML = i.toFixed(2);
                passos.appendChild(debug);
            }
        }
    });    
</script>
<!-- <IntersectionObserver once element={node} rootMargin={rootMargin} threshold={threshold} bind:intersecting={nasVista}> -->
    <!-- <div id={id} class="uva-repositorio-scrollytelling{nasVista ? ' carregada' : ''} {classe} {tamanho}" bind:this={node}> -->
        <div id={id} class="uva-repositorio-scrollytelling carregada {classe} {tamanho}" >
        <!-- {#if nasVista} -->
            <div style="height: {height}px;">
                <figure class="fundo">
                    <img loading="lazy"            
                        src={ dimensões > 580 ? 
                            "https://arte.estadao.com.br/public/pages/" + UvaPages + "0001.jpg" : 
                            "https://arte.estadao.com.br/public/pages/" + UvaPages + "0001-mobile.jpg"
                            }
                        alt="Sequência da animação"
                    />
                </figure>
            </div>
            <div class="passos">
                {#each conteúdo as passo , i}
                    {#if passo.type === 'passo'}
                        <div 
                            data-index={i + 1} class="passo{passo.value.classe !== undefined ? ' ' + passo.value.classe : ''}"
                            style="height: auto; position: absolute; top: {passo.value.percentual * height}px; left: 50%; transform: translate(-50%, 0%);"
                        >
                            <p class="uva-corpo">{passo.value.texto}</p>
                        </div>
                    {/if}
                {/each}
            </div>
        <!-- {/if} -->
    </div>
<!-- </IntersectionObserver> -->
<style>
.scrolly-animado {
        position: relative;
    }

.scrolly-animado > div > figure.fundo {
    position: sticky;
    width: 100%;
    height: 100vh;
    top: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden
}

.scrolly-animado > div > figure.fundo > img {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    overflow: hidden;
    position: absolute;
    object-fit: cover;
}

.scrolly-animado div.passos > div.passo {
    opacity: 1;
    z-index: 1;
}

:global(.guias-scrolly-animado) {
    width: 100%;
    line-height: -0.344rem;
    color: red;
    background-color: red;
}
</style>