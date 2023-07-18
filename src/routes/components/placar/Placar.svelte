<script>
    import { onMount } from 'svelte';
    import { csvParse } from 'd3-dsv';
    //import { DateTime } from 'luxon';
    import { UvaPath } from "../../../scripts/store.js"
    import { version } from "../../../scripts/version.js";
    let UvaPages = '';
    UvaPath.subscribe(value => { UvaPages = value; });
    import * as d3 from 'd3';
    import ChartHeading from './../headings/ChartHeading.svelte';
    import Text from './../texts/Text.svelte';
    import Searchbox from './../search/Searchbox.svelte';
    //import Select from './../buttons/Select.svelte';
    import SelectMultiple from './../buttons/SelectMultiple.svelte';
    import DataTable from './DataTable.svelte';
    import BarChart from './../Charts/BarChart.svelte';
    import BubbleChart from './../Charts/BubbleChart.svelte';

    export let value;
    export let { títuloEstado, títuloPartido } = value;

    //***** BubbleChart customizations ***** //
    let color = d3.scaleOrdinal()
        .domain(["A favor", "A favor com ressalvas", "Não foi encontrado", "Não quis responder", "Não foi contactado", "Contra"])
        .range(["#007367", "#007367", "#d5d5d5", "#838383", "#f5f5f5", "#c20736"]);
    let fillFunction = (d) => (d.data.category === 'Não foi encontrado' ? '#838383' : (d.data.category === 'Não foi contactado' ? '#bfbfbf' : 'white'));
    // let filterFunctionLessThan = (d) => d.data.value <= 7 && d.data.category !== 'Não foi contactado';
    // let filterFunctionGreaterThan = (d) => d.data.value >= 7 && d.data.category !== 'Não foi contactado';
    export function createPattern(svg) {
        const defs = svg.append('defs');
        const pattern = defs.append('pattern')
            .attr('id', 'hash')
            .attr('width', 5)
            .attr('height', 8)
            .attr('patternUnits', 'userSpaceOnUse')
            .attr('patternTransform', 'rotate(45)');
        pattern.append('rect')
            .attr('width', 1)
            .attr('height', 8)
            .attr('transform', 'translate(2,0)')
            .attr('fill', '#fff');
        pattern.append('rect')
            .attr('width', 10)
            .attr('height', 10)
            .attr('transform', 'translate(1,0)')
            .attr('fill', '#007367');
        return pattern;
    }

    //********** //

    let placar;
    let seletores;
    let tabela;
    let gráficoEstado;
    let gráficoPartido;
    let data = [];
    let filteredData = [];
    let voteSummary = { data: {}, startPositions: {}};
    let totalVotes = 0;
    let selectedStatesCount = 0;
    let selectedPartiesCount = 0;
    //let scrollX = 0;
    let searchTerm;
    let formattedTime = '';
    let searchQuery = '';
    let selectedState = '';
    let selectedParty = '';
    //let stateOptions;
    let uniqueStates = [];
    let uniqueParties = [];
    let aggregatedDataByState = [];
    let aggregatedDataByParty = [];

    $: { 
        aggregatedDataByState = aggregateDataByState();
        aggregatedDataByParty = aggregateDataByParty();

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

    // function handleStateChange(event) {
    //     selectedState = event.target.value;
    // }

    // function handlePartyChange(event) {
    //     selectedParty = event.target.value;
    // }

    function handleStateChangeMultiple(event) {
        const selectedStates = event.detail.selectedOptions;
        selectedStatesCount = selectedStates.length;

        if (selectedStates.length === 0) {
        filteredData = data; // Listar todos os estados se nenhum estiver selecionado
        } else {
        filteredData = data.filter((item) => selectedStates.includes(item.estado));
        }

        // Atualização do resumo do voto filtrado
        updateFilteredVoteSummary();
    }

    function handlePartyChangeMultiple(event) {
        const selectedParties = event.detail.selectedOptions;
        selectedPartiesCount = selectedParties.length;

        if (selectedParties.length === 0) {
            filteredData = data; // Listar todos os estados se nenhum estiver selecionado
        } else {
            filteredData = data.filter((item) => selectedParties.includes(item.partido));
        }

        // Atualização do resumo do voto filtrado
        updateFilteredVoteSummary();
    }

    // function handleScroll(event) {
    //     scrollX = event.target.scrollLeft;
    // }

    async function loadCSV() {
        //const response = await fetch(`https://arte.estadao.com.br/public/pages/${UvaPages}/placar_camara.csv?v=${version()}`);
        const response = await fetch(`https://arte.estadao.com.br/public/pages/${UvaPages}/placar.csv?v=${version()}`);
        const csvText = await response.text();
        data = csvParse(csvText, d3.autoType);

        uniqueStates = Array.from(new Set(data.map((row) => row.estado)));
        uniqueParties = Array.from(new Set(data.map((row) => row.partido)));

        // get last modified date
        const lastModifiedHeader = response.headers.get('last-modified');
        const dia = new Date(lastModifiedHeader).toLocaleString('pt-BR', {timeZone: 'America/Sao_Paulo', dateStyle: 'short'});
        const hora = new Date(lastModifiedHeader).toLocaleString('pt-BR', {timeZone: 'America/Sao_Paulo', timeStyle: 'short'});
            formattedTime = `Atualizado em ${dia}, às ${hora}`;
    }

    onMount(async () => {
        await loadCSV();
    });
</script>

{#if value.placar === 'sim'}
    <BarChart {voteSummary} {totalVotes} {filteredData} />
    <Text value={formattedTime} />
{/if}

{#if value.seletores === 'sim'}
    <!-- <div class='uva-container-selectors G' on:scroll={handleScroll}> -->
    <div class='uva-container-selectors G'>

        <Searchbox 
            classe='uva-search-deputy'
            tamanho='GG'
            placeholder='Buscar por nome...' 
            on:input={handleSearch} 
            bind:searchTerm />

        <!-- <Select 
            label='Todos os estados' 
            options={uniqueStates} 
            value={selectedState} 
            onChange={handleStateChange} /> 
        
            <Select 
            label='Todos os partidos' 
            options={uniqueParties} 
            value={selectedParty} 
            onChange={handlePartyChange} />
        -->

        <SelectMultiple 
            label="Partidos" 
            options={uniqueParties} 
            on:change={handlePartyChangeMultiple} 
            count={selectedPartiesCount} />

        <SelectMultiple
            label="Estados" 
            options={uniqueStates} 
            on:change={handleStateChangeMultiple} 
            count={selectedStatesCount} />
    </div>
{/if}

{#if value.tabela === 'sim'}
    <DataTable {filteredData} />
{/if}

{#if value.gráficoPartido === 'sim'}
    {#if aggregatedDataByParty.length > 0}
        {#if value.títuloPartido}
            <ChartHeading value={value.títuloPartido} />
        {/if}
        <BubbleChart 
            id='intencao-por-partido' 
            classe='P' 
            data={aggregatedDataByParty} 
            color={color} 
            createPatternFunction={createPattern}
            fillFunction={fillFunction}
            order={['A favor', 'A favor com ressalvas', 'Não foi encontrado', 'Não quis responder', 'Contra']} />
    {/if}
{/if}

{#if value.gráficoEstado === 'sim'}
    {#if aggregatedDataByState.length > 0}
        {#if value.títuloEstado}
            <ChartHeading value={títuloEstado} />
        {/if}
        <BubbleChart 
            id='intencao-por-estado' 
            classe='P' 
            data={aggregatedDataByState} 
            color={color} 
            createPatternFunction={createPattern}
            fillFunction={fillFunction}
            order={['A favor', 'A favor com ressalvas', 'Não foi encontrado', 'Não quis responder', 'Contra']} />
    {/if}
{/if}

<style>
    .uva-container-selectors {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
        /* margin-top: calc(-1.8 * var(--margem-vertical));
        margin-bottom: calc(-0.4 * var(--margem-vertical)); */
        margin-top: calc(var(--margem-vertical) * 1);
        margin-bottom: calc(var(--margem-vertical) * 1);
        padding-bottom: 20px;
        margin-left: 1.1rem;
        width:calc(100% - 1rem);
        overflow-x: scroll;
        scrollbar-width: none;
        position: sticky;
        top: 205px;
        /* left: 50%;
        transform: translateX(-50%); */
        /* overflow: inherit; */
        z-index:12;
        /* background-color: var(--cor-fundo); */
    }

    ::-webkit-scrollbar {
        display: none;
    }

    :global(.uva-search-deputy) {
		display: flex;
		width: -webkit-fill-available;
        min-width: 65vw;
		/* margin: calc(var(--margem-vertical) * 2) 0; */
		padding: 0px;
		font: 500 normal var(--corpo-mobile) / var(--entrelinha-mobile) var(--texto);
		text-indent: 35px;
		background: transparent url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='black' class='bi bi-search' viewBox='0 0 16 16'%3E%3Cpath d='M11.3,9.2C11.7,8.4,12,7.5,12,6.5C12,3.5,9.5,1,6.5,1S1,3.5,1,6.5S3.5,12,6.5,12c1,0,1.9-0.3,2.7-0.7l3.3,3.3c0.3,0.3,0.7,0.4,1.1,0.4s0.8-0.1,1.1-0.4c0.6-0.6,0.6-1.5,0-2.1L11.3,9.2zM6.5,10.3c-2.1,0-3.8-1.7-3.8-3.8c0-2.1,1.7-3.8,3.8-3.8c2.1,0,3.8,1.7,3.8,3.8C10.3,8.6,8.6,10.3,6.5,10.3z'%3E%3C/path%3E%3C/svg%3E") no-repeat 10px center;
        background-color: var(--cor-fundo);
        color: var(--cor-texto);
        border: none;
		border-bottom: 1px solid #6C6C6C;
		border-radius: 0;
		outline: none;
        height: 40.5px;
        margin-inline-end: -4px;
	}

    @media (min-width:740px) {
        .uva-container-selectors {
            max-width:1014px;
            margin-left: auto;
            margin-right: auto;
            top: 231px;
        }

        :global(.uva-search-deputy) {
            min-width: inherit;
            font-size: var(--corpo-desktop);
            line-height: var(--entrelinha-desktop);
        }
    }
</style>