<script>
	import LeiaMais from './LeiaMais.svelte';
    export let value;
    const {
        link
    } = value;
</script>

<div class="P">
    <p class="leiaMais">Leia mais:</p>
    <h3>• {@html link}</h3>
</div>

<style>
    div::before {
        content: "";
        position: absolute;
        width: var(--filete);
        margin: -11px 0 0 0;
        border-top: var(--fio-solido-grosso);
    }

    div {
        margin: calc(var(--margem-vertical) * 1) auto;
    }

    div::after, .leiaMais::after {
        content: "";
        display: block;
        width: var(--filete);
        margin: 14px 0 calc(var(--margem-vertical) * 0.5) 0;
        border-bottom: var(--fio-solido-fino);
    }

    .leiaMais {
        margin: 0 0 0.4rem 0;
        font: 600 var(--corpo-mobile) / var(--entrelinha-mobile) var(--condensed);
        letter-spacing: 0.02rem;
        color: var(--cor-texto);
        text-align: left;
    }

    h3 {
        margin: 0 0 calc(var(--margem-vertical) * 0.5) 0;
        font: 800 var(--corpo-mobile) / var(--entrelinha-mobile) var(--texto);
        color: var(--cor-primaria);
        text-align: left;
    }

    @media (min-width:740px) {
        /* desktop */
        .leiaMais {
            font-size: var(--corpo-desktop);
            line-height: var(--entrelinha-desktop);
        }

        h3 {
            font-size: var(--corpo-desktop);
            line-height: var(--entrelinha-desktop);
        }
    }
</style>