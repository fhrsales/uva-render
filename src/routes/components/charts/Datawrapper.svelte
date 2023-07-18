<script>
    import UvaRepositorioMediaOnce from '../observer/Uva-repositorio-media-once.svelte';
    import ImagePlaceholder from '../images/ImagePlaceholder.svelte';
    export let value;
    export const src = "https://arte.estadao.com.br/arc/images/placeholder.jpg";
    const { id, fonte, tamanho } = value;
    let clientWidth;
    let clientHeight;
    import { onMount } from 'svelte';
    onMount(() => {    
        window.addEventListener('resize', () => {
            let image = document.querySelectorAll('.uva-imagem');
            if (image !== null) {
                image.width = image.clientWidth;
                image.height = image.clientHeight;
            }
        });
    });
</script>

<UvaRepositorioMediaOnce {id} {tamanho} rootMargin='0px 0px 0px 0px'>
    <figure bind:clientWidth bind:clientHeight>
        <div>
            <!-- <script 
                type="text/javascript" 
                defer 
                src="https://datawrapper.dwcdn.net/{fonte}/embed.js?v=1" 
                charset="utf-8"
            >
            </script> -->

            <iframe 
                title="Crescimento anual da população do Brasil desde 1872"
                id="datawrapper-chart-{fonte}" 
                src="https://datawrapper.dwcdn.net/{fonte}/1/" 
                scrolling="no" 
                frameborder="0" 
                style="width: 0; min-width: 100% !important; border: none;" 
                height="auto" 
                data-external="1"
            >
            </iframe>
            <script type="text/javascript">!function(){"use strict";window.addEventListener("message",(function(a){if(void 0!==a.data["datawrapper-height"]){var e=document.querySelectorAll("iframe");for(var t in a.data["datawrapper-height"])for(var r=0;r<e.length;r++)if(e[r].contentWindow===a.source){var i=a.data["datawrapper-height"][t]+"px";e[r].style.height=i}}}))}();</script>
        </div>
    </figure>

    <placeholder slot='placeholder'>
        <ImagePlaceholder {src} descrição = "Gráfico indisponível" />
    </placeholder>
</UvaRepositorioMediaOnce>

<style>
    figure {
        margin: calc(var(--margem-vertical) * 1.5) auto;
    }
</style>