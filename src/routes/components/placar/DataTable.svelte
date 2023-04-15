<script>
    import Button from './../buttons/Button.svelte';
    export let filteredData = [];

    let showAll = false;
    let sortedColumn = 'nome';
    let sortAscending = false;
    let showButton = true;

    function handleClick() {
        showAll = !showAll;
        showButton = false;
    }

    function sortData(col) {
        if (sortedColumn === col) {
            sortAscending = !sortAscending;
        } else {
            sortedColumn = col; 
            sortAscending = true;
        }

        filteredData = [...filteredData].sort((a, b) => {
            if (a[col] < b[col]) {
                return sortAscending ? -1 : 1;
            } else if (a[col] > b[col]) {
                return sortAscending ? 1 : -1;
            } else {
                return 0;
            }
        });
    }
</script>

{#if filteredData.length > 0}
    <div class='uva-container-deputies-table P'>
        <table>
            <thead>
                <tr>
                    <th colspan='2' data-order='intenção de voto' on:click={() => sortData('intenção de voto')}>
                        Voto {sortedColumn === 'intenção de voto' ? (sortAscending ? '▴' : '▾') : ''}
                    </th>
                    
                    <th data-order='nome' on:click={() => sortData('nome')}>
                        Nome {sortedColumn === 'nome' ? (sortAscending ? '▴' : '▾') : ''}
                    </th>
                    <th data-order='partido' on:click={() => sortData('partido')}>
                        Partido {sortedColumn === 'partido' ? (sortAscending ? '▴' : '▾') : ''}
                    </th>
                    <th data-order='estado' on:click={() => sortData('estado')}>
                        UF {sortedColumn === 'estado' ? (sortAscending ? '▴' : '▾') : ''}
                    </th>
                    <th>&nbsp;</th>
                </tr>
            </thead>
            <tbody>
                {#if filteredData && filteredData.length > 0}
                    {#each filteredData.slice(0, showAll ? undefined : 7) as row}
                        <tr>


                            <td class='uva-deputy-vote'>
                                {#if row['intenção de voto'] === 'A favor'}
                                    <img class='uva-deputy-vote-icon-afavor' loading='lazy' src='https://arte.estadao.com.br/arc/images/placar/placar-afavor.svg' alt='A favor' width='20px' height='20px'/>
                                {:else if row['intenção de voto'] === 'A favor com ressalvas'}
                                <img class='uva-deputy-vote-icon-afavor-com-ressalvas' loading='lazy' src='https://arte.estadao.com.br/arc/images/placar/placar-afavor-com-ressalvas.svg' alt='A favor com ressalvas' width='20px' height='20px'/>
                                {:else if row['intenção de voto'] === 'Não foi encontrado'}
                                    <img class='uva-deputy-vote-icon-nao-foi-encontrado' loading='lazy' src='https://arte.estadao.com.br/arc/images/placar/placar-nao-foi-encontrado.svg' alt='Não foi encontrado' width='20px' height='20px'/>
                                {:else if row['intenção de voto'] === 'Não quis responder'}
                                    <img class='uva-deputy-vote-icon-nao-quis-responder' loading='lazy' src='https://arte.estadao.com.br/arc/images/placar/placar-nao-quis-responder.svg' alt='Não quis responder' width='20px' height='20px'/>
                                {:else if row['intenção de voto'] === 'Contra'}
                                    <img class='uva-deputy-vote-icon-contra' loading='lazy' src='https://arte.estadao.com.br/arc/images/placar/placar-contra.svg' alt='Contra' width='20px' height='20px'/>
                                {/if}
                            </td>

                            <td class='uva-deputy-thumb'>
                                <div class="circle">
                                    <img loading='lazy' class="grayscale" src="https://arte.estadao.com.br/politica/2023/camara/img/{row.id}.jpg" alt="{row.nome}" width='50px' height='50px'>
                                    <div 
                                        class="circle-overlay" 
                                        class:afavor={row['intenção de voto'] === 'A favor'}
                                        class:afavor-com-ressalvas={row['intenção de voto'] === 'A favor com ressalvas'}
                                        class:nao-foi-encontrado={row['intenção de voto'] === 'Não foi encontrado'}
                                        class:nao-quis-responder={row['intenção de voto'] === 'Não quis responder'}
                                        class:contra={row['intenção de voto'] === 'Contra'}>
                                    </div>
                                </div>
                            </td>

                            <td class='uva-deputy-name'>{row.nome}</td>
                            <td class='uva-deputy-party'>{row.partido}</td>
                            <td class='uva-deputy-state'>{row.estado}</td>
                            <td class='uva-deputy-mail'>
                                <a href="mailto:{row.email}" target="_blank noreferer">
                                    <img class='uva-deputy-mail-icon' loading='lazy' src='https://arte.estadao.com.br/arc/images/placar/placar-mail.svg' alt='e-mail' width='20px' height='20px'>
                                </a>
                            </td>
                        </tr>
                    {/each}
                {/if}
            </tbody>
        </table>
    </div>

    {#if filteredData.length > 5}
        {#if showButton}
            <div class='uva-container-button-expand-deputies P'>
                <Button classe='uva-button-expand-deputies' {handleClick} value='Ver todos' />
            </div>
        {:else}
            <div style='margin-bottom: calc(var(--margem-vertical) * 1);'>&nbsp;</div>
        {/if}
    {:else}
        <div style='margin-bottom: calc(var(--margem-vertical) * 1);'>&nbsp;</div>
    {/if}
{/if}

<style>
    table {
        border-collapse: collapse;
        font-family: var(--semicondensed);
        font-size: calc(var(--corpo-mobile) * 0.7);
        width: 100%;
        margin: 0 auto calc(var(--margem-vertical) * 1);
    }

    thead {
        font: 700 calc(var(--corpo-mobile) * 0.58) var(--condensed);
        color: var(--cor-texto);
        letter-spacing: 0.03rem;
        text-transform: uppercase;
        text-align: left;
        cursor: pointer;
        vertical-align: top;
    }

    th {
        border: none;
        padding: 8px 3px;
    }

    td {
        border: none;
        border-bottom: 1px solid #e3e3e3;
        padding: 8px 3px;
        text-align: left;
    }

    .uva-deputy-thumb {
        width: 15%;
    }

    .uva-deputy-vote {
        width: 9%;
    }

    .circle-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #f5f5f5;
        mix-blend-mode: multiply;
    }

    .circle {
        position: relative;
        border-radius: 50%;
        overflow: hidden;
        width: 50px;
        height: 50px;
    }

    .circle img {
        display: inline;
        margin: 0 auto;
        height: 110%;
        width: auto;
        transform: translate(5px, 3px);
    }

    .circle-overlay.afavor, .circle-overlay.afavor-com-ressalvas {
        background-color: #007367;
        opacity: 0.25;
    }

    .circle-overlay.contra {
        background-color: #c20736;
        opacity: 0.25;
    }

    .grayscale {
        filter: grayscale(100%);
    }

    .uva-deputy-vote-icon-afavor, .uva-deputy-vote-icon-afavor-com-ressalvas {
        width: 20px;
    }

    .uva-deputy-vote-icon-nao-foi-encontrado {
        margin-top: 4px;
        width: 20px;
    }

    .uva-deputy-vote-icon-nao-quis-responder {
        margin-top: 7px;
        width: 20px;
    }

    .uva-deputy-vote-icon-contra {
        margin-top: 3px;
        width: 20px;
    }

    .uva-deputy-name {
        font-weight: 500;
        width: 33.5%;
        padding-bottom:12px;
    }

    .uva-deputy-party {
        font-size: calc(var(--corpo-mobile) * 0.55);
        width: 25%;
    }

    .uva-deputy-state{
        font-size: calc(var(--corpo-mobile) * 0.55);
        width: 12.5%;
    }

    .uva-deputy-mail {
        width: 5%;
    }

    .uva-deputy-mail-icon {
        margin-top: 4px;
        width: 17px;
    }

    .uva-container-button-expand-deputies {
        margin-bottom: calc(var(--margem-vertical) * 2);
        display: flex;
        justify-content: center;
    }

    :global(.uva-button-expand-deputies) {
        background-color: var(--cor-texto);
        color: var(--cor-fundo);
        transition: all .35s ease-out;
    }

    :global(.uva-button-expand-deputies):active,:global(.uva-button-expand-deputies):hover {
        background-color: #838383;
    }

    @media (min-width:740px) {
        /* desktop */
        table {
            font-size: calc(var(--corpo-desktop) * 0.7);
        }

        thead {
            font: 700 calc(var(--corpo-desktop) * 0.55) var(--condensed);
        }

        th, td {
            padding: 8px 7px;
        }

        tr:hover {
            background-color: var(--cor-terciaria);
        }

        .circle {
            width: 70px;
            height: 70px;
        }

        .uva-deputy-party, .uva-deputy-state{
            font-size: calc(var(--corpo-desktop) * 0.55);
        }

        .uva-deputy-thumb {
            width: 5%;
        }

        .uva-deputy-vote {
            width: 7%;
        }

        .uva-deputy-name {
            width: 50%;
        }

        .uva-deputy-party {
            width: 25%;
        }

        .uva-deputy-state {
            width: 7.5%;
        }

        .uva-deputy-mail {
            width: 6%;
            text-align: right;
        }
    }
</style>