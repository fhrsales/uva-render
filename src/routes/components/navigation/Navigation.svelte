<script>
    import ImageContainer from '../images/ImageContainer_fixed.svelte';
    import { version } from "../../../scripts/version.js";
    export let value;
    const { anterior, fonte, próximo } = value;
</script>

<div class="uva-media-container P">
    <div class="previous">
        <a href={anterior.replace(/<a href="(.*)">(.*)<\/a>/, '$1')}>
            <div class='uva-icon-arrow-navigation'>
                <svg width="11" height="11" viewBox="0 0 8 12"><path d="M6.60156 11.2002L1.40156 6.0002L6.60156 0.800197"></path></svg>
            </div>
        </a>
        {@html anterior}
    </div>
    <ImageContainer value={value} src="{fonte}?v=${version()}" />
    {#if !próximo}
        <div class="next" style="width: 60px"> </div>
    {/if}
    {#if próximo}
        <div class="next">
            {@html próximo} 
            <a href={próximo.replace(/<a href="(.*)">(.*)<\/a>/, '$1')}>
                <div class='uva-icon-arrow-navigation'>
                    <svg width="11" height="11" viewBox="0 0 8 12" style="transform:scaleX(-1)"><path d="M6.60156 11.2002L1.40156 6.0002L6.60156 0.800197"></path></svg>
                </div>
            </a>
            <!-- {@html próximo} › <div class='uva-icon-arrow-navigation'><svg width="10" height="12" viewBox="0 0 10 12" style="transform:scaleX(-1)"><path d="M6.60156 11.2002L1.40156 6.0002L6.60156 0.800197"></path></svg></div> -->
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

    .previous, .next {
        color: var(--cor-primaria);
        text-decoration: none;
        font-family: inherit;
        font-weight: inherit;
    }

    .uva-icon-arrow-navigation {
        border-radius: 50%;
        background-color: var(--cor-fundo);
        width: 17px;
        height: 17px;
        display: inline-block;
        border: 1.5px solid var(--cor-primaria);
        display: inline-flex;
        webkit-box-align: center;
        align-items: center;
        cursor: pointer;
        position: relative;
        top: -1px;
        margin: 0 0.25rem;
        transition: transform 0.2s ease-in-out;
        box-sizing: content-box;
    }

    .uva-icon-arrow-navigation:hover {

        transform: scale(1.2);
    }

    .uva-icon-arrow-navigation > svg {
        fill: none;
        stroke: var(--cor-primaria);
        stroke-width: 1.8px;
        margin: 0 auto;
    }
</style>