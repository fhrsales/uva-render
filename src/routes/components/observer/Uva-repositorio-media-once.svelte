<script>
    import IntersectionObserver from "svelte-intersection-observer";
    let node;
    let visible;
    export let rootMargin = "0px 0px 0px 0px";
    export let threshold = 0;
    export let id;
    export let tamanho;
</script>
<IntersectionObserver once element={node} rootMargin={rootMargin} threshold={threshold} bind:intersecting={visible}>
    <div id={id} class="uva-media-container{visible ? " loaded" : ""}{tamanho ? " " + tamanho : ""}" bind:this={node}>
        {#if visible}
            <slot />
        {:else}
            <slot name="placeholder" />
        {/if}
    </div>
</IntersectionObserver>

<style>
.uva-media-container {
    opacity: 0;
}

.uva-media-container.loaded {
    opacity: 1;
    transition: all 1s ease-in;
}
</style>