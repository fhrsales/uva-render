<script>
    let dimensões = window.innerWidth;
    export let value;
    const { conteúdo, classe, id, tamanho, transformações } = value;
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
<div id={id} class="uva-repositorio-scrollyTelling {classe} {tamanho}">
    <div class="fundos">
        {#each passos as item, i}
            {#if item.value.uva !== undefined}
                <div data-index={i + 1} class="fundo" style="{item.value.transformações !== undefined ? item.value.transformações : ''}">
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
            {#if item.value.imagemDesk !== undefined}
                <div data-index={i + 1} class="fundo">
                    <figure class="uva-repositorio-media">
                        <img
                            width=""
                            height=""
                            style="height: 100vh"
                            class="uva-imagem"
                            data-src={ dimensões > 580 ? `https://www.estadao.com.br` + item.value.imagemDesk : `https://www.estadao.com.br` + item.value.imagemMobile }
                            alt="{item.value.legenda}"
                        />
                    </figure>
                </div>
            {/if}
            {#if item.value.videoDesk !== undefined}
                <div data-index={i + 1} class="fundo">
                    <figure class="uva-repositorio-media">
                        <!-- svelte-ignore a11y-media-has-caption -->
                        <video
                            width=""
                            height=""
                            class="uva-video"
                            src={ dimensões > 580 ? `https://www.estadao.com.br` + item.value.videoDesk : `https://www.estadao.com.br` + item.value.videoMobile }
                            alt="{item.value.legenda}"
                            controls
                        />
                    </figure>
                </div>
            {/if}
        {/each}
    </div>
    <div class="passos">
        {#each passos as item, i}
            <div data-index={i + 1} class="passo{item.value.classe !== undefined ? ' ' + item.value.classe : ''}">
                <p class="uva-corpo">{@html item.value.texto}</p>
            </div>
        {/each}
    </div>
</div>

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
    width: 80%;
}

.passo.carregado {
    opacity: 1;
    transition: all .3s ease-in;
}
</style>