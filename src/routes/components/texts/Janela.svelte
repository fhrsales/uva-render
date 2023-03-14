<script>
    export let value;
    export let { destaque, texto } = value;
</script>

<div class="P">
    <p class="P">{@html value.destaque}</p>
    <p class="P">{@html value.texto}</p>
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
        font: 700 calc(var(--corpo-mobile) * 1) / calc(var(--entrelinha-mobile) * 0.9) var(--semicondensed);
        color: var(--cor-texto);
    }

    div > p:nth-child(2) {
        margin: 0 auto calc(var(--margem-vertical) * 1.2) auto;
        font: 600 calc(var(--corpo-mobile) * 1.2) / calc(var(--entrelinha-mobile) * 1) var(--semicondensed);
        color: var(--cor-secundaria);
    }

    @media (min-width:748px) {
        /* Desktop */
        div > p:nth-child(1) {
            font-size: calc(var(--corpo-desktop) * 0.9);
            line-height: calc(var(--entrelinha-desktop) * 0.9);
        }

        div > p:nth-child(2) {
            font-size: calc(var(--corpo-desktop) * 1.2);
            line-height: calc(var(--entrelinha-desktop) * 1);
        }
    }
</style>