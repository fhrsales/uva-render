<script>
    export let value;
</script>

<h3>{@html value}</h3>

<style>
h3 {
    font-family: var(--serif);
    font-weight: 600;
    font-size: var(--corpo-h3-mobile);
    line-height: var(--entrelinha-h3-mobile);
    width: var(--largura-celular);
    max-width: var(--P);
    margin: calc(var(--margem-vertical) * 1) auto calc(var(--margem-vertical) * .5) auto;
    color: var(--cor-texto);
}
</style>