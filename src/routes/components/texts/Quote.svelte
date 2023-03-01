<script>
    export let value;
    export let { descrição, nome, texto } = value;
</script>

<div class="P">
    <p class="P">“{@html value.texto}”</p>
    <p class="P">{@html value.nome}</p>
    {#if descrição}
        <p class="P">{@html value.descrição}</p>
    {/if}
</div>

<style>

    div::before {
        content: "";
        position: absolute;
        width: var(--filete);
        margin: -11px 0 0 0;
        border-top: var(--fio-pontilhado);
    }

    div::after {
        content: "";
        position: absolute;
        width: var(--filete);
        margin: -11px 0 0 0;
        border-bottom: var(--fio-pontilhado);
    }

    div {
        padding: calc(var(--margem-vertical) * 1) 0;
    }

    div > p:nth-child(1) {
        margin: calc(var(--margem-vertical) * 0.5) auto 0 auto;
        font: 800 calc(var(--corpo-mobile) * 1.1) / calc(var(--entrelinha-mobile) * 0.9) var(--texto);
        font-style: italic;
        color: var(--cor-secundaria);
        text-align: left;
    }

    div > p:nth-child(2) {
        margin: calc(var(--margem-vertical) * 0.2) auto 0 auto;
        font: 800 calc(var(--corpo-mobile) * 1) / calc(var(--entrelinha-mobile) * 1) var(--texto);
        font-style: italic;
        color: var(--cor-texto);
        text-align: left;
    }

    div > p:nth-child(3) {
        margin: 0 auto calc(var(--margem-vertical) * 1) auto;
        font: 400 calc(var(--corpo-mobile) * 0.9) / calc(var(--entrelinha-mobile) * 0.9) var(--condensed);
        color: var(--cor-texto);
        text-align: left;
    }

    @media (min-width:748px) {
        /* Desktop */
        div > p:nth-child(1) {
            font-size: calc(var(--corpo-desktop) * 1.1);
            line-height: calc(var(--entrelinha-desktop) * 0.9);
        }

        div > p:nth-child(2) {
            font-size: calc(var(--corpo-desktop) * 1);
            line-height: calc(var(--entrelinha-desktop) * 1);
        }

        div > p:nth-child(3) {
            font-size: calc(var(--corpo-desktop) * 0.9);
            line-height: calc(var(--entrelinha-desktop) * 0.9);
        }
    }
</style>