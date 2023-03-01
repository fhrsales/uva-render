<script>
    let node;
    export let value;
    const {
        corNova,
        corOriginal
    } = value;
    let options = {
        rootMargin: '0px 0px 0px 0px',
        threshold: 0,
    }
    import {
        onMount
    } from "svelte";
    onMount(async () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    document.body.style.backgroundColor = corNova;
                } else {
                    document.body.style.backgroundColor = corOriginal;
                }
            });
        }, options);
        observer.observe(node);
    });
</script>
<div class="mudaFundo" bind:this={node}></div>