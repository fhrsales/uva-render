<script>
    export let value;
    export const editoria = {
        property: "value"
    };
</script>

<h3 style="{editoria === " hardnews" ? "color: var(--cor-secundaria" : "" || editoria==="economia"
    ? "color: var(--cor-EeN-secundaria" : "" || editoria==="cultura" ? "color: var(--cor-c2-secundaria" : "" }">
    {@html value}
</h3>

<style>
    h3::before {
        content: "";
        position: absolute;
        width: var(--filete);
        margin: -11px 0 0 0;
        border-top: var(--fio-solido-grosso);
    }

    h3 {
        width: var(--largura-celular);
        max-width: var(--P);
        margin: calc(var(--margem-vertical) * 2) auto 0 auto;
        font: 600 calc(var(--corpo-mobile) * 0.9) var(--condensed);
        text-transform: uppercase;
        letter-spacing: 0.03rem;
        color: var(--cor-texto);
    }

    h3::after {
        content: "";
        display: block;
        width: var(--filete);
        margin: 8px 0 calc(var(--margem-vertical) * 0.5) 0;
        border-bottom: var(--fio-solido-fino);
    }

    @media (min-width:748px) {

        /* Desktop */
        h3 {
            font-size: calc(var(--corpo-desktop) * 0.9);
        }
    }
</style>