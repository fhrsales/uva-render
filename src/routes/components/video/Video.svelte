<script>
    import IntersectionObserver from "svelte-intersection-observer";
    let node;
    let nasVista;
    let rootMargin = "0px 0px 35% 0px";
    let threshold = 0;
    let dimensões = window.innerWidth;
    export let value;
    const { tamanho, id, classe, posterMobile, fonteMobile, fonteDesk, posterDesk, playsinline, autoplay, muted, preload, loop, mostrarLegenda, legenda, crédito } = value;
    // import { onMount } from "svelte";
    // onMount(() => {
    //     let options = {
    //         rootMargin: '0px 0px 0px 0px',
    //         threshold: 0,
    //     }
    //     const observer = new IntersectionObserver((entries) => {
    //         entries.forEach(entry => {
    //             if (entry.isIntersecting) {
    //                 entry.target.play();
    //             } else {
    //                 entry.target.pause();
    //             }
    //         });
    //     }, options);
    //     observer.observe(document.querySelectorAll('.uva-repositorio-media.carregada > video'));
    // });
</script>
<IntersectionObserver once element={node} rootMargin={rootMargin} threshold={threshold} bind:intersecting={nasVista}>
    <figure id={id} class="{nasVista ? 'carregada ' : ''}{tamanho}" bind:this={node}>
        {#if nasVista}
            <video 
                width="768" 
                height="384"
                class="uva-video" 
                playsinline="true" 
                autoplay="true" 
                muted="true" 
                preload="false" 
                loop="false"
                src={ dimensões > 580 ? fonteDesk : fonteMobile }
            >
            </video>
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