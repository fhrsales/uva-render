<script>
    import Text from "../texts/Text.svelte";
    let dimensões = window.innerWidth;
    export let value;
    const { conteúdo, classe, id, tamanho } = value;
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
                    entry.target.classList.add('carregado');
                    let script = document.querySelector('#' + id + ' > div > div.fundo[data-index="1"] > script');
                    if (script !== null) {
                        script.src = script.dataset.src;
                    }
                } else {
                    entry.target.classList.remove('carregado');
                }
            });
        }, options);
            grafico.observe(document.querySelector('.scrolly-grafico'));
        const imagens = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('carregado');
                    let image = document.querySelector('#' + id + ' > div > div.fundo[data-index="1"] > figure > img');
                    if (image !== null) {
                        image.src = image.dataset.src;
                    }
                } else {
                    entry.target.classList.remove('carregado');
                }
            });
        }, options);
            imagens.observe(document.querySelector('.scrolly-imagens'));
        const video = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('carregado');
                } else {
                    entry.target.classList.remove('carregado');
                }
            });
        }, options);
            video.observe(document.querySelector('.scrolly-video'));
        const disparaPassos = {rootMargin: `0px 0px 0px 0px`, threshold: 0};
        const carregaPassos = new IntersectionObserver(passosCarregado, disparaPassos);
        const containerPassos = [...document.querySelectorAll('#' + id + ' > div > div.passo')];
        containerPassos.forEach(i => {carregaPassos.observe(i);});
            function passosCarregado(entries) {
                entries.forEach(entry => {                    
                    if (entry.isIntersecting) {
                        entry.target.classList.add('carregado');
                        let fundos = document.querySelector('#' + id + ' > div.fundos');
                        if (fundos !== null) {
                            fundos.style.setProperty('-webkit-transform', entry.target.dataset.transform);
                        }
                        let fundo = document.querySelector('#' + id + ' > div > div.fundo[data-index="' + entry.target.dataset.index + '"]');
                        if (fundo !== null) {
                            fundo.classList.add('carregado');
                        }
                        let figure = document.querySelector('#' + id + ' > div > div.fundo[data-index="' + entry.target.dataset.index + '"] > figure');
                        if (figure !== null) {
                            figure.classList.add('carregada');
                            let image = document.querySelector('#' + id + ' > div > div.fundo[data-index="' + entry.target.dataset.index + '"] > figure > img');
                            if (image !== null) {
                                image.src = image.dataset.src;
                            }
                        }
                        if (video !== null) {
                            let video = document.querySelector('#' + id + ' > div > div.fundo[data-index="' + entry.target.dataset.index + '"] > video');
                            if (video !== null) {
                                video.src = video.dataset.src;
                                video.play();
                            }
                        }
                        let script = document.querySelector('#' + id + ' > div > div.fundo[data-index="' + entry.target.dataset.index + '"] > script');
                        if (script !== null) {
                            script.classList.add('carregado')
                            script.src = script.dataset.src;
                        }
                    } else {
                        entry.target.classList.remove('carregado');
                        let fundo = document.querySelector('#' + id + ' > div > div.fundo[data-index="' + entry.target.dataset.index + '"]');
                        if (fundo !== null) {
                            fundo.classList.remove('carregado');
                        }
                    }
                });
            }
    });
</script>

<style>
    .uva-repositorio-scrollyTelling {
        position: relative;
        width: 100%;
        margin: calc(var(--margem-vertical) * 2) auto;
        pointer-events: none;
        /* opacity: 0; */
    }
    
    /* .uva-repositorio-scrollyTelling.carregado {
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
    
    .fundos > div {
        position: absolute;
        opacity: 0;
    }
    
    .fundos > div:nth-child(1) {
        opacity: 1;
    }
    
    .fundo.carregado {
        opacity: 1;
        transition: all .45s ease-in-out;
    }
    
    .fundo {
        width: 100%;
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
    
    .passo > p {
        width: 90%;
    }
    
    .passo.carregado {
        opacity: 1;
        transition: all .3s ease-in;
    }

    figure {
        margin: 0;
    }
</style>

<div id={id} class="uva-repositorio-scrollyTelling {classe} {tamanho}">
    <div class="fundos">
        {#each passos as item, i}
            {#if item.value.uva}
                <div data-index={i + 1} class="fundo">
                    <script 
                        type="text/javascript" 
                        class="uva-imagem" 
                        data-uva-id={item.value.uva} 
                        data-show-title="false" 
                        data-show-description="false" 
                        data-show-brand="false"
                        data-src="https://arte.estadao.com.br/uva/scripts/embed.min.js"
                        >
                    </script>
                </div>
            {/if}
            {#if item.value.imagemDesk}
                <div data-index={i + 1} class="fundo">
                    <figure class="uva-repositorio-media">
                        <img
                            width="180"
                            height="120"
                            style="width: 100%; height: 100vh; object-fit: cover;"
                            class="uva-imagem"
                            data-src={ dimensões > 580 ? `https://www.estadao.com.br` + item.value.imagemDesk : `https://www.estadao.com.br` + item.value.imagemMobile }
                            alt="{item.value.legenda}"
                        />
                    </figure>
                </div>
            {/if}
            {#if item.value.videoDesk}
                <div data-index={i + 1} class="fundo">
                    <figure class="uva-repositorio-media">
                        <!-- svelte-ignore a11y-media-has-caption -->
                        <video
                            width="180"
                            height="120"
                            class="uva-video"
                            style="width: 100%; height: 100vh; object-fit: cover;"
                            data-src={ dimensões > 580 ? `` + item.value.videoDesk : `` + item.value.videoMobile }
                            alt="{item.value.legenda}"
                            autoplay muted loop
                        />
                    </figure>
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