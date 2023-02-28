<script>
    export let legenda;
    export let crédito;
    export let mostrarLegenda;
    export const tamanho = { property: "value" };
</script>

<style>
    :global(.uva-caption) {
        margin: calc(var(--margem-vertical) * 0.2) auto calc(var(--margem-vertical) * 1) auto;
        font: 500 calc(var(--corpo-mobile) * 0.7) var(--sans-serif);
        letter-spacing: 0.01rem;
    }

    :global(.uva-credits) {
        font: 400 calc(var(--corpo-mobile) * 0.55) var(--semicondensed);
        letter-spacing: 0.04rem;
        text-transform: uppercase;
        opacity: 0.8;
    }

    @media (min-width:748px) { /* Desktop */
        :global(.uva-caption) {
            font-size: calc(var(--corpo-desktop) * 0.7);
        }
        :global(.uva-credits) {
            font-size: calc(var(--corpo-desktop) * 0.55);
        }
    }
</style>

{#if mostrarLegenda === "sim"}
    <span class="uva-caption">{legenda}</span>
    <span class="uva-credits"> • {crédito}</span>
{:else}
    <span class="uva-credits">{crédito}</span>
{/if}