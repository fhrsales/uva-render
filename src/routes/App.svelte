<script>
  import { UvaPath } from "../scripts/store.js"
  let UvaPages = "";
  UvaPath.subscribe(value => {
    UvaPages = value;
  });

  import Animation from "./components/scrollytelling/Animation.svelte";
  import AudioContainer from "./components/audios/AudioContainer.svelte";
  import ChangeBackground from "./components/transitions/ChangeBackground.svelte";
  import Customization from "./components/customization/Customization.svelte";
  import Code from "./components/codes/Code.svelte";
  import EstanteDeLivros from "./components/blocks/EstanteDeLivros.svelte";
  import DefaultHeading from "./components/headings/DefaultHeading.svelte";
  import ImageContainer from "./components/images/ImageContainer.svelte";
  import Map from "./components/maps/Map.svelte";
  import Navigation from "./components/navigation/Navigation.svelte";
  import Quiz from "./components/blocks/Quiz.svelte";
  import Rule from "./components/rules/Rule.svelte";
  import Scrolly from "./components/scrollytelling/Scrolly.svelte";
  import Styles from "./components/styles/Styles.svelte";
  import Testeira from "./components/navigation/Testeira.svelte";
  import Text from "./components/text/Text.svelte";
  import UvaContainer from "./components/charts/UvaContainer.svelte";
  import Video from "./components/videos/VideoContainer.svelte";
  import YoutubeContainer from "./components/videos/YoutubeContainer.svelte";

  import { version } from "../scripts/version.js";
  import { onMount } from "svelte";
  const json = `https://arte.estadao.com.br/public/pages/${UvaPages}/page.json?v=${version()}`;
  let conteúdo = [];
  onMount(async function () {
    const response = await fetch(json);
    const data = await response.json();
    conteúdo = Object.values(data.conteúdo);
    console.log(conteúdo);
  });

  import { viewportHeight } from "../scripts/viewportHeight.js";
  viewportHeight();
</script>

<Styles />

{#each conteúdo as block}
  {#if block.type === "animação"}
    <Animation value={block.value} />
  {/if}
  {#if block.type === "audio"}
    <AudioContainer value={block.value} />
  {/if}
  {#if block.type === "customização"}
    <Customization value={block.value} />
  {/if}
  {#if block.type === "html"}
    <Code value={block.value} />
  {/if}
  {#if block.type === "estanteDeLivros"}
    <EstanteDeLivros value={block.value} />
  {/if}
  {#if block.type === "gráfico"}
    <UvaContainer value={block.value} />
  {/if}
  {#if block.type === "imagem"}
    <ImageContainer value={block.value} />
  {/if}
  {#if block.type === "mapa"}
    <Map value={block.value} />
  {/if}
  {#if block.type === "mudaFundo"}
    <ChangeBackground value={block.value} />
  {/if}
  {#if block.type === "navegador"}
    <Navigation value={block.value} />
  {/if}
  {#if block.type === "quiz"}
    <Quiz value={block.value} />
  {/if}
  {#if block.type === "separador"}
    <Rule />
  {/if}
  {#if block.type === "scrolly"}
    <Scrolly value={block.value} />
  {/if}
  {#if block.type === "testeira"}
    <Testeira value={block.value} />
  {/if}
  {#if block.type === "text"}
    <Text value={block.value} />
  {/if}
  {#if block.type === "título"}
    <DefaultHeading value={block.value} />
  {/if}
  {#if block.type === "vídeo"}
    <Video value={block.value} />
  {/if}
  {#if block.type === "youtube"}
    <YoutubeContainer value={block.value} />
  {/if}
{/each}