<script>
  import { UvaPath } from "../scripts/store.js"
  let UvaPages = "";
  UvaPath.subscribe(value => {
    UvaPages = value;
  });
  import { version } from "../scripts/version.js";
  import Animation from "./components/scrollytelling/Animation.svelte";
  import Audio from "./components/audio/Audio.svelte";
  import ChangeBackground from "./components/transition/ChangeBackground.svelte";
  import Customization from "./components/customization/Customization.svelte";
  import Code from "./components/html/Code.svelte";
  import EstanteDeLivros from "./components/blocks/EstanteDeLivros.svelte";
  import DefaultHeading from "./components/headings/DefaultHeading.svelte";
  import Image from "./components/images/ImageContainer.svelte";
  import Map from "./components/maps/Map.svelte";
  import Navigation from "./components/navigation/Navigation.svelte";
  import Rule from "./components/rules/Rule.svelte";
  import Scrolly from "./components/scrollytelling/Scrolly.svelte";
  import Styles from "./components/styles/Styles.svelte";
  import Testeira from "./components/navigation/Testeira.svelte";
  import Text from "./components/text/Text.svelte";
  import Uva from "./components/charts/Uva.svelte";
  import Video from "./components/videos/Video.svelte";
  import Youtube from "./components/videos/Youtube.svelte";
  import { onMount } from "svelte";
  const json = `https://arte.estadao.com.br/public/pages/${UvaPages}/page.json?v=${version()}`;
  let conteúdo = [];

  onMount(async function () {
    const response = await fetch(json);
    const data = await response.json();
    conteúdo = Object.values(data.conteúdo);
    console.log(conteúdo);
  });
</script>
<Styles />
{#each conteúdo as block}
{#if block.type === "animação"}
    <Animation value={block.value} />
  {/if}
  {#if block.type === "audio"}
    <Audio value={block.value} />
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
    <Uva value={block.value} />
  {/if}
  {#if block.type === "imagem"}
    <Image value={block.value} />
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
    <Youtube value={block.value} />
  {/if}
{/each}