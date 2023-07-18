<script>
    import { onMount } from 'svelte';
    import Button from './../buttons/Button.svelte';
    import ImageContainer from '../images/ImageContainer_responsive.svelte';
    import YoutubeContainer from '../videos/YoutubeContainer.svelte';

    let alternativas = [];
    let selectedOption = {};
    let counts = {};
    let showResetButton = false;
    let showResults = true;
    let maxOption = '';
    let noMaxOption = false;
    
    export let value;
    const {
        botão1,
        botão2,
        perguntas,
        respostas,
    } = value;

    const answers = {};
    respostas.forEach((resposta) => {
        if (resposta.type !== "empate") {
            answers[resposta.type] = resposta.value;
        }
    });

    const questions = [];
    let perguntaAtual = {};

    perguntas.forEach((item) => {
        if (item.type === "pergunta") {
            perguntaAtual.pergunta = item.value;
        } else if (item.type === "imagem") {
            perguntaAtual.imagem = item.value;
        } else if (item.type === "youtube") {
            perguntaAtual.youtube = item.value;
        } else if (item.type === "alternativas") {
            perguntaAtual.alternativas = item.value;
        } else if (item.type === "opções") {
            perguntaAtual.options = item.value;
            questions.push({ ...perguntaAtual });
            perguntaAtual = {};
        }
    });

    const nenhumResultado = respostas.find((resposta) => resposta.type === "empate").value;

    function handleClick() {
        if (showResults && alternativas.length === questions.length) {
            countOptions();
            showResetButton = true;
            showResults = false;
        } else {
            resetQuiz();
        }
    }

    function resetQuiz() {
        alternativas = [];
        counts = {};
        selectedOption = {};
        showResetButton = false;
        showResults = true;
        maxOption = '';
        noMaxOption = false;
        countOptions();
    }

    function countOptions() {
        counts = {};
        alternativas.forEach(answer => {
            const selectedOption = answer.selectedOption.charAt(0);
            if (!counts[selectedOption]) {
                counts[selectedOption] = 0;
            }
                counts[selectedOption]++;
        });

        const maxCount = Math.max(...Object.values(counts));
        const maxOptions = Object.keys(counts).filter(option => counts[option] === maxCount);
            if (maxOptions.length === 1) {
                maxOption = maxOptions[0];
                noMaxOption = false;
            } else {
                maxOption = '';
                noMaxOption = true;
            }
    }

    function handleOptionChange(perguntaIndex, option) {
        selectedOption[perguntaIndex] = option;
        const answerIndex = alternativas.findIndex(answer => answer.perguntaIndex === perguntaIndex);
        if (answerIndex !== -1) {
            alternativas[answerIndex].selectedOption = option;
        } else {
            alternativas.push({ perguntaIndex, selectedOption: option });
        }
    }

    onMount(() => {
        countOptions();
    });
</script>

<div class='uva-quest-container'>
     {#each questions as pergunta, perguntaIndex}
        <div data-uva-index={perguntaIndex + 1}>
            <h3 class='uva-quest-question'>{pergunta.pergunta}</h3>
            {#if pergunta.imagem}
                <ImageContainer value={{
                    tamanho: pergunta.imagem.tamanho,
                    classe: pergunta.imagem.classe, 
                    fonte: pergunta.imagem.fonte, 
                    mostrarLegenda: pergunta.imagem.mostrarLegenda, 
                    legenda: pergunta.imagem.legenda, 
                    crédito: pergunta.imagem.crédito
                }} />
            {/if}
            {#if pergunta.youtube}
                <YoutubeContainer value={{
                    tamanho: pergunta.youtube.tamanho,
                    fonte: pergunta.youtube.fonte
                }} />
            {/if}
            <div class="uva-quest-container-alternatives">
                {#each pergunta.options as option}
                    <label>
                        <input
                            type="radio"
                            name={`pergunta-${perguntaIndex + 1}`}
                            value={`resposta-${perguntaIndex + 1}`}
                            on:change={() => handleOptionChange(perguntaIndex, option)}
                            checked={selectedOption[perguntaIndex] === option}
                        />
                        <span>{pergunta.alternativas[pergunta.options.indexOf(option)]}</span>
                    </label>
                {/each}
            </div>
        </div>
    {/each} 

    {#if (showResults && alternativas.length === questions.length) || showResetButton}
        <div class='uva-quest-button-container'>
            <Button
                classe='uva-quest-button' 
                {handleClick}
                value={ showResults ? botão1 : botão2 }
            />
        </div>
    {/if}

    {#if Object.keys(counts).length > 0 && !showResults}
            <div class='uva-quest-container-result'>
                {#if maxOption !== ''}
                    <div>{@html answers[maxOption]}</div>
                {/if}
                {#if noMaxOption}
                    <div>{@html nenhumResultado}</div>
                {/if}
            </div>
    {/if}
</div>

<style>
    label {
        display: flex;
        align-items: baseline;
        margin-bottom: calc(var(--margem-vertical) * 0.25);
        cursor: pointer;
    }

    .uva-quest-question::before {
        content: "";
        position: absolute;
        width: var(--filete);
        margin: -14px 0 0 0;
        border-top: var(--fio-solido-fino);
        border-color: var(--cor-primaria);
    }

    .uva-quest-question {
        width: var(--largura-celular);
        max-width: var(--P);
        margin: calc(var(--margem-vertical) * 2) auto calc(var(--margem-vertical) * 0.5) auto;
        font: 700 var(--corpo-mobile) / var(--entrelinha-mobile) var(--texto);
        color: var(--texto);
    }

    input[type=radio] {
        position: relative;
        cursor: pointer;
        margin: 0px 20px 4px -5px;
        box-sizing: content-box;
        transition: background-color 0.3s ease, border-color 0.3s ease;
    }

    input[type=radio]:before {
        content: "";
        display: block;
        position: absolute;
        width: 20px;
        height: 20px;
        top: -6px;
        left: 0px;
        background-color: var(--cor-fundo);
        border: 2px solid var(--cor-secundaria);
        border-radius: 50%;
        transition: background-color 0.3s ease, border-color 0.3s ease;
    }

    input[type=radio]:checked:before {
        content: "";
        display: block;
        position: absolute;
        width: 20px;
        height: 20px;
        top: -6px;
        left: 0px;
        background-color:var(--cor-texto);
        border: 2px solid var(--cor-texto);
        border-radius: 50%;
        transform: scale(1.3);
        transition: background-color 0.5s ease, border-color 0.5s ease;
    }
    
    input[type=radio]:checked:after {
        content: "";
        display: block;
        width: 3px;
        height: 8px;
        border: solid white;
        border-width: 0 2px 2px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
        position: absolute;
        top: 0px;
        left: 10px;
        opacity: 1;
        transition: opacity 0.3s ease;
    }

    input[type=radio]:checked:before:hover {
        background-color: var(--cor-primaria-hover);
        border-color: var(--cor-primaria-hover);
    }

    input[type=radio]:hover:before {
        border-color: var(--cor-secundaria-hover);
    }

    .uva-quest-container-alternatives {
        display: flex;
        flex-direction: column;
        width: var(--largura-celular);
        max-width: var(--P);
        margin: 0 auto calc(var(--margem-vertical) * 1.5) auto;
    }

    .uva-quest-container {
        margin: 0 auto calc(var(--margem-vertical) * 1.5) auto;
        font: 500 var(--corpo-mobile) / var(--entrelinha-mobile) var(--texto);
        color: var(--texto);
        text-align: left;
    }

    .uva-quest-button-container {
        display: flex;
        justify-content: center;
        margin: calc(var(--margem-vertical) * 1.5) auto calc(var(--margem-vertical) * 1.5) auto;
    }

    :global(.uva-quest-button) {
        background-color: var(--cor-primaria);
        color: var(--cor-fundo);
        transition: all .35s ease-out;
    }

    :global(.uva-quest-button:hover) {
        background-color: var(--cor-secundaria);
    }

    .uva-quest-container-result {
        width: var(--largura-celular);
        max-width: var(--P);
        margin: 0 auto calc(var(--margem-vertical) * 1.5) auto;
        text-align: left;
        background-color: var(--cor-texto);
        border-radius: 6px;
        box-shadow: var(--sombra-leve);
    }
    .uva-quest-container-result > div {
        padding: calc(var(--margem-vertical) * 1.5);
        font: 800 var(--corpo-mobile) / var(--entrelinha-mobile) var(--texto);
        color: var(--cor-fundo);
    }

    @media (min-width: 740px) {
        .uva-quest-container {
            font-size: var(--corpo-desktop);
            line-height: var(--entrelinha-desktop);
            margin-bottom: calc(var(--margem-vertical) * 0.5);
        }

        .uva-quest-question {
            font: 700 var(--corpo-desktop) / var(--entrelinha-desktop) var(--texto);
        }
    }
</style>