<script>
    export let value;
</script>

<p>{@html value}</p>
<style>
:global(.uva-body), p {
    font-family: var(--texto);
    font-weight: 500;
    font-size: var(--corpo-mobile);
    line-height: var(--entrelinha-mobile);
    text-align: left;
    width: var(--largura-celular);
    max-width: var(--P);
    margin: 0 auto calc(var(--margem-vertical) * 0.5) auto;
    color: var(--texto)
}

:global(.uva-body b) {
    font-weight: 800;
}

:global(.uva-body i) {
    font-weight: 500;
}

@media (min-width:740px) { /* desktop */
    :global(.uva-body), p {
        font-size: var(--corpo-desktop);
        line-height: var(--entrelinha-desktop);
        margin-bottom: calc(var(--margem-vertical) * 0.5);
    }
}
</style>