<script>
    import ImageContainer from '../images/ImageContainer_fixed.svelte';
    import { version } from "../../../scripts/version.js";
    export let value;
    const { anterior, fonte, próximo } = value;
</script>

<div class="uva-media-container P">
    <div class="previous"><a href={anterior}>‹ Anterior</a></div>
    <ImageContainer value={value} src="{fonte}?v=${version()}" />
    {#if !próximo}
        <div class="next" style="width: 60px"> </div>
        <!-- <div class="next" style="text-align: left; opacity: 0.3">Próxima<br>(em breve)</div> -->
    {/if}
    {#if próximo}
        <div class="next">
            <a href="{próximo}">Próxima ›</a>
        </div>
    {/if}
</div>

<style>
    .uva-media-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0 auto calc(var(--margem-vertical) * 1.5) auto;
        padding: calc(var(--margem-vertical) * 0.6) 0 calc(var(--margem-vertical) * 0.4) 0;
        border-top: var(--fio-solido-grosso);
        border-color: var(--cor-primaria);
        border-bottom: var(--fio-pontilhado);
        font: 500 calc(var(--corpo-mobile) * 0.7) var(--condensed);
        text-transform: uppercase;
        letter-spacing: 0.03rem;
    }
    
    .uva-media-container a:link, .uva-media-container a:visited {
        color: var(--cor-texto);
        text-decoration: none;
        font-family: inherit;
        font-weight: inherit;
    }
    
    .uva-media-container a:hover {
        color: var(--cor-primaria);
    }
</style>