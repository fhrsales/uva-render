<script>
    import { onMount } from 'svelte';
    let dimensões = window.innerWidth;
    onMount(() => {
        window.addEventListener('resize', () => {
            dimensões = window.innerWidth;
        });
    });
    export let value;
    const { anterior, fonte, larguraDesk, larguraMobile, legenda, próximo } = value;
    let próximoDefinido = próximo !== undefined;
    let próximoIndefinido = próximo == undefined;
</script>
<div class="uva-repositorio-navegador P">
    <div>
        <div><a href={anterior}>‹ Anterior</a></div>
            <figure style={dimensões > 580 ? `width: ${larguraDesk}` : `width: ${larguraMobile}`}>
            <img class="uva-imagem" alt={legenda} src="https://arte.estadao.com.br/arc/images/{fonte}" width={larguraDesk}>
        </figure>
        {#if próximoIndefinido}
            <div style="text-align: right; opacity: 0.4">Próxima<br>(em breve)</div>
        {/if}
        {#if próximoDefinido}
            <div><a href="{próximo}">Próxima ›</a></div>
        {/if}
    </div>
</div>

<style>
.uva-repositorio-navegador {
    margin-bottom: calc(var(--margem-vertical) * 1.5);
    font-family: var(--condensed);
    text-transform: uppercase;
    letter-spacing: 0.017rem;
    border-top: var(--fio-solido-fino);
    border-bottom: var(--fio-solido-fino);
    border-color: var(--cor-c2-secundaria);
    padding-top: calc(var(--margem-vertical) / 3);
    padding-bottom: calc(var(--margem-vertical) / 3);;
}

.uva-repositorio-navegador > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.uva-repositorio-navegador a:link, .uva-repositorio-navegador a:visited {
    color: var(--cor-texto);
    text-decoration: none;
    font-family: inherit;
    font-weight: 500;
}

.uva-repositorio-navegador a:hover {
    color: var(--cor-c2-primaria);
}
</style>