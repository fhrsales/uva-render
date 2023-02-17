<script>
    import UvaRepositorioMediaOnce from "../observer/Uva-repositorio-media-once.svelte";
    import ImagePlaceholder from "../images/ImagePlaceholder.svelte";
    export let id;
    export let tamanho;
    export let rootMargin;
    export let descrição;
</script>
<style>
.uva-video {
    overflow: hidden;
    position: relative;
    width: 100%;
    margin: calc(var(--margem-vertical) * 1.5) auto;
}
</style>
<UvaRepositorioMediaOnce {id} {tamanho} {rootMargin}>
    <figure class="uva-video">
        <slot />
    </figure>
    <placeholder slot="placeholder">
        <ImagePlaceholder {descrição} />
    </placeholder>
</UvaRepositorioMediaOnce>