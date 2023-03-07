<script>
    import { onMount } from 'svelte';
    import { mapaMundo } from './mundo.js'
    import { mapaBrasil } from './brasil.js'
    import { mapaBrasilUFs } from './brasilUFs.js'
    import { mapaEstados } from './estados.js'
    import { mapaCachorrao } from './cachorrao.js'
    import ChartHeading from '../headings/ChartHeading.svelte';
    import Text from '../texts/Text.svelte';

    export let value;
    const { id, tipo, mapa, tamanho, largura, altura, título, linha_fina, cores, dados, variável, título_legenda, texto_legenda, fonte } = value;
    
    let el;
    let legendColors = cores.split(', ');
    let legendText = texto_legenda.split(', ');

    onMount(() => {
        if (mapa === 'Mundo') {
            mapaMundo(el, tipo, dados, largura, altura, variável, value);
        }
        if (mapa === 'Brasil') {
            mapaBrasil(el, tipo, dados, largura, altura, variável, value);
        }
        if (mapa === 'BrasilUFs') {
            mapaBrasilUFs(el, tipo, dados, largura, altura, variável, value);
        }
        if (mapa === 'cachorrao-distritos') {
            mapaCachorrao(el, tipo, mapa, dados, largura, altura, variável, value);
        }
        if (mapa === 'cachorrao-delegacias-policiais') {
            mapaCachorrao(el, tipo, mapa, dados, largura, altura, variável, value);
        } else if (mapa !== 'Mundo' && mapa !== 'Brasil' && mapa !== 'BrasilUFs' && mapa !== 'cachorrao-distritos' && mapa !== 'cachorrao-delegacias-policiais') {
            mapaEstados(el, tipo, mapa, dados, largura, altura, variável, value);
        }
    })
</script>

{#if título}
    <ChartHeading value={título} />
{/if}
{#if linha_fina}
    <Text value="<strong>{linha_fina}</strong>" />
{/if}
<figure class="uva-map-container {tamanho}">
    <div class='uva-credits P' style='display: flex; justify-content: flex-end; text-align: right; '>
        <div style='width:fit-content'>
            <div>{título_legenda}</div>
            <div class='uva-legend-container'>
                {#each legendColors as item}
                    <div class="uva-legend-colors" style="background-color: {item};"></div>                    
                {/each}
            </div>
            <div class='uva-legend-container'>
                <div style='font-size: 80%'>← {legendText[0]}</div>
                <div style='font-size: 80%'>{legendText[1]} →</div>
            </div>
        </div>
    </div>
    <div id={id} bind:this={el}></div>    
    {#if fonte}
        <figcaption class='uva-credits P' style='text-align:right; margin-top: 15px'>{@html fonte}</figcaption>
    {/if}
</figure>

<style>
    .uva-map-container {
        margin: calc(var(--margem-vertical) * 1) auto calc(var(--margem-vertical) * 2) auto;
    }

    .uva-legend-container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin: 6px 0;
        width: 100%;
    }

    .uva-legend-colors {
        width: 20px;
        height: 4px; 
    }

    :global(.regiao.mundo, .regiao.estado, .regiao.distrito, .regiao.DP) {
        stroke: rgb(121, 121, 121);
        stroke-width: 0.4;
        stroke-linejoin: round;
        stroke-miterlimit: 20;
        stroke-linecap: round;
    }

    :global(.regiao.brasil) {
        stroke: white;
        stroke-width: 0.1;
        stroke-linejoin: round;
        stroke-miterlimit: 20;
        stroke-linecap: round;
    }

    :global(.estados) {
        fill: none;
        stroke: rgb(121, 121, 121);
        stroke-width: 1.5;
        stroke-linejoin: round;
        stroke-miterlimit: 20;
        stroke-linecap: round;
    }

    :global(.tooltip) {
        position: absolute;
        opacity: 0;
        background-color: white;
        padding: 10px;
        width: auto;
        height: auto;
        border-radius: 2px;
        pointer-events: none;
        border: var(--borda-fina);
        box-shadow: var(--sombra-leve);
        font: 500 calc(var(--corpo-mobile) * 0.7) / calc(var(--entrelinha-mobile) * 0.7) var(--sans-serif);
        color: var(--cor-texto);
    }

    @media (min-width:748px) {
        /* Desktop */
        .uva-legend-colors {
            width: 26px;
            height: 6px;
        }

        :global(.regiao) {
            stroke-width: 0.5;
        }
    }
</style>