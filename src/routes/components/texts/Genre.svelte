<script>
    export let value;
    export let { descrição, nome, tipo } = value;
</script>

<div class="P">
    <h4>{@html value.tipo}</h4>
    <p>{@html value.nome}</p>
    {#if descrição}
        <p>{@html value.descrição}</p>
    {/if}
</div>

<style>

    div {
        margin: calc(var(--margem-vertical) * 2) auto calc(var(--margem-vertical) * 2) auto;
        border-top: var(--fio-solido-grosso);
        border-color: var(--cor-primaria);
    }

    div::after {
        content: "";
        position: absolute;
        width: var(--filete);
        margin: 38px 0 0 0;
        border-bottom: var(--fio-pontilhado);
    }

    h4 {
        margin-top: calc(var(--margem-vertical) * 0.3);
        font: 600 calc(var(--corpo-mobile) * 0.9) var(--condensed);
        text-transform: uppercase;
        color: var(--cor-primaria);
    }

    h4::after {
        content: "";
        display: block;
        width: var(--filete);
        margin: 8px 0 calc(var(--margem-vertical) * -0.6) 0;
        border-bottom: var(--fio-solido-fino);
        border-color: var(--cor-primaria);
    }

    div > p:nth-child(2) {
        font: 600 calc(var(--corpo-mobile) * 0.9) var(--condensed);
        color: var(--cor-primaria);
    }

    div > p:nth-child(3) {
        margin: calc(var(--margem-vertical) * -0.7) auto calc(var(--margem-vertical) * -0.8) auto;
        font: 400 calc(var(--corpo-mobile) * 0.9) / calc(var(--entrelinha-mobile) * 0.9) var(--condensed);
        color: var(--cor-texto);
        text-align: left;
    }

    @media (min-width:748px) {
        /* Desktop */

         /* Desktop */
         h4 {
            font-size: calc(var(--corpo-desktop) * 0.9);
        }

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