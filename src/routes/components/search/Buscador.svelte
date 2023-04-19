<script>
	import Searchbox from './Searchbox.svelte';
	import Heading from "../headings/DefaultHeading.svelte";
	import Text from "../texts/Text.svelte";
	import Image from "../images/ImageContainer_responsive.svelte";
	import Chart from "../charts/UvaContainer.svelte";
	export let searchTerm = "";
	export let value;
	const filteredContent = value.conteúdo.filter(item => item.type === "título" || item.type === "text" || item.type === "imagem" || item.type === "gráfico");
	const questions = filteredContent.filter(item => item.type === "título");
	const answers = filteredContent.filter(item => item.type === "text");

	let groupedContent = [];
	let currentGroup = {};
	for (let i = 0; i < filteredContent.length; i++) {
		if (filteredContent[i].type === "título") {
		currentGroup = {
			title: filteredContent[i],
			text: null,
			imagem: null,
			gráfico: null
		};
		groupedContent.push(currentGroup);
		} else if (filteredContent[i].type === "text") {
			currentGroup.text = filteredContent[i];
		} else if (filteredContent[i].type === "imagem") {
			currentGroup.imagem = filteredContent[i];
		} else if (filteredContent[i].type === "gráfico") {
			currentGroup.gráfico = filteredContent[i];
		}
	}	
	function toggleDiv() {
		const searchTermWithoutAccents = searchTerm.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
		const divs = document.querySelectorAll(".question");
		divs.forEach((div, i) => {
		const h3TextWithoutAccents = questions[i].value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
		const pTextWithoutAccents = answers[i].value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
		const containsSearchTerm = h3TextWithoutAccents.includes(searchTermWithoutAccents) || pTextWithoutAccents.includes(searchTermWithoutAccents);
		div.style.display = containsSearchTerm ? "block" : "none";
		});
	}
</script>

<div class="uva-searchbox">
	<Searchbox bind:searchTerm on:input={toggleDiv} />
	<!-- {#each questions as question, i}
		<div class='question'>
			<Heading value={question.value} />
			<Text value={answers[i].value} />
			{#if images[i]}
				<Image value={images[i].value} />
			{/if}
		</div>
	{/each} -->
</div>
{#each groupedContent as item}
	<div class='question'>
		<Heading value={item.title.value} />
		{#if item.text}
			<Text value={item.text.value} />
		{/if}
		{#if item.imagem}
			<Image value={item.imagem.value} />
		{/if}
		{#if item.gráfico}
            <Chart value={item.gráfico.value} />
	{/if}
	</div>
{/each}