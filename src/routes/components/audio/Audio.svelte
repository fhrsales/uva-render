<script>
    import IntersectionObserver from "svelte-intersection-observer"; 
    let node;
    let nasVista;
    let rootMargin = "0px 0px 0px 0px";
    let threshold = 0;
    export let value;
    const { id, fonte } = value;
</script>
<IntersectionObserver once element={node} rootMargin={rootMargin} threshold={threshold} bind:intersecting={nasVista}>
    <div class="uva-repositorio-media {nasVista ? ' carregada ' : ''}P" bind:this={node}>
        {#if nasVista}
            <audio id={id} class='uva-audio' controls preload='none'>
                <source
                    src={fonte}
                    type='audio/mp3'
                >
            </audio>
        {/if}
    </div>
</IntersectionObserver>
<style>
.uva-audio {
    width: 100%;
}
</style>