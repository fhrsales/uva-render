<script>
    export let src;
    export let contentWidth;
    export let contentHeight;
    export let classe;
    export let alt;
</script>

<style>
img {
    width: 100%;
    height: auto;
    object-fit: cover;
    background-color: #f0f0f0;
}
</style>

<img 
    loading="lazy"
    width={contentWidth}
    height={contentHeight}
    class="uva-imagem{classe ? " " + classe : ""}"
    src="https://www.estadao.com.br{src}"
    alt={alt}
/>