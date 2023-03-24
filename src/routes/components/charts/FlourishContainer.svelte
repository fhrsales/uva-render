<script>
    import UvaRepositorioMediaOnce from '../observer/Uva-repositorio-media-once.svelte';
    import ImagePlaceholder from '../images/ImagePlaceholder.svelte';
    export let value;
    const { estilo, fonte, id, tamanho } = value;
    let clientWidth;
    let clientHeight;
    // $: contentWidth = clientWidth;
    // $: contentHeight = clientHeight;
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
            <iframe 
                src='https://flo.uri.sh/visualisation/{fonte}/embed' 
                title='Gráfico interativo do Flourish'
                class='flourish-embed-iframe' 
                frameborder='0' 
                scrolling='no' 
                style={estilo} 
                sandbox='allow-same-origin allow-forms allow-scripts allow-downloads allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation'
            >
            </iframe>
    </figure>

    <placeholder slot='placeholder'>
        <ImagePlaceholder descrição='Gráfico interativo do Flourish' />
    </placeholder>
</UvaRepositorioMediaOnce>

<style>
    figure {
        margin: calc(var(--margem-vertical) * 1.5) auto;
    }
</style>