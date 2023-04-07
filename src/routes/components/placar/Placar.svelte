<script>
    import { UvaPath } from "../../../scripts/store.js"
    import { version } from "../../../scripts/version.js";
    let UvaPages = '';
    UvaPath.subscribe(value => {
		UvaPages = value;
	});
    import { onMount } from 'svelte';
    import * as d3 from 'd3';
    import { csvParse } from 'd3-dsv';
    import Text from './../texts/Text.svelte';
    import Searchbox from './../search/Searchbox.svelte';
    import BarChart from './BarChart.svelte';
    import Select from './../buttons/Select.svelte';
    import DataTable from './DataTable.svelte';

    export let value;

    let data = [];
    let filteredData = [];
    let voteSummary = { data: {}, startPositions: {}};
    let totalVotes = 0;
    let searchTerm;
    let searchQuery = '';
    let selectedState = '';
    let uniqueStates = [];
    let selectedParty = '';
    let uniqueParties = [];

    function updateVoteSummary() {
        const categoriesOrder = ['A favor', 'A favor com ressalvas', 'Não foi encontrado', 'Não quis responder', 'Contra'];
        voteSummary = {
            data: data.reduce((acc, row) => {
                const vote = row['intenção de voto'];
                if (!acc[vote]) {
                    acc[vote] = 0;
                }
                acc[vote]++;
                return acc;
            }, {}),
            startPositions: {},
        };

        totalVotes = Object.values(voteSummary.data).reduce((a, b) => a + b, 0);
    }

    function updateFilteredVoteSummary() {
        voteSummary = {
            data: filteredData.reduce((acc, row) => {
                const vote = row['intenção de voto'];
                if (!acc[vote]) {
                    acc[vote] = 0;
                }
                acc[vote]++;
                return acc;
            }, {}),
            startPositions: {},
        };

        totalVotes = Object.values(voteSummary.data).reduce((a, b) => a + b, 0);
    }

    function aggregateDataByState() {
        const stateData = data.reduce((acc, row) => {
            const state = row.estado;
            const category = row['intenção de voto'];
            
            if (!acc[state]) {
                acc[state] = {};
            }
            
            if (!acc[state][category]) {
                acc[state][category] = 0;
            }
            
            acc[state][category]++;
            return acc;
        }, {});

        return Object.entries(stateData).map(([state, categories]) => {
            const maxCategory = Object.entries(categories).reduce((max, [category, count]) => {
                return count > max.count ? { category, count } : max;
            }, { category: '', count: 0 });

            return {
                state,
                category: maxCategory.category,
                totalVotes: maxCategory.count
            };
        });
    }

    let aggregatedDataByState = [];
    $: {
        aggregatedDataByState = aggregateDataByState();
    }

    function aggregateDataByParty() {
        const partyData = data.reduce((acc, row) => {
            const party = row.partido;
            const category = row['intenção de voto'];
            
            if (!acc[party]) {
                acc[party] = {};
            }
            
            if (!acc[party][category]) {
                acc[party][category] = 0;
            }
            
            acc[party][category]++;
            return acc;
        }, {});

        return Object.entries(partyData).map(([party, categories]) => {
            const maxCategory = Object.entries(categories).reduce((max, [category, count]) => {
                return count > max.count ? { category, count } : max;
            }, { category: '', count: 0 });

            return {
                party,
                category: maxCategory.category,
                totalVotes: maxCategory.count
            };
        });
    }

    let aggregatedDataByParty = [];
    $: {
        aggregatedDataByParty = aggregateDataByParty();
    }

    function bubbleChartStates() {
        const container = d3.select("#uva-container-bubble-chart-states");
        const containerWidth = container.node().getBoundingClientRect().width;
        const containerHeight = containerWidth;
        const svg = container.append("svg")
            .attr("viewBox", `0 0 ${containerWidth} ${containerHeight}`)
            .attr("class", "bubble")
            .style("width", "100%");

        const defs = svg.append("defs");
        const pattern = defs.append("pattern")
            .attr("id", "hash")
            .attr("width", 5)
            .attr("height", 8)
            .attr("patternUnits", "userSpaceOnUse")
            .attr("patternTransform", "rotate(45)");
        pattern.append("rect")
            .attr("width", 1)
            .attr("height", 8)
            .attr("transform", "translate(2,0)")
            .attr("fill", "#fff");
        pattern.append("rect")
            .attr("width", 10)
            .attr("height", 10)
            .attr("transform", "translate(1,0)")
            .attr("fill", "#007367");

        const color = d3.scaleOrdinal()
            .domain(["A favor", "A favor com ressalvas", "Não foi encontrado", "Não quis responder", "Contra"])
            .range(["#007367", "#007367", "#d5d5d5", "#838383", "#c20736"]);

        const bubble = d3.pack()
            .size([containerWidth, containerHeight])
            .padding(-2);

        const root = d3.hierarchy({ children: aggregatedDataByState })
            .sum((d) => d.totalVotes);

        bubble(root);

        const node = svg.selectAll(".node")
            .data(root.descendants())
            .join("g")
            .attr("class", (d) => d.children ? "node" : "leaf node")
            .attr("transform", (d) => `translate(${d.x},${d.y})`);

        node.filter((d) => !d.children)
            .append("circle")
            .attr("r", (d) => d.r)
            .style("fill", (d) => d.data.category === "A favor com ressalvas" ? "url(#hash)" : color(d.data.category))
            .style("stroke", 'white')
            .style("stroke-width", 3)
            .attr('class', (d) => d.data.category);
        node.append('text')
            .attr('dy', '.3em')
            .style('text-anchor', 'middle')
            .style('font-family', 'var(--condensed)')
            .style('font-weight', '500')
            .style('fill', (d) =>d.data.category === 'Não foi encontrado' ? '#838383' : 'white')
            .text((d) => d.data.state)
            .attr('class', 'state');
        node.filter((d) => d.data.totalVotes >= 6)
            .append('text')
            .attr('dy', '1.3em')
            .style('text-anchor', 'middle')
            .style('font-family', 'var(--condensed)')
            .style('font-weight', '700')
            .style('font-size', '20px')
            .style('fill', (d) =>d.data.category === 'Não foi encontrado' ? '#838383' : 'white')
            .text((d) => d.data.totalVotes)
            .attr('class', 'votes');
    }

    function bubbleChartParties() {
        const container = d3.select("#uva-container-bubble-chart-parties");
        const containerWidth = container.node().getBoundingClientRect().width;
        const containerHeight = containerWidth;
        const svg = container.append("svg")
            .attr("viewBox", `0 0 ${containerWidth} ${containerHeight}`)
            .attr("class", "bubble")
            .style("width", "100%")

        const defs = svg.append("defs");
        const pattern = defs.append("pattern")
            .attr("id", "hash")
            .attr("width", 5)
            .attr("height", 8)
            .attr("patternUnits", "userSpaceOnUse")
            .attr("patternTransform", "rotate(45)");
        pattern.append("rect")
            .attr("width", 1)
            .attr("height", 8)
            .attr("transform", "translate(2,0)")
            .attr("fill", "#fff");
        pattern.append("rect")
            .attr("width", 10)
            .attr("height", 10)
            .attr("transform", "translate(1,0)")
            .attr("fill", "#007367");

        const color = d3.scaleOrdinal()
            .domain(["A favor", "A favor com ressalvas", "Não foi encontrado", "Não quis responder", "Contra"])
            .range(["#007367", "#007367", "#d5d5d5", "#838383", "#c20736"]);

        const bubble = d3.pack()
            .size([containerWidth, containerHeight])
            .padding(-2);

        const root = d3.hierarchy({ children: aggregatedDataByParty })
            .sum((d) => d.totalVotes);

        bubble(root);

        const node = svg.selectAll(".node")
            .data(root.descendants())
            .join("g")
            .attr("class", (d) => d.children ? "node" : "leaf node")
            .attr("transform", (d) => `translate(${d.x},${d.y})`);

        node.filter((d) => !d.children)
            .append("circle")
            .attr("r", (d) => d.r)
            .style("fill", (d) => d.data.category === "A favor com ressalvas" ? "url(#hash)" : color(d.data.category))
            .style("stroke", 'white')
            .style("stroke-width", 3)
            .attr('class', (d) => d.data.category);
        node.append('text')
            .attr('dy', '.3em')
            .style('text-anchor', 'middle')
            .style('font-family', 'var(--condensed)')
            .style('font-weight', '500')
            .style('fill', (d) =>d.data.category === 'Não foi encontrado' ? '#838383' : 'white')
            .text((d) => d.data.party)
            .attr('class', 'state');
        node.filter((d) => d.data.totalVotes >= 6)
            .append('text')
            .attr('dy', '1.3em')
            .style('text-anchor', 'middle')
            .style('font-family', 'var(--condensed)')
            .style('font-weight', '700')
            .style('font-size', '20px')
            .style('fill', (d) =>d.data.category === 'Não foi encontrado' ? '#838383' : 'white')
            .text((d) => d.data.totalVotes)
            .attr('class', 'votes');
    }

    async function loadCSV() {
        const response = await fetch(`https://arte.estadao.com.br/public/pages/${UvaPages}/placar_camara.csv?v=${version()}`);
        const csvText = await response.text();
        data = csvParse(csvText, d3.autoType);

        uniqueStates = Array.from(new Set(data.map((row) => row.estado)));
        uniqueParties = Array.from(new Set(data.map((row) => row.partido)));
    }

    $: if (data.length > 0) {
        updateVoteSummary();
        aggregatedDataByState = aggregateDataByState();
        aggregatedDataByParty = aggregateDataByParty();
    }

    function normalizeString(str) {
        return str
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase();
    }

    function handleSearch(event) {
        searchQuery = normalizeString(event.target.value);
    }

    function handleStateChange(event) {
        selectedState = event.target.value;
    }

    function handlePartyChange(event) {
        selectedParty = event.target.value;
    }

    $: {
        filteredData = data.filter((row) => {
            const nameMatches = normalizeString(row.nome).includes(searchQuery);
            const stateMatches = selectedState === '' || row.estado === selectedState;
            const partyMatches = selectedParty === '' || row.partido === selectedParty;

            return nameMatches && stateMatches && partyMatches;
        });
        updateFilteredVoteSummary();
    }

    onMount(async () => {
        await loadCSV();
        await bubbleChartStates();
        await bubbleChartParties();
    });
</script>

<BarChart {voteSummary} {totalVotes} {filteredData} />

<div class='uva-container-selectors G'>
    <Searchbox tamanho='GG' placeholder='Buscar por nome...' on:input={handleSearch} bind:searchTerm />
    <Select label='Todos os estados' options={uniqueStates} value={selectedState} onChange={handleStateChange} />
    <Select label='Todos os partidos' options={uniqueParties} value={selectedParty} onChange={handlePartyChange} />
    <!-- <Select label='Todas as categorias' options={uniqueCategories} value={selectedCategory} onChange={handleStateCategory} /> -->
</div>

<DataTable {filteredData} />

<div class='uva-container-other-charts G'>
    <div id='uva-container-bubble-chart-states' class='GG'></div>
    <div id='uva-container-bubble-chart-parties' class='GG'></div>
</div>


<style>
    .uva-container-selectors {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        position: relative;
        top: calc(-1.8 * var(--margem-vertical));
        margin-bottom: calc(-0.65 * var(--margem-vertical));
        overflow-x: scroll;
        scrollbar-width: none;
    }

    ::-webkit-scrollbar {
        display: none;
    }

    .uva-container-other-charts {
        display: block;
        margin: calc(var(--margem-vertical) * 2) auto;
    }

    #uva-container-bubble-chart-states::before {
        content: 'Intenção de voto por estado';
        display: block;
        font: 700 calc(var(--corpo-mobile) * 0.8) / 1 var(--condensed);
        letter-spacing: 0.03rem;
        color: var(--cor-texto);
        text-align: center;
        text-transform: uppercase;
        margin-bottom: calc(var(--margem-vertical) / 2);
    }

    #uva-container-bubble-chart-parties::before {
        content: 'Intenção de voto por partido';
        display: block;
        font: 700 calc(var(--corpo-mobile) * 0.8) / 1 var(--condensed);
        letter-spacing: 0.03rem;
        color: var(--cor-texto);
        text-align: center;
        text-transform: uppercase;
        margin-bottom: calc(var(--margem-vertical) / 2);
    }

    #uva-container-bubble-chart-parties {
            margin-top: calc(var(--margem-vertical) * 2);
        }

    @media (min-width:740px) {
        /* desktop */
        .uva-container-other-charts {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
        }

        #uva-container-bubble-chart-parties {
            margin-top: 0;
        }
    }
</style>