<script>
    import AudioContainer from '../audios/AudioContainer.svelte';
    import ImageContainer from '../images/ImageContainer.svelte';
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
                        <figure class="s--GPsEB6YqfJT">
                            <img 
                                width="180"
                                height="120"
                                class="uva-image ${item.value.classe} s-_EdyOrJzQMFJ"
                                src="https://estadao.com.br${item.value.fonte}"
                                alt="${item.value.legenda}"
                            />
                            <figcaption class="s--GPsEB6YqfJT" style="text-align: right; margin-top: 0">
                                <span class="uva-credits s-P6s0UGDWQeag">${item.value.crédito}</span>
                            </figcaption>
                        </figure>`;
                }
            });
            question.appendChild(explanationContainer);
        }
    }
</script>

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
        font: 700 calc(var(--corpo-mobile) * 0.9)/calc(var(--entrelinha-mobile) * 1) var(--condensed);
        text-transform: uppercase;
        text-align: left;
        color: var(--cor-primaria);
    }

    .uva-quiz-counter::after {
        content: '';
        display: block;
        width: var(--filete);
        height: 0.188rem;
        background-color: var(--cor-primaria);
        margin-top: 0.375rem;
    }

    :global(.uva-quiz-question, .uva-quiz-explanation) {
        margin: calc(var(--margem-vertical) * .5) auto;
        font: 400 calc(var(--corpo-mobile) * 0.9)/calc(var(--entrelinha-mobile) * 1) var(--semicondensed);
        text-align: left;
        color: var(--cor-texto);
    }

    :global(.uva-quiz-score) {
        display: flex;
        justify-content: space-between;
        margin: calc(var(--margem-vertical) * 1.25) 0 -10px 0;
        font: 700 calc(var(--corpo-mobile) * 0.95)/calc(var(--entrelinha-mobile) * 1) var(--condensed);
        letter-spacing: 0.03rem;
        text-transform: uppercase;
    }

    :global(.uva-quiz-score > span) {
        font-size: 65%;
        text-transform: uppercase;
        border: 1px solid #00000022;
        border-radius: 4px;
        padding: 0px 16px 0px 16px;
        background-color: var(--cor-fundo);
        color: var(--cor-texto);
        box-shadow: 0px 0px 4px 0px #00000009;
    }
    
    :global(.uva-quiz-button.s-quPV9sMOo0BV) {
        width: var(--largura-celular);
        max-width: var(--P);
        margin: 0.5rem auto;
        transition-property: padding, background-color;
        background-color: var(--cor-secundaria);
        background-size: 15px 15px;
        background-position: calc(100% - 20px) 15px;
        background-repeat: no-repeat;
        color: white;
    }

    :global(.uva-quiz-button.s-quPV9sMOo0BV:hover) {
        background-color: var(--cor-primaria);
    }

    :global(.uva-quiz-button.s-quPV9sMOo0BV:disabled) {
        color: #b4b3b3;
        cursor: default;
        background-color: #f2f2f2;
    }

    :global(.uva-quiz-button.correct) {
        background-image: url(https://arte.estadao.com.br/arc/images/quiz-correta.svg);
        color: #97c19a;
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
</style>

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
                    <Button classe="uva-quiz-button" value={item.value} {handleClick} />
            {/each}
        </div>
    {/each}
</div>