<script>
    import { onMount } from 'svelte';
    import { csvParse } from 'd3-dsv';
    import { DateTime } from 'luxon';
    import { UvaPath } from "../../../scripts/store.js"
    import { version } from "../../../scripts/version.js";
    let UvaPages = '';
    UvaPath.subscribe(value => { UvaPages = value; });
    import * as d3 from 'd3';
    import ChartHeading from './../headings/ChartHeading.svelte';
    import Text from './../texts/Text.svelte';
    import Searchbox from './../search/Searchbox.svelte';
    import Select from './../buttons/Select.svelte';
    import DataTable from './DataTable.svelte';
    import BarChart from './../Charts/BarChart.svelte';
    import BubbleChart from './../Charts/BubbleChart.svelte';

    export let value;
    export let { títuloEstado, textoEstado, títuloPartido, textoPartido} = value;

    //***** Customizações do BubbleChart ***** //
    let color = d3.scaleOrdinal()
        .domain(["A favor", "A favor com ressalvas", "Não foi encontrado", "Não quis responder", "Não foi contactado", "Contra"])
        .range(["#007367", "#007367", "#d5d5d5", "#838383", "#f5f5f5", "#c20736"]);
    let fillFunction = (d) => (d.data.category === 'Não foi encontrado' ? '#838383' : (d.data.category === 'Não foi contactado' ? '#bfbfbf' : 'white'));
    let filterFunctionLessThan = (d) => d.data.value <= 7 && d.data.category !== 'Não foi contactado';
    let filterFunctionGreaterThan = (d) => d.data.value >= 7 && d.data.category !== 'Não foi contactado';

    //********** //

    let data = [];
    let filteredData = [];
    let voteSummary = { data: {}, startPositions: {}};
    let totalVotes = 0;
    let formattedTime = '';
    let searchTerm;
    let searchQuery = '';
    let selectedState = '';
    let uniqueStates = [];
    let selectedParty = '';
    let uniqueParties = [];
    let aggregatedDataByState = [];
    let aggregatedDataByParty = [];

    $: { 
        aggregatedDataByState = aggregateDataByState();
    }
    $: { 
        aggregatedDataByParty = aggregateDataByParty(); 
    }
    $: if (data.length > 0) {
        updateVoteSummary();
        aggregatedDataByState = aggregateDataByState();
        aggregatedDataByParty = aggregateDataByParty();
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
                name: state,
                category: maxCategory.category,
                value: maxCategory.count
            };
        });
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
                name: party,
                category: maxCategory.category,
                value: maxCategory.count
            };
        });
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

    async function loadCSV() {
        //const response = await fetch(`https://arte.estadao.com.br/public/pages/${UvaPages}/placar_camara.csv?v=${version()}`);
        const response = await fetch(`https://arte.estadao.com.br/public/pages/${UvaPages}/placar.csv?v=${version()}`);
        const csvText = await response.text();
        data = csvParse(csvText, d3.autoType);

        uniqueStates = Array.from(new Set(data.map((row) => row.estado)));
        uniqueParties = Array.from(new Set(data.map((row) => row.partido)));

        // pega a data de atualização do arquivo
        const lastModifiedHeader = response.headers.get('last-modified');
        const dia = new Date(lastModifiedHeader).toLocaleString('pt-BR', {timeZone: 'America/Sao_Paulo', dateStyle: 'short'});
        const hora = new Date(lastModifiedHeader).toLocaleString('pt-BR', {timeZone: 'America/Sao_Paulo', timeStyle: 'short'});
            formattedTime = `Atualizado em ${dia}, às ${hora}.`;
    }

    onMount(async () => {
        await loadCSV();
        // await bubbleChartStates();
        // await bubbleChartParties();
    });
</script>

<Text value={formattedTime} />
<BarChart {voteSummary} {totalVotes} {filteredData} />

<div class='uva-container-selectors G'>
    <Searchbox 
        tamanho='GG'
        placeholder='Buscar por nome...' 
        on:input={handleSearch} bind:searchTerm />
    <Select 
        label='Todos os estados' 
        options={uniqueStates} 
        value={selectedState} 
        onChange={handleStateChange} />
    <Select 
        label='Todos os partidos' 
        options={uniqueParties} 
        value={selectedParty} 
        onChange={handlePartyChange} />
    <!-- <Select 
            label='Todas as categorias' 
            options={uniqueCategories} 
            value={selectedCategory} 
            onChange={handleStateCategory} /> -->
</div>

<DataTable {filteredData} />

{#if aggregatedDataByState.length > 0}
    <ChartHeading value={títuloEstado} />
    <Text value={textoEstado} />
    <BubbleChart 
        id='estado' 
        classe='P' 
        data={aggregatedDataByState} 
        color={color} 
        fillFunction={fillFunction} 
        filterFunctionLessThan={filterFunctionLessThan}
        filterFunctionGreaterThan={filterFunctionGreaterThan} />
{/if}

{#if aggregatedDataByParty.length > 0}
<ChartHeading value={títuloPartido} />
<Text value={textoPartido} />
    <BubbleChart 
        id='partido' 
        classe='P' 
        data={aggregatedDataByParty} 
        color={color} 
        fillFunction={fillFunction} 
        filterFunctionLessThan={filterFunctionLessThan}
        filterFunctionGreaterThan={filterFunctionGreaterThan} />
{/if}

<style>
    .uva-container-selectors {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        position: relative;
        top: calc(-1.8 * var(--margem-vertical));
        margin-bottom: calc(-2.3 * var(--margem-vertical));
        margin-left: 1rem;
        width:calc(100% - 1rem);
        overflow-x: scroll;
        scrollbar-width: none;
    }

    @media (min-width:1024px) {
        .uva-container-selectors {
            max-width:1024px;
            margin-left: auto;
            margin-right: auto;
        }
    }

    ::-webkit-scrollbar {
        display: none;
    }
</style>