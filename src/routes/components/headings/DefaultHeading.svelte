<script>
    export let value;
</script>

<h3>{@html value}</h3>

<style>
    h3 {
        width: var(--largura-celular);
        max-width: var(--P);
        margin: calc(var(--margem-vertical) * 2) auto calc(var(--margem-vertical) * .5) auto;
        font: 600 var(--corpo-h3-mobile)/var(--entrelinha-h3-mobile) var(--serif);
        color: var(--cor-texto);
    }

    @media (min-width:748px) {

        /* Desktop */
        h3 {
            font-size: var(--corpo-h3-desktop);
            line-height: var(--entrelinha-h3-desktop);
        }
    }
</style>