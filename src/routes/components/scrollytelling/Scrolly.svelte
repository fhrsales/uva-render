<script>
    import UvaContainer from '../charts/UvaContainer.svelte';
    import VideoContainer from './../videos/VideoContainer.svelte';
    import ImageContainer from "../images/ImageContainer_responsive.svelte";
    import Text from "../texts/Text.svelte";
    export let value;
    const {
        conteúdo,
        classe,
        id,
        tamanho,
        tamanho_fundo
    } = value;
    const autoplay = "sim";
    const muted = "sim";
    const loop = "sim";
    const passos = conteúdo.filter(item => item.type === "passo");
    let options = {
        rootMargin: '0px 0px 6% 0px',
        threshold: 0,
    }
    import { onMount } from "svelte";
    onMount(async () => {
        const grafico = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('loaded');
                    let script = document.querySelector('#' + id + ' > div > div.fundo[data-index="1"] > script');
                    if (script !== null) {
                        script.src = script.dataset.src;
                    }
                } else {
                    entry.target.classList.remove('loaded');
                }
            });
        }, options);
        grafico.observe(document.querySelector('.scrolly-grafico'));
        const imagens = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('loaded');
                    let image = document.querySelector('#' + id +' > div > div.fundo[data-index="1"] > figure > img');
                    if (image !== null) {
                        image.src = image.dataset.src;
                    }
                } else {
                    entry.target.classList.remove('loaded');
                }
            });
        }, options);
        imagens.observe(document.querySelector('.scrolly-imagens'));
        const video = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('loaded');
                } else {
                    entry.target.classList.remove('loaded');
                }
            });
        }, options);
        video.observe(document.querySelector('.scrolly-video'));
        const disparaPassos = {
            rootMargin: `0px 0px 0px 0px`,
            threshold: 0
        };
        const carregaPassos = new IntersectionObserver(passosCarregado, disparaPassos);
        const containerPassos = [...document.querySelectorAll('#' + id + ' > div > div.passo')];
        containerPassos.forEach(i => {
            carregaPassos.observe(i);
        });

        function passosCarregado(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('loaded');
                    let fundos = document.querySelector('#' + id + ' > div.fundos');
                    if (fundos !== null) {
                        
                    }
                    let fundo = document.querySelector('#' + id + ' > div > div.fundo[data-index="' + entry.target.dataset.index + '"]');
                    if (fundo !== null) {
                        fundo.classList.add('loaded');
                        let todosFundos = [...document.querySelectorAll('#' + id + ' > div > div.fundo')];
                        todosFundos.forEach(i => {
                            i.style.setProperty('-webkit-transform', entry.target.dataset.transform);
                        });
                    }

                    let figure = document.querySelector('#' + id +
                        ' > div > div.fundo[data-index="' + entry.target.dataset.index +
                        '"] > figure');
                    if (figure !== null) {
                        figure.classList.add('carregada');
                        // let image = document.querySelector('#' + id + ' > div > div.fundo[data-index="' + entry.target.dataset.index + '"] > figure > img');
                        // if (image !== null) {
                        //     image.src = image.dataset.src;
                        // }
                    }
                    if (video !== null) {
                        let video = document.querySelector('#' + id +
                            ' > div > div.fundo[data-index="' + entry.target.dataset.index +
                            '"] figure > video');
                        if (video !== null) {
                            // video.src = video.dataset.src;
                            // video.play();
                        }
                    }
                    let script = document.querySelector('#' + id +
                        ' > div > div.fundo[data-index="' + entry.target.dataset.index +
                        '"] > script');
                    if (script !== null) {
                        script.classList.add('loaded')
                        // script.src = script.dataset.src;
                    }
                } else {
                    entry.target.classList.remove('loaded');
                    let fundo = document.querySelector('#' + id +
                        ' > div > div.fundo[data-index="' + entry.target.dataset.index + '"]');
                    if (fundo !== null) {
                        fundo.classList.remove('loaded');
                    }
                }
            });
        }
    });
</script>

<div id={id} class="uva-media-container {classe} {tamanho}">
    <div class="fundos {tamanho_fundo}">
        {#each passos as item, i}
            {#if item.value.uva}
                <div data-index={i + 1} class="fundo">
                    <UvaContainer value={{
                        classe: item.value.classe, 
                        fonte: item.value.uva,
                        showTitle: false,
                        showDescription: false,
                        showBrand: false
                    }} />
                </div>
            {/if}
            {#if item.value.imagemDesk}
                <div data-index={i + 1} class="fundo">
                    <ImageContainer value={{
                        classe: "fullHeight " + item.value.classe, 
                        fonte: window.innerWidth > 580 ? item.value.imagemDesk : item.value.imagemMobile ,
                        legenda: item.value.legenda
                    }} />
                </div>
            {/if}
            {#if item.value.videoDesk}
                <div data-index={i + 1} class="fundo">
                    <VideoContainer value={{
                        classe: "fullHeight " + item.value.classe, 
                        fonteDesk: item.value.videoDesk,
                        fonteMobile: item.value.videoMobile,
                        legenda: item.value.texto,
                        autoplay: autoplay,
                        muted: muted,
                        loop: loop
                    }} />
                </div>
            {/if}
        {/each}
    </div>
    <div class="passos">
        {#each passos as item, i}
            <div data-index={i + 1} class="passo{item.value.classe !== undefined ? ' ' + item.value.classe : ''}" data-transform={item.value.transformações}>
                <Text value={item.value.texto} />
            </div>
        {/each}
    </div>
</div>

<style>
    .uva-media-container {
        position: relative;
        width: 100%;
        margin: calc(var(--margem-vertical) * 2) auto;
        pointer-events: none;
        /* opacity: 0; */
    }

    /* .uva-media-container.loaded {
        opacity: 1;
        transition: all 1.8s ease-in-out;
    } */

    .fundos {
        position: sticky;
        width: 100%;
        height: 100vh;
        top: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        overflow: hidden;
    }

    .fundos>div {
        position: absolute;
        opacity: 0;
    }

    .fundos>div:nth-child(1) {
        opacity: 1;
    }

    .fundo.loaded {
        opacity: 1;
        transition: all .45s ease-in-out;
        transition: transform 0.5s ease-in-out, transform-origin 0.5s ease-in-out, opacity 0.5s ease-in-out;
        will-change: transform
    }

    .fundo {
        width: 100%;
    }

    :global(.fullHeight) {
        height: 100vh !important;
    }

    .passo {
        position: relative;
        box-sizing: border-box;
        margin: 0 auto;
        height: 110vh;
        padding-bottom: 100vh;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        opacity: 0;
        width: 100%;
        max-width: var(--largura-celular);
    }

    /* .passo>p {
        width: 90%;
    } */

    .passo.loaded {
        opacity: 1;
        transition: all .3s ease-in;
    }

    /* figure {
        margin: 0;
    } */
</style>