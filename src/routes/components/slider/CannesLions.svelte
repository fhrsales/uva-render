<script>
    import { onMount } from 'svelte';
    import Swiper, { Pagination, Autoplay } from 'swiper';
    import 'swiper/swiper-bundle.css';

    let swiper;
    let CannesLionsHeader = 'https://arte.estadao.com.br/economia/2023/cannes-lions/img/header.svg'
    export let value;
    const canneslions = value;

    onMount(() => {
        Swiper.use([Pagination, Autoplay]);
            swiper = new Swiper('.uva-cannes-lions-swiper-container', {
                loop: true,
                autoplay: {
                    delay: 15000,
                    disableOnInteraction: false
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: false,
                },
            });
    });
</script>
<div class='uva-cannes-lions-header-container'>
    <img src={CannesLionsHeader} alt="Cobertura Cannes Lions – Estadão • RZK Digital • Oxigen"/>
</div>

<div class="uva-cannes-lions-frame"></div>

<div class="uva-cannes-lions-swiper-container">
    <div class="swiper-wrapper">
        {#each canneslions as card}
            <div class="swiper-slide">
                <img src="{card.imagem}" alt="{card.título}. {card.descrição}" />
                <h2>{card.título}</h2>
                <p>{card.descrição}</p>
            </div>
        {/each}
    </div>
<div class="swiper-pagination"></div>
</div>

<style>
    :global(body) {
        margin: 0;
        width: 100vw;
        height: 100%;
        overflow-x: hidden;
        background-color: #312b36;
    }

    :global(.swiper-pagination-bullet-active) {
        background-color: var(--cor-fundo) !important;
        opacity: 0.5 !important;
    }

    .uva-cannes-lions-header-container {
        position: fixed;
        top: 8vh;
        width: 100vw;
        height: 90px;
        margin: 0 auto;
    }

    .uva-cannes-lions-header-container > img {
        margin: 0 auto;
        width: 60vw;
        max-width: 700px;
        height:auto;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .uva-cannes-lions-frame {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 68vw;
        height: 88vh;
        border: 13px solid white;
    }

    .uva-cannes-lions-swiper-container {
        width: 100%;
        height: 80vh;
    }

    .swiper-wrapper {
        width: 100%;
        height: 50vh;
    }

    h2 {
        font: 600 calc(var(--corpo-h3-desktop) * 2.1)/ calc(var(--entrelinha-h3-desktop) * 2.1) var(--serif);
        color: var(--cor-fundo);
        /* opacity: 0.8; */
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
        text-overflow: ellipsis;
        padding: 0 20vw;
    }

    h2::after {
        content: '';
        display: block;
        width: 170px;
        height: 2px;
        background-color: var(--cor-fundo);
        margin-top: 35px;
        opacity: 0.3;
    }

    p{
        font: 500 calc(var(--corpo-h3-desktop) * 1.35)/ calc(var(--entrelinha-h3-desktop) * 1.35) var(--texto);
        color: var(--cor-fundo);
        /* opacity: 0.8; */
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 4;
        overflow: hidden;
        text-overflow: ellipsis;
        padding: 0 20vw;
    }
    
    img{
        width: 100%;
        height: 40vh;
        object-fit: cover;
        margin-top: 380px;
    }
</style>