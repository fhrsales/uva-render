<script>
    import ChartHeading from "../headings/ChartHeading.svelte";
    import Text from "../text/Text.svelte";

    // import * as d3 from 'd3';
    // import * as topojson from 'topojson-client';

    export let value;
    const { editoria, id, tipo, mapa, tamanho, largura, altura, título, linhaFina, dado, variável, domínio, faixa, tituloLegenda, textoLegenda, orientaçãoLegenda, posiçãoLegenda, shapePadding, shapeWidth, shapeHeight, labelOffset, tooltip, fonte } = value;

    //export let data;
    //data = "https://arte.estadao.com.br/politica/eleicoes/2018/maptse/data/topojson/estados/" + caminho + "-municipios.json"

    // let locale = d3.formatLocale({
    //         "decimal": ",",
    //         "thousands": ".",
    //         "grouping": [3],
    //         "currency": ["R$", ""]
    //     });
    
    // let brasil = locale.format(",d");

    // let svg;
    // let path;
    // let g;

    // import { onMount } from 'svelte';
    // onMount(() => {
    //     svg = d3.select({id})
    //         .append("svg")
    //         .attr("preserveAspectRatio", "xMidYMid meet")
    //         .attr("viewBox", "0 0 " + largura + " " + altura)

    //     let teste = mapa.toLowerCase();
    //     let sigla = teste + "-municípios";
    //     let json = "https://arte.estadao.com.br/politica/eleicoes/2018/maptse/data/topojson/estados/" + caminho + "-municipios.json"

    //     d3.json(json)
    //     .then (function(data) {
    //         const mapa = topojson.feature(data, data.objects[sigla]);
    //         const projection = d3.geoMercator().fitSize([largura, altura], mapa);
    //         path = d3.geoPath().projection(projection);
    //         svg.append("g")
    //         .attr ("class", "uva-mapa")
    //         .selectAll("path")
    //         .data(mapa.features)
    //         .join("path")
    //         .attr("d", path)
    //         .attr("class", "municipio")
    //         .attr("data-tse", function (d) { return d.properties.TSE; });
    //     });
    // });

    //     })
    //     svg = d3.select({id}).append("svg")
    //         .attr("width", 500)
    //         .attr("height", 500);
    //     g = svg.append("g");
    //     path = d3.geoPath();
    // });
    // function update() {
    // if (data) {
    //     const features = topojson.feature(data, data.objects[sigla]);
    //     const colorScale = d3.scaleQuantize()
    //         .domain([0, d3.max(features, d => d.properties.value)])
    //         .range(d3.schemeBlues[9]);
    //     g.selectAll("path")
    //         .data(features)
    //         .join("path")
    //         .attr("d", path)
    //         .attr("fill", d => colorScale(d.properties.value));
    //     }
    // }
    // $: update();


</script>
{#if typeof título !== undefined}
    <ChartHeading value={título} />
{/if}
{#if linhaFina !== undefined}
    <Text value="<strong>{linhaFina}</strong>" />
{/if}
<div id={id} class="uva-repositorio-mapa {tamanho}">
    <!-- <div id="map"></div> -->
</div>

<style>
.uva-repositorio-mapa {
    margin: calc(var(--margem-vertical) * 2) auto;
}

.uva-corpo {
   font-size: calc(var(--corpo-desktop) * 0.8);
   line-height: calc(var(--entrelinha-desktop) * 0.8);
}

.municipio {
    stroke: rgb(127 127 127);
    stroke-width: 1;
}

.uva-tooltip-mapa {
    position: absolute;
    opacity: 0;
    background-color: white;
    padding: 10px;
    width: auto;
    height: auto;
    border-radius: 2px;
    pointer-events: none;
    box-shadow: 0 0 5px #aaa;
}

.label, .legendTitle {
    font-family: var(--sans-serif);
    text-transform: uppercase;
    font-size: 0.65rem;
    letter-spacing: 0.017rem;
}
</style>