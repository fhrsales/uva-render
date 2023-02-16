<script>
    import IntersectionObserver from "svelte-intersection-observer";
    let node;
    let nasVista;
    let rootMargin = "0px 0px 35% 0px";
    let threshold = 0;
    export let value;
    const { classe, crédito, fonte, id, legenda, mostrarLegenda, tamanho } = value;
    import { onMount } from "svelte";
    onMount(() => {
        window.addEventListener("resize", () => {
            let imagem = node.querySelector(".uva-imagem");
            imagem.setAttribute("width", imagem.clientWidth);
            imagem.setAttribute("height", imagem.clientHeight);
        });
    });
</script>

<IntersectionObserver once element={node} rootMargin={rootMargin} threshold={threshold} bind:intersecting={nasVista}>
    <figure id={id} class="{nasVista ? 'carregada ' : ''}{tamanho}" bind:this={node}>
        {#if nasVista}
                <img 
                    width= {node.clientWidth}
                    height={Math.round(node.clientWidth * 0.7)}
                    class="uva-imagem {classe}"
                    src="https://www.estadao.com.br{fonte}"
                    alt={legenda}
                >
                {#if mostrarLegenda == "sim"}
                    <figcaption>
                        <span class="uva-legenda-texto">{legenda}</span>
                        <span class="uva-creditos"> • {crédito}</span>
                    </figcaption>
                {:else}
                    <figcaption style="text-align: right">
                        <span class="uva-creditos">{crédito}</span>
                    </figcaption>
                {/if}
        {:else}
            <img
                width="180"
                height="120"
                src="https://arte.estadao.com.br/arc/images/placeholder.jpg" 
                alt="{legenda}"
            />
        {/if}
    </figure>
</IntersectionObserver>

<style>
figure {
    margin: calc(var(--margem-vertical) * 2) auto;
    opacity: 0;
}

figure.carregada {
    opacity: 1;
    transition: all 1s ease-in;
}

figure > img {
    width: 100%;
    object-fit: cover;
    height: auto;
    background-color: #f0f0f0;
}

figcaption {
    font-family: var(--sans-serif);
    margin: 10px auto 20px auto;
    font-weight: 500;
    font-size: 0.875rem;
}

.GG > figcaption {
    width: var(--largura-celular);
    max-width: var(--G);
}

.uva-creditos {
    font-weight: 400;
    font-size: 0.65rem;
    text-transform: uppercase;
    letter-spacing: 0.017rem;
    opacity: 0.8;
}

@media (min-width:748px) { /* Desktop */
    .uva-legenda {
        font-size: 0.9375rem;
    }
}
</style>