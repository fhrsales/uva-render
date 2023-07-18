<script>
    // import { onMount } from 'svelte';
    export let value;

    // let isVisible = false;

    // onMount(() => {
    //     const observer = new IntersectionObserver(entries => {
    //         entries.forEach(entry => {
    //         if (entry.target.classList.contains('title')) {
    //             entry.target.classList.toggle('visible', entry.isIntersecting);
    //         }
    //         });
    //     });

    //     const titles = document.querySelectorAll('.title');
    //     titles.forEach(title => {
    //         observer.observe(title);
    //     });
    // });
</script>

<h3>{@html value}</h3>
<!-- <h3 class="title {isVisible ? 'visible' : ''}">{@html value}</h3> -->

<style>
    h3 {
        width: var(--largura-celular);
        max-width: var(--P);
        margin: calc(var(--margem-vertical) * 2) auto calc(var(--margem-vertical) * .5) auto;
        font: 600 var(--corpo-h3-mobile)/var(--entrelinha-h3-mobile) var(--serif);
        color: var(--cor-texto);
    }

    /* .title {
        opacity: 0;
        transform: translateY(70px);
        transition: opacity 0.5s, transform 0.5s;
    }

    .title.visible {
        opacity: 1;
        transform: translateY(0);
    } */

    @media (min-width:748px) {
        /* Desktop */
        h3 {
            font-size: var(--corpo-h3-desktop);
            line-height: var(--entrelinha-h3-desktop);
        }
    }
</style>