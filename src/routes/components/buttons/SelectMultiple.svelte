<script>
    import {
        createEventDispatcher,
        onDestroy
    } from "svelte";

    const dispatch = createEventDispatcher();
    export let label = "";
    export let options = [];
    export let count = 0;
    //export let scrollX = 0;

    let selectedOptions = [];
    let dropdownVisible = false;
    

    function toggleDropdown() {
        dropdownVisible = !dropdownVisible;
    }

    function selectOption(option) {
        if (selectedOptions.includes(option)) {
            selectedOptions = selectedOptions.filter((item) => item !== option);
        } else {
            selectedOptions = [...selectedOptions, option];
        }
        dispatch("change", {
            selectedOptions
        });
    }

    function handleClickOutside(event) {
        if (dropdownVisible && !event.target.closest(".uva-dropdown-container")) {
            dropdownVisible = false;
        }
    }



    onDestroy(() => {
        window.removeEventListener("click", handleClickOutside);
    });
</script>

<svelte:window on:click={handleClickOutside} />

<div class="uva-dropdown-container">
    <button on:click={toggleDropdown}>
        <span class="button-label">
            {label}
            {#if count > 0} ({count}) {/if}
        </span>
    </button>

    {#if dropdownVisible}
        <!-- <div class="uva-dropdown-menu" style="margin-left:{18 - scrollX}px;"> -->
        <div class="uva-dropdown-menu">
            {#each options as option, i}
                <div class="uva-dropdown-item" tabindex="-1" on:click={() => selectOption(option)} on:keydown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        selectOption(option);
                    }
                }}>
                    <input type="checkbox" id={'option_' + i} checked={selectedOptions.includes(option)} />
                    <label for={'option_' + i}>{option}</label>
                </div>
            {/each}
        </div>
    {/if}
</div>

<style>
    button {
        display: block;
        margin-left: 0.83rem;
        padding: 0px 45px 0px 22px;
        background-color: var(--cor-terciaria);
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 12 8' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.41 0.589996L6 5.17L10.59 0.589996L12 2L6 8L0 2L1.41 0.589996Z' fill='%23333'/%3E%3C/svg%3E%0A");
        background-size: 12px;
        background-repeat: no-repeat;
        background-position: right 20px center;
        font: 500 calc(var(--corpo-desktop) * 0.7) / 1.5 var(--condensed);
        color: var(--cor-texto);
        letter-spacing: 0.053rem;
        text-transform: uppercase;
        text-align: left;
        border-radius: 2.5rem;
        border: none;
        cursor: pointer;
        transition: all .35s ease-out;
        width: 158px;
        height: 41px;
    }

    button:active, button:hover {
        background-color: #dadada;
    }

    .uva-dropdown-menu {
        /* position: fixed;
        top: 255px; */
        background-color: white;
        border: var(--borda-fina);
        border-radius: 4px;
        padding: 8px;
        z-index: 1;
        height: 250px;
        width: 132px;
        margin-top: 4px;
        margin-left: 18px;
        overflow-y: scroll;
        box-shadow: var(--sombra-leve);
        box-sizing: content-box;
    }

    .uva-dropdown-item {
        cursor: pointer;
        display: flex;
        align-items: center;
        padding: 4px 8px;
        font: 500 calc(var(--corpo-desktop) * 0.7) / 1 var(--condensed);
        letter-spacing: 0.053rem;
    }

    .uva-dropdwon-item:hover {
        background-color: var(--cor-terciaria);
    }

    /* input[type="checkbox"] {
        margin-right: 8px;
        border: 1px solid white;
        cursor: pointer;
    } */

    input[type=checkbox] {
            position: relative;
            cursor: pointer;
            margin: 0px 12px 4px -5px;
            box-sizing: content-box;
    }
    input[type=checkbox]:before {
            content: "";
            display: block;
            position: absolute;
            width: 20px;
            height: 20px;
            top: -2px;
            left: -3px;
            background-color:var(--cor-terciaria);
            border-radius: 50%;
    }
    input[type=checkbox]:checked:before {
            content: "";
            display: block;
            position: absolute;
            width: 20px;
            height: 20px;
            top: -2px;
            left: -3px;
            background-color:var(--cor-texto);
            border-radius: 50%;
    }
    input[type=checkbox]:checked:after {
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
            top: 2px;
            left: 5px;
    }

    @media (min-width:740px) {
        .uva-dropdown-menu {
            top: 295px;
        }
    }
</style>