<script>
    export let {
        margem_capitular,
        texto,
        value
    } = [];

    import {
        onMount
    } from 'svelte';
    onMount(async function () {
        function marginCapitular (valor){
            if (margem_capitular === undefined) {
                valor = '0.13em 0.58em 0 0.4em';
            }
            let capitular = document.documentElement.style.setProperty('--margem-capitular', (valor));
            return capitular;
        }
        marginCapitular(value.margem_capitular);
    });
</script>

<p>{@html value.texto}</p>

<style>
    p {
        width: var(--largura-celular);
        max-width: var(--P);
        margin: 0 auto calc(var(--margem-vertical) * 0.5) auto;
        font: 500 var(--corpo-mobile) / var(--entrelinha-mobile) var(--texto);
        color: var(--texto);
        text-align: left;
    }

    p::first-letter {
        float: left;
        font-family: var(--condensed);
        font-weight: 500;
        font-size: 50px;
        line-height: 50px;
        color: var(--cor-fundo);
        margin: var(--margem-capitular);
    }

    p::before {
        position: absolute;
        content: '';
        width: 63px;
        height: 63px;
        margin: 0.1rem 0 0 0;
        border-radius: 100%;
        z-index: -1;
        transform: translate(-71px, 0);
        background-color: var(--cor-primaria);
    }

    @media (min-width:740px) {

        /* desktop */
        p {
            font-size: var(--corpo-desktop);
            line-height: var(--entrelinha-desktop);
            margin-bottom: calc(var(--margem-vertical) * 0.5);
        }
    }
</style>