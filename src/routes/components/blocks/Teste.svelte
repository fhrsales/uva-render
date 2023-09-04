<script>
    import Button from './../buttons/Button.svelte';
    import ImageContainer from '../images/ImageContainer_responsive.svelte';
    import YoutubeContainer from '../videos/YoutubeContainer.svelte';

    export let value;
    const {
        botão1,
        botão2,
        escala,
        perguntas,
        respostas,
    } = value;

    let questions = [];
    let currentQuestion = 0;
    let selectedAlternative = null;
    let total = 0;

    for (let i = 0; i < perguntas.length; i++) {
        const pergunta = perguntas[i];
        if (pergunta.type === 'pergunta') {
            questions.push({
                question: pergunta.value,
                alternatives: [],
                selectedAlternative: null,
            });
        } else if (pergunta.type === 'alternativas') {
            questions[questions.length - 1].alternatives = pergunta.value.map((alt, index) => ({
                text: alt,
                weight: index + 1,
            }));
        }
    }

    function selectAlternative(weight) {
        selectedAlternative = weight;
    }

    function nextQuestion() {
        if (questions[currentQuestion].selectedAlternative !== null) {
            total += questions[currentQuestion].selectedAlternative;
            currentQuestion++;
        } else {
            alert("Por favor, selecione uma alternativa antes de prosseguir.");
        }
    }

    function restartQuiz() {
        total = 0;
        currentQuestion = 0;
        questions.forEach((q) => (q.selectedAlternative = null));
    }

    function handleClick() {
        if (currentQuestion < questions.length) {
            if (questions[currentQuestion].selectedAlternative !== null) {
                total += questions[currentQuestion].selectedAlternative;
                currentQuestion++;
            } else {
                alert("Por favor, selecione uma alternativa antes de prosseguir.");
            }
        } else {
            total = 0;
            currentQuestion = 0;
            questions.forEach((q) => (q.selectedAlternative = null));
        }
    }
</script>

<div class='uva-quest-container'>
    {#if currentQuestion < questions.length}
        <h3 class='uva-quest-question'>{questions[currentQuestion].question}</h3>
        <div class="uva-quest-container-alternatives">
        {#each questions[currentQuestion].alternatives as alternative}
            <label>
            <input
                type="radio"
                bind:group={questions[currentQuestion].selectedAlternative}
                value={alternative.weight}
                on:change={() => selectAlternative(alternative.weight)}
            />
            {alternative.text}
            </label>
        {/each}
        </div>
        <div class='uva-quest-button-container'>
        <Button
            classe='uva-quest-button'
            {handleClick}
            value={botão1}
        />
        </div>
    {:else}
        <div class='uva-quest-container-result'>
            {#if total <= 16}
                <div class='uva-quest-container-result'>
                    <div>
                        <span class='uva-quest-container-result-total'>{total} pontos</span><br>
                        <span style='color: var(--cor-secundaria)'>A soma das suas respostas foi até 16.</span> O uso de games ainda não representa um risco à saúde.
                    </div>
                </div>
            {:else if total >= 16 && total <= 21}
                <div class='uva-quest-container-result'>
                    <div>
                        <span class='uva-quest-container-result-total'>{total} pontos</span><br>
                        <span style='color: var(--cor-secundaria)'>A soma das suas respostas ficou entre 16 e 21.</span> Existe um risco importante de desenvolver o chamado gaming disorder. É essencial ter um olhar atento para o comportamento da criança ou do adolescente.
                    </div>
                </div>
            {:else}
                <div class='uva-quest-container-result'>
                    <div>
                        <span class='uva-quest-container-result-total'>{total} pontos</span><br>
                        <span style='color: var(--cor-secundaria)'>A soma das suas respostas ficou acima de 21.</span> Já é possível confirmar o diagnóstico de gaming disorder. Faz sentido buscar apoio de um especialista.
                    </div>
                </div>
            {/if}
        </div>
        <div class='uva-quest-button-container'>
        <Button
            classe='uva-quest-button'
            {handleClick}
            value={botão2}
        />
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
    .uva-quest-container-result-total {
        font-size: 200%;
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