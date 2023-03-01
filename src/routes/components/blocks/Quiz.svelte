<script>
    import AudioContainer from '../audios/AudioContainer.svelte';
    import ImageContainer from '../images/ImageContainer_responsive.svelte';
    import YoutubeContainer from '../videos/YoutubeContainer.svelte';
    import Button from '../buttons/Button.svelte';
    export let value;
    const { conteúdo } = value;
    const questions = conteúdo.filter(item => item.type === "questão");
    let score = 0;
    function handleClick(event) {
        event.target.classList.add('selected');
        const question = event.target.closest('.uva-quiz-container-question');
        question.classList.remove('unanswered');
        question.classList.add('answered');
        const buttons = question.querySelectorAll('.uva-quiz-button');
        buttons.forEach(button => {
            button.disabled = true;
        });
        const questionNumber = question.dataset.question;
        const questionIndex = questionNumber - 1;
        const questionAnswer = questions[questionIndex].value.resposta;
        const alternativeSelected = event.target.textContent;
        if (alternativeSelected == questionAnswer) {
            score++;
            event.target.classList.add('correct');
            question.innerHTML += `<p class="uva-quiz-score P" style="color:var(--cor-EeN-primaria)">Correto! 🎉🎉🎉<span>Pontuação atual: ${score}/${questions.length}</span></p>`;
        } else {
            event.target.classList.add('incorrect');
            buttons.forEach(button => {
                if (button.textContent == questionAnswer) {
                    button.classList.add('correct');
                }
            });
            question.innerHTML += `<p class="uva-quiz-score P" style="color:var(--cor-c2-primaria)">Incorreto! 😢<span>Pontuação atual: ${score}/${questions.length}</p>`;
        }

        const explanation = questions[questionIndex].value.explicação;
        if (explanation) {
            const explanationContainer = document.createElement('div');
            explanationContainer.classList.add("uva-quiz-explanation");
            explanationContainer.classList.add("P");
            explanation.forEach(item => {
                if (item.type === "text")
                    explanationContainer.innerHTML += `<p>${item.value}</p>`;
                else if (item.type === "imagem") {
                    explanationContainer.innerHTML +=`
                        <figure style="margin: calc(var(--margem-vertical) * 2) 0 0 0">
                            <img 
                                width="180"
                                height="120"
                                class="uva-image"
                                src="https://estadao.com.br${item.value.fonte}"
                                alt="${item.value.legenda}"
                            />
                            <figcaption style="text-align: right; margin-top: 0">
                                <span class="uva-credits">${item.value.crédito}</span>
                            </figcaption>
                        </figure>`;
                }
                else if (item.type === "youtube") {
                    explanationContainer.innerHTML +=`
                        <figure>
                            <div class="uva-quiz-youtube">
                                <iframe
                                    title="Vídeo do Youtube" 
                                    frameborder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                    allowfullscreen="" 
                                    src="https://www.youtube.com/embed/${item.value.fonte}">
                                </iframe>
                            </div>
                        </figure>`;
                }
            });
            question.appendChild(explanationContainer);
        }
    }
</script>

<div class="uva-quiz">
    {#each questions as item, i}
        <div data-question={i + 1} class="uva-quiz-container-question unanswered">
            <div class="uva-quiz-counter P"> {i + 1} de {questions.length}</div>
            <h3 class="uva-quiz-question P">{@html item.value.pergunta}</h3>
                {#if item.value.imagem}
                    <ImageContainer value={{
                        tamanho: item.value.imagem.tamanho,
                        classe: item.value.imagem.classe, 
                        fonte: item.value.imagem.fonte, 
                        mostrarLegenda: item.value.imagem.mostrarLegenda, 
                        legenda: item.value.imagem.legenda, 
                        crédito: item.value.imagem.crédito
                    }} />
                {/if}
                {#if item.value.audio}
                    <AudioContainer value={{
                        tamanho: item.value.audio.tamanho,
                        fonte: item.value.audio.fonte
                    }} />
                {/if}
                {#if item.value.youtube}
                    <YoutubeContainer value={{
                        tamanho: item.value.youtube.tamanho,
                        fonte: item.value.youtube.fonte
                    }} />
                {/if}
            {#each item.value.alternativas as item, i}
                <Button classe="uva-quiz-button P" value={item.value} {handleClick} />
            {/each}
        </div>
    {/each}
</div>

<style>
    .uva-quiz-counter::before {
        content: '';
        display: flex;
        margin-top: -0.8rem;
        padding-top: var(--margem-horizontal);
        border-top: var(--fio-pontilhado);
    }

    .uva-quiz-counter {
        margin-top: calc(var(--margem-vertical) * 2.2);
        padding-top: calc(var(--margem-vertical) * .2);
        border-top: var(--fio-pontilhado);
        font: 600 calc(var(--corpo-mobile) * 0.9)/calc(var(--entrelinha-mobile) * 1) var(--condensed);
        text-transform: uppercase;
        text-align: left;
        color: var(--cor-primaria);
    }

    .uva-quiz-counter::after {
        content: "";
        display: block;
        width: var(--filete);
        margin: 8px 0 calc(var(--margem-vertical) * 0.5) 0;
        border-bottom: var(--fio-solido-grosso);
        border-color: var(--cor-primaria);
    }

    :global(.uva-quiz-question, .uva-quiz-explanation > p) {
        margin: calc(var(--margem-vertical) * 1) auto;
        font: 400 calc(var(--corpo-mobile) * 1)/calc(var(--entrelinha-mobile) * 1) var(--semicondensed);
        text-align: left;
        color: var(--cor-texto);
    }

    :global(.uva-quiz-score) {
        display: flex;
        justify-content: space-between;
        margin-top: calc(var(--margem-vertical) * 1.25);
        font: 600 calc(var(--corpo-mobile) * 0.9)/calc(var(--entrelinha-mobile) * 0.9) var(--condensed);
        letter-spacing: 0.04rem;
        text-transform: uppercase;
    }

    :global(.uva-quiz-score > span) {
        font-size: 65%;
        text-transform: uppercase;
        border: var(--borda-fina);;
        border-radius: 4px;
        padding: 0px 16px 0px 16px;
        background-color: var(--cor-fundo);
        color: var(--cor-texto);
        box-shadow: var(--sombra-leve);
    }
    
    :global(.uva-quiz-button) {
        margin: 0.5rem auto;
        transition-property: padding, background-color;
        background-color: var(--cor-secundaria);
        background-size: 15px 15px;
        background-position: calc(100% - 20px) 15px;
        background-repeat: no-repeat;
        color: var(--cor-fundo);
    }

    :global(.uva-quiz-button:hover) {
        background-color: var(--cor-primaria);
    }

    :global(.uva-quiz-button:disabled) {
        color: #b4b3b3;
        cursor: default;
        background-color: #f2f2f2;
    }

    :global(.uva-quiz-button.correct) {
        background-image: url(https://arte.estadao.com.br/arc/images/quiz-correta.svg);
        color: var(--cor-EeN-primaria);
    }

    :global(.uva-quiz-button.selected.correct) {
        background-color: var(--cor-EeN-primaria);
        background-image: url(https://arte.estadao.com.br/arc/images/quiz-correta.svg);
        color: var(--cor-fundo);
    }

    :global(.uva-quiz-button.selected.incorrect) {
        background-color: var(--cor-c2-primaria);
        background-image: url(https://arte.estadao.com.br/arc/images/quiz-incorreta.svg);
        color: var(--cor-fundo);
    }

    :global(.uva-quiz-youtube) {
        position:relative;
        padding-bottom:56.25%;
        height:0;
        overflow:hidden;
        margin: calc(var(--margem-vertical) * 2) auto;
        background-color: var(--cor-texto);
        border-radius: 6px;
        box-shadow: var(--sombra-forte);
    }

    :global(.uva-quiz-youtube > iframe) {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    @media (min-width:740px) { /* Desktop */
        :global(.uva-quiz-question, .uva-quiz-explanation > p) {
            font-size: calc(var(--corpo-desktop) * 1);
            line-height: calc(var(--entrelinha-desktop) * 1);
        }
    }

</style>