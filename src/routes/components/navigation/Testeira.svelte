<script>
    import Image from '../images/larguraDesk_larguraMobile.svelte';
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

<div class="P">
    <a href={link}>
        <Image value={value} src="https://arte.estadao.com.br/public/pages/{UvaPages}/{fonte}" />
    </a>
</div>