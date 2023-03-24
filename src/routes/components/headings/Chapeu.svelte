<script>
    export let value;
</script>

<h2>{@html value}</h2>

<style>
    h2 {
        width: var(--largura-celular);
        max-width: var(--P);
        margin: calc(var(--margem-vertical) * 0.5) auto calc(var(--margem-vertical) * -1.5) auto;
        font: 600 var(--corpo-mobile) / var(--entrelinha-mobile) var(--condensed);
        letter-spacing: 0.02rem;
        color: var(--cor-primaria);
        text-align: left;
    }

    @media (min-width:740px) {
        /* desktop */
        h2 {
            font-size: var(--corpo-desktop);
            line-height: var(--entrelinha-desktop);
        }
    }
</style>