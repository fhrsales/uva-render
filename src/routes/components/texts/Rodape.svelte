<script>
    export let value;
</script>

<p class='footNotes'>{@html value}</p>

<style>
    .footNotes::before {
        content: "";
        position: absolute;
        width: var(--filete);
        margin: -11px 0 0 0;
        border-top: var(--fio-solido-fino);
    }
    .footNotes {
        width: var(--largura-celular);
        max-width: var(--P);
        margin: calc(var(--margem-vertical) * 2) auto calc(var(--margem-vertical) * 2) auto;
        font: 500 calc(var(--corpo-mobile) * 0.7) / calc(var(--entrelinha-mobile) * 0.7) var(--condensed);
        letter-spacing: 0.03rem;
        text-transform: uppercase;
        color: var(--texto);
        text-align: left;
    }

    @media (min-width:740px) {
        /* desktop */
        .footNotes {
            font-size: calc(var(--corpo-desktop) * 0.65);
            line-height: calc(var(--entrelinha-desktop) * 0.65);
        }
    }
</style>