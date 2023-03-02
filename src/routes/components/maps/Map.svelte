<script>
    import { onMount } from 'svelte';
    import * as d3 from 'd3';
    import * as topojson from 'topojson-client';
    import { UvaPath } from "../../../scripts/store.js";
    import { version } from "../../../scripts/version.js";
    import ChartHeading from '../headings/ChartHeading.svelte';
    import Text from '../texts/Text.svelte';

    export let value;
    const { editoria, id, tipo, mapa, tamanho, largura, altura, título, linhaFina, dado, variável, tituloLegenda, textoLegenda, orientaçãoLegenda, posiçãoLegenda, shapePadding, shapeWidth, shapeHeight, labelOffset, fonte } = value;

    let UvaPages = "";
    UvaPath.subscribe(value => { UvaPages = value; });

    onMount(() => {
        const svg = d3.select(`#${id}`)
            .append('svg')
            .attr('preserveAspectRatio', 'xMidYMid meet')
            .attr('viewBox', '0 0 ' + largura + ' ' + altura)
            let caminho, sigla, jsonUrl;
            let locale = d3.formatLocale({
                    "decimal": ",",
                    "thousands": ".",
                    "grouping": [3],
                    "currency": ["R$", ""]
                });
            if (tipo === 'coroplético') {
                if (mapa === 'Brasil') {
                    caminho = 'brasil';
                    sigla = 'cities';
                    jsonUrl = 'https://gist.githubusercontent.com/Dienert/290f1428cca865cdfb5bc7d0dfcec473/raw/3d45041b0d31c5622ad8764460accdd8634caa10/brasil_estados_cidades_topo.json';
                    // sigla = '-';
                    // jsonUrl = 'https://arte.estadao.com.br/politica/eleicoes/2018/maptse/data/topojson/brasil/brasil-municipios.json';

                } if (mapa === 'cachorrão') {
                    sigla = 'sp-zonas-eleitorais';
                    jsonUrl = 'https://arte.estadao.com.br/arc/data/sp-cachorrao.json';

                } else if (mapa !== 'Brasil' && mapa !== 'cachorrão') {
                    caminho = mapa.toLowerCase();
                    sigla = caminho + '-municipios';
                    jsonUrl = 'https://arte.estadao.com.br/politica/eleicoes/2018/maptse/data/topojson/estados/' + caminho + '-municipios.json';
                }
                Promise.all([
                    d3.json(jsonUrl),
                    d3.json('https://arte.estadao.com.br/arc/data/brasil-nomes-municipios.json'),
                    d3.csv(`https://arte.estadao.com.br/public/pages/${UvaPages}${dado}?v=${version()}`)
                ]).then(([brasil, ibge, dado]) => {
                    const mapa = topojson.feature(brasil, brasil.objects[`${sigla}`]);
                    const projection = d3.geoMercator().fitSize([largura, altura], mapa);
                    const path = d3.geoPath().projection(projection);
                    // Desenha o mapa
                    svg.append('g')
                    .attr('class', 'uva-mapa-municipios')
                    .selectAll('path')
                    .data(mapa.features)
                    .enter()
                    .append('path')
                    .attr('d', path)
                    .attr('class', 'municipio')
                    .attr('data-tse', d => d.properties.tse)
                    .attr('data-distrito', d => d.properties.distrito);
                    // Adiciona os dados do IBGE
                    mapa.features.forEach(d => {
                        const element = ibge.find(e => e.codigo_tse === +d.properties.tse);
                        if (element) {
                            d3.select(`[data-tse="${d.properties.tse}"]`)
                            .attr('data-ibge', element.codigo_ibge)
                            .attr('data-uf', element.uf)
                            .attr('data-nome', element.nome_municipio)
                        }
                    });
                    // Aplica os dados no mapa
                    const dados = dado.map(d => {
                        return {
                            ibge: +d.ibge,
                            valor: +d[variável]
                        }
                    });                    
                    const domínio = JSON.parse(value.domínio);
                    const faixa = eval(value.faixa)
                    const escala = d3.scaleLinear()
                        .domain(domínio)
                        .range(faixa);
                    svg.selectAll('.municipio')
                    .attr('data-number', d => {
                        const element = dados.find(e => e.ibge === +d.properties.ibge);
                        if (element) {
                            return element.valor
                        } else {
                            return 'Sem valor';
                        }
                    })
                    .attr('fill', d => {
                        const element = dados.find(e => e.ibge === +d.properties.ibge);
                        if (element) {
                            return escala(element.valor);
                        } else {
                            return '#ccc';
                        }
                    })
                    // Cria um tooltip
                    if (window.innerWidth > 768) {
                        let brasil = locale.format(",d");
                        d3.selectAll('path')
                        .on('mouseover', function() {
                            const conteúdoTooltip = eval(value.tooltip);
                            const tooltip = d3.select('body')
                            .append('div')
                            .attr('class', 'uva-tooltip-mapa')
                            tooltip.append('div')
                                .attr('class', 'label')
                                .html(conteúdoTooltip)
                            d3.select('body')
                            .on('mousemove', function (event) {
                                const mouse = d3.pointer(event);
                                tooltip
                                    .style('left', `${mouse[0] + 20}px`)
                                    .style('top', `${mouse[1] - 20}px`)
                                    .style('display', 'block')
                                    .style('opacity', 1);
                            });
                        })
                        .on('mouseout', function() {
                            d3.select('.uva-tooltip-mapa').remove();
                            d3.select('body')
                                .on('mousemove', null);
                        });
                    }
                });
            }
    })
</script>

{#if título}
    <ChartHeading value={título} />
{/if}
{#if linhaFina}
    <Text value="<strong>{linhaFina}</strong>" />
{/if}
<figure class="uva-map-container {tamanho}">
    <div id={id}></div>
    {#if fonte}
        <figcaption class='uva-credits P' style='text-align: right'>{@html fonte}</figcaption>
    {/if}
</figure>

<style>
.uva-map-container {
    margin: calc(var(--margem-vertical) * 1) auto calc(var(--margem-vertical) * 2) auto;
}

:global(.municipio, .distrito) {
    stroke: rgb(127 127 127);
    stroke-width: 1;
}

:global(.uva-tooltip-mapa) {
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

.label, .legendTitle {
    font-family: var(--sans-serif);
    text-transform: uppercase;
    font-size: 0.65rem;
    letter-spacing: 0.017rem;
}
</style>