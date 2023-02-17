<script>
    import Image from '../images/larguraDesk_larguraMobile.svelte';
    export let value;
    const { anterior, editoria, fonte, próximo } = value;
</script>

<style>
    .uva-container-navigation {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0 auto calc(var(--margem-vertical) * 1.5) auto;
        padding: calc(var(--margem-vertical) * 0.6) 0 calc(var(--margem-vertical) * 0.4) 0;
        border-top: var(--fio-solido-fino);
        border-bottom: var(--fio-solido-fino);
        font: 500 calc(var(--corpo-mobile) * 0.7) var(--condensed);
        text-transform: uppercase;
        letter-spacing: 0.03rem;
    }
    
    .uva-container-navigation a:link, .uva-container-navigation a:visited {
        color: var(--cor-texto);
        text-decoration: none;
        font-family: inherit;
        font-weight: inherit;
    }
    
    .uva-container-navigation a:hover {
        color: var(--cor-c2-primaria);
    }
</style>

<div 
    class="uva-container-navigation P"
    style="{editoria === "hardnews" ? "border-color: var(--cor-secundaria" : "" || 
            editoria === "economia" ? "border-color: var(--cor-EeN-secundaria" : "" ||
            editoria === "cultura" ? "border-color: var(--cor-c2-secundaria" : ""}"
>
    <div class="previous"><a href={anterior}>‹ Anterior</a></div>
    <Image value={value} src="https://arte.estadao.com.br/arc/images/{fonte}" />
    {#if typeof próximo === undefined}
        <div class="next" style="text-align: right; opacity: 0.4">Próxima<br>(em breve)</div>
    {/if}
    {#if typeof próximo !== undefined}
        <div class="next">
            <a href="{próximo}">Próxima ›</a>
        </div>
    {/if}
</div>