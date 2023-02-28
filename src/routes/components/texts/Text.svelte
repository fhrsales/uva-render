<script>
    export let {
        assinatura,
        value,
        descProp
    } = [];
</script>

<p itemprop={descProp}>{@html value}
    {#if assinatura}
        • <span>{assinatura}</span>
    {/if}
</p>

<style>
    p {
        width: var(--largura-celular);
        max-width: var(--P);
        margin: 0 auto calc(var(--margem-vertical) * 0.5) auto;
        font: 500 var(--corpo-mobile) / var(--entrelinha-mobile) var(--texto);
        color: var(--texto);
        text-align: left;
    }

    p > span {
        font-family: var(--condensed);
        font-size: 70%;
        text-transform: uppercase;
        letter-spacing: 0.012rem;
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