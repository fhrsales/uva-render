<script>
    import { UvaPath } from "../scripts/store.js"
    import { version } from "../scripts/version.js";
    import { onMount } from "svelte";
    import { viewportHeight } from "../scripts/viewportHeight.js";
    viewportHeight();
    
    //import Animation from "./components/scrollytelling/Animation.svelte";
    import AudioContainer from "./components/audios/AudioContainer.svelte";
    import AudioQuote from "./components/audios/AudioQuote.svelte";
    import Buscador from "./components/search/Buscador.svelte";
    import ChangeBackground from "./components/transitions/ChangeBackground.svelte";
    import Chapeu from "./components/headings/Chapeu.svelte";
    import Code from "./components/codes/Code.svelte";
    import Customization from "./components/customization/Customization.svelte";
    import DefaultHeading from "./components/headings/DefaultHeading.svelte";
    import EstanteDeLivros from "./components/blocks/EstanteDeLivros.svelte";
    import Flourish from './components/charts/FlourishContainer.svelte';
    import Genre from "./components/texts/Genre.svelte";
    import ImageContainer from "./components/images/ImageContainer_responsive.svelte";
    import Janela from "./components/texts/Janela.svelte";
    import Lead from "./components/texts/Lead.svelte";
    import LeiaMais from "./components/navigation/LeiaMais.svelte";
    //import Map from "./components/maps/Map.svelte";
    import Navigation from "./components/navigation/Navigation.svelte";
    import Quiz from "./components/blocks/Quiz.svelte";
    import Quote from "./components/texts/Quote.svelte";
    import Rodape from "./components/texts/Rodape.svelte";
    import Rule from "./components/rules/Rule.svelte";
    import Scrolly from "./components/scrollytelling/Scrolly.svelte";
    import Styles from "./components/styles/Styles.svelte";
    import Testeira from "./components/navigation/Testeira.svelte";
    import Text from "./components/texts/Text.svelte";
    import UvaContainer from "./components/charts/UvaContainer.svelte";
    import Video from "./components/videos/VideoContainer.svelte";
    import YoutubeContainer from "./components/videos/YoutubeContainer.svelte";

    let UvaPages = "";
    UvaPath.subscribe(value => { UvaPages = value; });
    //const json = `https://arte.estadao.com.br/public/uploads/${UvaPages}page.json?v=${version()}`;
    const json = `https://arte.estadao.com.br/public/pages/${UvaPages}page.json?v=${version()}`;
    let functionExecuted = false;
    let conteúdo = [];
    onMount(async function () {
        const response = await fetch(json);
        const data = await response.json();
        conteúdo = Object.values(data.conteúdo);
        //console.log(conteúdo);
        if (functionExecuted) {
            return;
        }
        functionExecuted = true;
});
</script>

<Styles />

{#each conteúdo as block}
    <!-- {#if block.type === "animação"}
        <Animation value={block.value} /> -->
    {#if block.type === "audio"}
        <AudioContainer value={block.value} />
    {:else if block.type === "buscador"}
        <Buscador value={block.value} />
    {:else if block.type === "audioFrase"}
        <AudioQuote value={block.value} />
    {:else if block.type === "chapéu"}
        <Chapeu value={block.value} />
    {:else if block.type === "customização"}
        <Customization value={block.value} />
    {:else if block.type === "html"}
        <Code value={block.value} />
    {:else if block.type === "estanteDeLivros"}
        <EstanteDeLivros value={block.value} />
    {:else if block.type === "flourish"}
        <Flourish value={block.value} />
    {:else if block.type === "gênero"}
        <Genre value={block.value} />
    {:else if block.type === "gráfico"}
        <UvaContainer value={block.value} />
    {:else if block.type === "imagem"}
        <ImageContainer value={block.value} />
    {:else if block.type === "janela"}
        <Janela value={block.value} />
    {:else if block.type === "lead"}
        <Lead value={block.value} />
    {:else if block.type === "leiaMais"}
        <LeiaMais value={block.value} />
    <!-- {:else if block.type === "mapa"}
        <Map value={block.value} /> -->
    {:else if block.type === "mudaFundo"}
        <ChangeBackground value={block.value} />
    {:else if block.type === "navegador"}
        <Navigation value={block.value} />
    {:else if block.type === "quiz"}
        <Quiz value={block.value} />
    {:else if block.type === "frase"}
        <Quote value={block.value} />
    {:else if block.type === "rodapé"}
        <Rodape value={block.value} />
    {:else if block.type === "separador"}
        <Rule />
    {:else if block.type === "scrolly"}
        <Scrolly value={block.value} />
    {:else if block.type === "testeira"}
        <Testeira value={block.value} />
    {:else if block.type === "text"}
        <Text value={block.value} />
    {:else if block.type === "título"}
        <DefaultHeading value={block.value} />
    {:else if block.type === "vídeo"}
        <Video value={block.value} />
    {:else if block.type === "youtube"}
        <YoutubeContainer value={block.value} />
    {/if}
{/each}