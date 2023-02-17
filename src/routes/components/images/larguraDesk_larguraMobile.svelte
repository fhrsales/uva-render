<script>
  export let value;
  export let src = { property: "value" };
  const { descrição, larguraDesk, larguraMobile } = value;
  let imageElement;
  let clientHeight;
  $: contentHeight = clientHeight;

  const setAttributes = async () => {
      if (imageElement) {
        let width = window.innerWidth > 580 ? larguraDesk : larguraMobile;
        let image = document.querySelectorAll("img");
          if (image !== null) {
              imageElement.setAttribute('width', width);
              image.height = image.clientHeight;
          }
      }
    };
  import { onMount } from "svelte";
  onMount(() => {    
    setAttributes();
      window.addEventListener('resize', setAttributes);
  });
</script>

<style>img { height: auto; }</style>

<figure bind:clientHeight>
  <img
    height={contentHeight}
    src={src}
    alt={descrição}
    bind:this={imageElement}
  />
</figure>