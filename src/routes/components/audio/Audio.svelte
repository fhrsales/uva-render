<script>
    import UvaRepositorioMediaOnce from "../observer/Uva-repositorio-media-once.svelte";
    export let value;
    const { id, fonte } = value;
    const tamanho = "P";
</script>
<UvaRepositorioMediaOnce {id} {tamanho}>
    <audio controls preload="none"><source src={fonte} type="audio/mp3"></audio>
    <placeholder slot="placeholder">
        <p>Carregando o áudio...</p>
    </placeholder>
</UvaRepositorioMediaOnce>
<style>
audio {
    margin: calc(var(--margem-vertical) * 1) auto calc(var(--margem-vertical) * 1) auto;
    width: 100%;
}
</style>