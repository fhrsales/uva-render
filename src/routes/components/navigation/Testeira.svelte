<script>
	import { onMount } from 'svelte';
    import { UvaPath } from "../../../scripts/store.js"
    let UvaPages = "";
    UvaPath.subscribe(value => {
		UvaPages = value;
	});
    let dimensões = window.innerWidth;
    onMount(() => {
        window.addEventListener('resize', () => {
            dimensões = window.innerWidth;
        });
    });
    export let value;
    const { descrição, fonte, larguraDesk, larguraMobile, link } = value;
</script>

<div class="P">
    <a href={link}>
        <figure style={dimensões > 580 ? `width: ${larguraDesk}` : `width: ${larguraMobile}`}>
            <img 
                src="https://arte.estadao.com.br/public/pages/{UvaPages}/{fonte}" 
                alt={descrição} 
                style="border-radius: 0px"
            >
        </figure>
    </a>
</div>

<style>
div {
    margin-bottom: calc(var(--margem-vertical) * 1)
}
</style>