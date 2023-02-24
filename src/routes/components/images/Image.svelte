<script>
    export let src;
    export let contentWidth;
    export let contentHeight;
    export let classe;
    export let alt;
</script>

<style>
:global(.uva-image) {
    width: 100%;
    height: auto;
    object-fit: cover;
    background-color: #f0f0f0;
}
</style>

<img 
    width={contentWidth}
    height={contentHeight}
    class="uva-image{classe ? " " + classe : ""}"
    src="https://www.estadao.com.br{src}"
    alt={alt}
/>