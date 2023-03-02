<script>
    import { UvaPath } from "../../../scripts/store.js"
    let UvaPages = "";
    UvaPath.subscribe(value => { UvaPages = value; });
    import { version } from "../../../scripts/version.js";
    import ChartHeading from '../headings/ChartHeading.svelte';
    import Text from '../texts/Text.svelte';
    import * as d3 from 'd3';
    import * as topojson from 'topojson-client';
    export let value;
    const { editoria, id, tipo, mapa, tamanho, largura, altura, título, linhaFina, dado, variável, domínio, faixa, tituloLegenda, textoLegenda, orientaçãoLegenda, posiçãoLegenda, shapePadding, shapeWidth, shapeHeight, labelOffset, tooltip, fonte } = value;

    let caminho;
    let sigla;
    let json;

    let locale = d3.formatLocale({
                    "decimal": ",",
                    "thousands": ".",
                    "grouping": [3],
                    "currency": ["R$", ""]
                });
    let brasil = locale.format(",d");

    import { onMount } from 'svelte';
    onMount (() => {
        // define dimensões do mapa
        const width = largura;
        const height = altura;
        const svg = d3.select('#' + id)
            .append('svg')
            .attr('preserveAspectRatio', 'xMidYMid meet')
            .attr('viewBox', '0 0 ' + width + ' ' + height)

        // desenha o mapa com divisão por municípios
        if (tipo === 'municípios') {
            // se Brasil, com todos os municípios
            if (value.mapa === 'Brasil') {
                caminho = 'brasil';
                sigla = '-';
                sigla = 'cities';
                json = 'https://gist.githubusercontent.com/Dienert/290f1428cca865cdfb5bc7d0dfcec473/raw/3d45041b0d31c5622ad8764460accdd8634caa10/brasil_estados_cidades_topo.json';
                // json = 'https://arte.estadao.com.br/politica/eleicoes/2018/maptse/data/topojson/brasil/brasil-municipios.json';
            // se estados
            } else {
                caminho = mapa.toLowerCase();
                sigla = caminho + '-municipios';
                json = 'https://arte.estadao.com.br/politica/eleicoes/2018/maptse/data/topojson/estados/' + caminho + '-municipios.json';
            }
            d3.json(json)
                .then(function (brasil) {
                    let mapa = topojson.feature(brasil, brasil.objects[`${sigla}`]);
                    let projection = d3.geoMercator().fitSize([width, height], mapa);
                    let path = d3.geoPath().projection(projection);
                    svg.append('g')
                    .attr('class', 'uva-mapa-municipios')
                    .selectAll('path')
                    .data(mapa.features)
                    .enter()
                    .append('path')
                    .attr('d', path)
                    .attr('class', 'municipio')
                    .attr('data-tse', function (d) {
                        return d.properties.tse;
                    });
                })

            // cruza os dados do TSE com os dados do IBGE e nome de cidade
            d3.json('https://arte.estadao.com.br/arc/data/brasil-nomes-municipios.json')
            .then (function (ibge) {
                d3.selectAll('.municipio')
                .each(function (d) {
                    var tse = d3.select(this).attr('data-tse');
                    var codigo_ibge = '';
                    var uf = '';
                    var municipio = '';
                    ibge.forEach(function (element) {
                    if (element.codigo_tse === +tse) {
                        codigo_ibge = element.codigo_ibge;
                        uf = element.uf;
                        municipio = element.nome_municipio;
                    }
                    });
                    d3.select(this).attr('data-ibge', codigo_ibge);
                    d3.select(this).attr('data-uf', uf);
                    d3.select(this).attr('data-nome', municipio);
                });
            })

        // desenha o mapa de distritos de São Paulo
        } else if (value.tipo === 'cachorrão') {
            d3.json('https://arte.estadao.com.br/arc/data/sp-cachorrao.json')
            .then(function (distrito) {
                var cachorrao = topojson.feature(distrito, distrito.objects['sp-zonas-eleitorais']);
                var projection = d3.geoMercator().fitSize([width, height], cachorrao);
                var path = d3.geoPath().projection(projection);
                svg.append('g')
                .attr('class', 'uva-mapa-distritos-sp')
                .selectAll('path')
                .data(cachorrao.features)
                .enter()
                .append('path')
                .attr('d', path)
                .attr('class', 'distrito')
                .attr('data-distrito', function (d) {
                    return d.properties.distrito;
                })
            })
        }

        // // puxa os dados e aplica no mapa
        d3.csv(`https://arte.estadao.com.br/public/pages/${UvaPages}${dado}?v=${version()}`)
        .then(function (dado) {
            var data = variável;
            // var min = d3.min(data, function (d) {
            //     return +d[data];
            // });
            // var max = d3.max(data, function (d) {
            //     return +d[data];
            // });
            var domínio = JSON.parse(value.domínio);
            var faixa = eval(value.faixa);
            var color = d3.scaleLinear()
            // .domain([min, max])
            // .range(domínio);
            .domain(domínio)
            .range(faixa);
            d3.selectAll('.municipio')
            .attr('fill', function (d) {
                var ibge = d3.select(this).attr('data-ibge');
                var dataPoint = '';
                dado.some(function (element) {
                    if (element.ibge === ibge) {
                        dataPoint = element[data];
                        return true;
                    }
                });
                d3.select(this).attr('data-number', dataPoint);
                return color(dataPoint);
            });


            // cria legenda
            // let label = eval(textoLegenda);
            // let legenda = d3.legendColor()
            //     .title(`${tituloLegenda}`)
            //     .cells(domínio)
            //     .orient(`${orientaçãoLegenda}`)
            //     .labelFormat(brasil)
            //     .labels(label)
            //     .scale(color)
            //     .shapePadding(shapePadding)
            //     .shapeWidth(shapeWidth)
            //     .shapeHeight(shapeHeight)
            //     .labelOffset(labelOffset);
            // svg.append("g")
            //     .attr("class", "uva-legenda-mapa")
            //     .attr(`transform`, `translate(${posiçãoLegenda})`)
            // svg.select(".uva-legenda-mapa")
            //     .call(legenda);


            // cria tooltip
            if (window.innerWidth > 768) {
            d3.selectAll('path')
                .on('mouseover', function (d) {
                    var conteúdoTooltip = eval(value.tooltip);
                    //var conteúdoTooltip = "<strong>" + d3.select(this).attr("data-nome") + "</strong><hr>" + "População: " + brasil(d3.select(this).attr("data-number")) + " habitantes"
                    var tooltip = d3.select('body')
                        .append('div')
                        .attr('class', 'uva-tooltip-mapa')
                    tooltip.append('div')
                        .attr('class', 'label')
                        .html(conteúdoTooltip)
                    d3.select('body')
                    .on('mousemove', function (event) {
                        var mouse = d3.pointer(event);
                        tooltip
                            .style('left', `${mouse[0] + 20}px`)
                            .style('top', `${mouse[1] - 20}px`)
                            .style('display', 'block')
                            .style('opacity', 1);
                    });
                })
                .on('mouseout', function (d) {
                    d3.select('.uva-tooltip-mapa').remove();
                    d3.select('body')
                        .on('mousemove', null);
                });
            }
        })
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

/* .uva-body {
   font-size: calc(var(--corpo-desktop) * 0.8);
   line-height: calc(var(--entrelinha-desktop) * 0.8);
} */

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