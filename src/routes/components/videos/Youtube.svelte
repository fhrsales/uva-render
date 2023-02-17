<script>
    import VideoContainer from "../videos/VideoContainer.svelte";
    export let value;
    const { id, fonte, mostrarLegenda, tamanho, legenda, crédito } = value;
    let rootMargin = "0px 0px 35% 0px";
    let descrição = "Vídeo do Youtube";
</script>
<style>
div::after {
    padding-top: 56.25%;
    display: block;
    content: '';

}iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
</style>

<VideoContainer {id} {tamanho} {rootMargin} {descrição} {mostrarLegenda} {legenda} {crédito}>
    <div>
        <iframe 
            title="Vídeo do Youtube" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen="" 
            src="https://www.youtube.com/embed/{fonte}">
        </iframe>
    </div>
</VideoContainer>