<script>
    export let legenda;
    export let crédito;
    export let mostrarLegenda;
    export const tamanho = {
        property: "value"
    };
</script>

{#if mostrarLegenda === "sim"}
    <span class="uva-caption">{legenda}</span>
    <span class="uva-credits"> • {crédito}</span>
{:else}
    <span class="uva-credits">{crédito}</span>
{/if}

<style>
    :global(.uva-caption) {
        font: 500 calc(var(--corpo-mobile) * 0.8) var(--sans-serif);
        letter-spacing: 0.01rem;
    }

    :global(.uva-credits) {
        font: 400 calc(var(--corpo-mobile) * 0.5) var(--semicondensed);
        letter-spacing: 0.03rem;
        text-transform: uppercase;
        opacity: 0.8;
    }

    @media (min-width:748px) { /* Desktop */
        :global(.uva-caption) {
            font-size: calc(var(--corpo-desktop) * 0.8);
        }
        :global(.uva-credits) {
            font-size: calc(var(--corpo-desktop) * 0.5);
        }
    }
</style>