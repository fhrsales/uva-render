<script>
    import { boolean } from "../../../scripts/boolean.js";
    import IntersectionObserver from "svelte-intersection-observer"; 
    let node;
    let nasVista;
    let rootMargin = "0px 0px 100px 0px";
    let threshold = 0;
    export let value;
    const { classe, id, fonte, tamanho } = value;
    const mostrar_título = boolean(value.mostrar_título);
    const mostrar_descrição = boolean(value.mostrar_descrição);
    const mostrar_marca = boolean(value.mostrar_marca);

</script>

<IntersectionObserver once element={node} rootMargin={rootMargin} threshold={threshold} bind:intersecting={nasVista}>
    <div id={id} class="uva-repositorio-media {nasVista ? 'carregada' : ''}{classe} {tamanho}" bind:this={node}>
        {#if nasVista}
            <script 
                type="text/javascript" 
                class="uva-grafico" 
                data-uva-id={fonte} 
                data-show-title= {mostrar_descrição}
                data-show-description={mostrar_título} 
                data-show-brand={mostrar_marca} 
                src="https://arte.estadao.com.br/uva/scripts/embed.min.js">
            </script>
        {:else}
            <img 
                src="https://arte.estadao.com.br/uva/content/{fonte}/uploads/fallback.jpg" 
                alt="Gráfico indisponível"
            />
        {/if}
    </div>
</IntersectionObserver>