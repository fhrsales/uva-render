<script>
    export let fonteDesk;
    export let fonteMobile;
    export let playsinline;
    export let autoplay;
    export let muted;
    export let preload;
    export let loop;
    export let contentWidth;
    export let contentHeight;
    export let classe;
    export let src = window.innerWidth > 580 ? fonteDesk : fonteMobile;
</script>

<video 
    width={contentWidth} 
    height={contentHeight} 
    class={classe} 
    playsinline={playsinline} 
    autoplay={autoplay}
    muted={muted}
    preload={preload} 
    loop={loop}
    src={src}
>
</video>

<style>
    video {
        width: 100%;
        height: auto;
        object-fit: cover;
        background-color: var(--cor-placeholder);
    }
</style>