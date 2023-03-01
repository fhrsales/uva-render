<script>
    import UvaRepositorioMediaOnce from '../observer/Uva-repositorio-media-once.svelte';
    import ImagePlaceholder from '../images/ImagePlaceholder.svelte';
    import Image from '../images/Image.svelte';
    import Button from '../buttons/Button.svelte';
    import Text from '../texts/Text.svelte';
    export let value;
    const {
        assinatura,
        autor,
        complemento,
        comprar,
        editora,
        fonte,
        genero,
        paginas,
        texto,
        titulo,
        valor
    } = value;
    const rootMargin = '0px 0px 95% 0px';
    const descrição = titulo + ', por ' + autor;
    let livro = true;
    let lazy = 'lazy';
    let imgProp = 'image';
    let descProp = 'description';
    let showLojas = false;
    let node;
    import { onMount } from 'svelte';
    onMount(async () => {
        let livro = node.querySelectorAll('figure');
        for (let i = 0; i < livro.length; i++) {
            let image = livro[i].querySelector('img');
            await new Promise(resolve => image.addEventListener('load', resolve));
            let height = image.clientHeight;
            let width = image.clientWidth;
            image.width = width;
            image.height = height;
            let altura = livro[i].style;
            altura.setProperty('height', height + 'px');
            let lombada = livro[i].style;
            lombada.setProperty('--lombada', (height - 12) + 'px');
            let contraCapa = livro[i].style;
            contraCapa.setProperty('--contraCapa', height + 'px');
        }
    });

    function handleClick() {
        showLojas = !showLojas;
    }
</script>

<div class='uva-estante-de-livros P'>
    <div>
        <div class='uva-container-media' bind:this={node}>
            <figure>
                <Image {imgProp} {lazy} {livro} classe='book-cover' src='https://www.estadao.com.br{fonte}' alt={titulo + ', por ' + autor} />
            </figure>
        </div>
        <div class='ficha'>
            <h4 itemprop='genre'>{genero}</h4>
            <h3 itemprop='title'>{titulo}</h3>
            <p itemprop='author'><strong>{autor}</strong></p>
            {#if complemento}
                <p itemprop='complement'>{complemento}</p>
            {/if}
            <p itemprop='publisher'>Editora {editora}</p>
            <p><span itemprop='pages'>{paginas}</span> • <span itemprop='price'>{valor}</span></p>
            {#if comprar}
                <Button classe='book-store-button' value='Comprar ▾' {handleClick} />
            {/if}
            {#if showLojas}
                <div></div>
                <div></div>
                <ul class='book-stores'>
                    {#each comprar as item}
                        <li class='book-store'>
                            <a href={item.link} target='_blank' rel='noopener noreferrer'>{item.nome}</a>
                        </li>
                    {/each}
                </ul>
            {/if}
        </div>
    </div>
    <div style='margin: 0 calc(var(--filete) * -0.5)'>
        <Text {assinatura} {descProp} value={texto} />
    </div>
</div>

<style>
    .uva-estante-de-livros {
        display: block;
    }

    .uva-container-media {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        perspective: 400px;
        max-width: 250px;
        transform: translate(-13px, 20px);
    }

    figure {
        width: 200px;
        position: relative;
        transform-style: preserve-3d;
        transform: rotateY(-31deg);
    }

    .ficha::before {
        content: '';
        display: block;
        width: var(--filete);
        height: 0.188rem;
        margin-top: 0.375rem;
        background-color: var(--cor-c2-primaria);
    }

    .ficha {
        width: var(--largura-celular);
        margin: calc(var(--margem-vertical) * 1.5) 0 calc(var(--margem-vertical) * 1) 0;
    }

    .ficha>[itemprop='genre'] {
        font-family: var(--serif);
        font-weight: 700;
        color: var(--cor-texto);
        margin: 0.5rem 0 -0.5rem 0;
    }

    .ficha>[itemprop='title'] {
        margin: 0.563rem 0;
        font: 500 calc(var(--corpo-mobile) * 1) / calc(var(--entrelinha-mobile) * 1) var(--condensed);
        color: var(--cor-c2-primaria);
        text-transform: uppercase;
        letter-spacing: 0.009rem;
    }

    .ficha>[itemprop='title']::after {
        content: '';
        display: block;
        width: var(--filete);
        height: 0.063rem;
        background-color: var(--cor-texto);
        margin-top: 0.563rem;
        opacity: 0.7;
    }

    .ficha>p {
        font: 400 calc(var(--corpo-mobile) * 0.8) / calc(var(--entrelinha-mobile) * 0.8) var(--condensed);
        text-transform: uppercase;
        color: var(--cor-texto);
        letter-spacing: 0.04rem;
        margin: 0;
    }

    :global(.uva-estante-de-livros > div:nth-child(1) > div > div) {
        position: absolute;
        display: inline-block;
        background-color: var(--cor-fundo);
        height: 12px;
        width: 12px;
        margin: -6px 0 0 52px;
        z-index: 1;
        transform: rotate(45deg);
    }

    :global(.uva-estante-de-livros > div:nth-child(1) > div > div > div) {
        position: absolute;
        display: inline-block;
        height: 12px;
        width: 12px;
        margin: -15px 0 0 51px;
        border: var(--borda-fina);
        border-radius: 4px;
        transform: rotate(45deg);
        box-shadow: var(--sombra-leve);
        z-index: -1;
    }

    .book-stores {
        list-style: none;
        opacity: 1;
        background-color: var(--cor-fundo);
        border: var(--borda-fina);
        border-radius: 4px;
        font-family: var(--condensed), sans-serif;
        box-shadow: var(--sombra-leve);
        left: 0px;
        margin-top: 0px;
        padding: 12px;
        /* top: 28px; */
        width: 176px;
    }

    :global(.book-store-button) {
        margin-top: calc(var(--margem-vertical) * 0.5);
        background-color: var(--cor-c2-secundaria);
        color: var(--cor-fundo);
    }

    :global(.book-store-button):hover {
        background-color: var(--cor-c2-primaria);
    }

    @media (min-width:740px) {

        /* Desktop */
        .uva-estante-de-livros {
            display: flex;
            justify-content: space-between;
            margin-bottom: -30px;
        }
    }
</style>