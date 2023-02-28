<script>
    import UvaRepositorioMediaOnce from '../observer/Uva-repositorio-media-once.svelte';
    import Image from './Image.svelte';
    import Caption from './Caption.svelte';
    import ImagePlaceholder from './ImagePlaceholder.svelte';
    export let value;
    export const {
        classe,
        crédito,
        fonte,
        id,
        legenda,
        mostrarLegenda,
        tamanho
    } = value;
    const rootMargin = '0px 0px 95% 0px';
    const descrição = legenda;
    let node;
</script>

<style>
    figure {
        margin: calc(var(--margem-vertical) * 1.5) auto;
    }
</style>

<UvaRepositorioMediaOnce {id} {tamanho} {rootMargin} bind:this={node}>
    <figure>
        <Image classe={classe} src='https://www.estadao.com.br{fonte}' alt={legenda} />
        {#if mostrarLegenda}
            <figcaption style='{tamanho === 'GG' ? 'width: var(--largura-celular); margin-left: auto; margin-right: auto' : ''}{mostrarLegenda === 'não' ? 'text-align: right; margin-top: 0' : ''}'>
                <Caption 
                    mostrarLegenda={mostrarLegenda} 
                    legenda={legenda} 
                    crédito={crédito} 
                />
            </figcaption>
        {/if}
    </figure>
    <placeholder slot='placeholder'>
        <ImagePlaceholder {descrição} />
    </placeholder>
</UvaRepositorioMediaOnce>