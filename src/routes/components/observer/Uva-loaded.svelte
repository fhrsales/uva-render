<script>
    import onMount from 'svelte';
    export let { placeholder, src } = value;
    let observer;
    let loaded = false;

    function handleIntersection(entries) {
        if (entries[0].isIntersecting) {
            observer.unobserve($placeholder);
            loaded = true;
        }
    }

    onMount(() => {
        observer = new IntersectionObserver(handleIntersection);
        observer.observe($placeholder);
    });
</script>

{#if loaded}
    <slot />
{:else}
    <div class="placeholder" bind:this={$placeholder} style="background-image: url({placeholder})"></div>
{/if}

<style>
    .placeholder {
        width: 100%;
        height: 100%;
        background-size: cover;
        background-position: center;
    }

    .loaded {
        opacity: 0;
    }

    .loaded.loaded {
        opacity: 1;
        transition: all 1s ease-in;
    }
</style>

<!-- Aplicação do componente:
<script>
    import UvaLoaded from './LazySlot.svelte';
    let placeholderSrc = 'my-placeholder.jpg';
</script>

<UvaLoaded placeholder={placeholderSrc}>
    <img src="my-image.jpg" alt="My Image" />
</UvaLoaded> -->