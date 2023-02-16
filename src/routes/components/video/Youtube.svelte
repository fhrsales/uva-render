<script>
    import IntersectionObserver from "svelte-intersection-observer";
    let node;
    let nasVista;
    let rootMargin = "0px 0px 35% 0px";
    let threshold = 0;
    export let value;
    const { fonte, tamanho } = value;
</script>

<IntersectionObserver once element={node} rootMargin={rootMargin} threshold={threshold} bind:intersecting={nasVista}>
    <div class="uva-repositorio-media {nasVista ? 'carregada ' : ''}{tamanho}" bind:this={node}>
        {#if nasVista}
            <figure class="uva-video">
                <iframe 
                    title="Vídeo do Youtube" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen="" 
                    src="https://www.youtube.com/embed/{fonte}">
                </iframe>
            </figure>
        {:else}
            <img
                width="180"
                height="120"
                src="https://arte.estadao.com.br/arc/images/placeholder.jpg" 
                alt="Vídeo do Youtube"
            />
        {/if}
    </div>
</IntersectionObserver>

