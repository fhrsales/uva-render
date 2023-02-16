<script>
    export let value;
</script>

<p class="uva-corpo">{@html value}</p>
<style>
:global(.uva-corpo) {
    font-family: var(--texto);
    font-weight: 500;
    font-size: var(--corpo-mobile);
    line-height: var(--entrelinha-mobile);
    text-align: left;
    width: var(--largura-celular);
    max-width: var(--P);
    margin: 0 auto 1.78125rem auto;
    color: var(--texto)
}

:global(.uva-corpo b) {
    font-weight: 800;
}

:global(.uva-corpo i) {
    font-weight: 500;
}

@media (min-width:740px) { /* desktop */
    :global(.uva-corpo) {
        font-size: var(--corpo-desktop);
        line-height: var(--entrelinha-desktop);
        margin-bottom: 1.9375rem;
    }
}
</style>