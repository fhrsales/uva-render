<script>
    export let dimensões = window.innerWidth;
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
    export let src = dimensões > 580 ? fonteDesk : fonteMobile;
</script>

<style>
    video {
        width: 100%;
        height: auto;
        object-fit: cover;
        background-color: #f0f0f0;
    }
</style>

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