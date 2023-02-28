<script>
    import ImageContainer from '../images/ImageContainer_fixed.svelte';
    import { UvaPath } from "../../../scripts/store.js"
    let UvaPages = "";
    UvaPath.subscribe(value => {
		UvaPages = value;
	});
    export let value;
    const { fonte, link } = value;
</script>

<style>
    div {
        margin-bottom: calc(var(--margem-vertical) * 1)
    }
</style>

<div class="uva-media-container P">
    <a href={link}>
        <ImageContainer value={value} src="https://arte.estadao.com.br/public/pages/{UvaPages}/{fonte}" />
    </a>
</div>
