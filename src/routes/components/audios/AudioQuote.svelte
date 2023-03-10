<script>
    import { onMount } from "svelte";
    let audioQuoteContainer;
    let audio;
    let autor;
    let replay;
    let quote;

    export let value;
    export let { id, tamanho, frase, descrição, fonte, intervalo } = value;
    let time = intervalo.split(',').map(Number);

    onMount(() => {
        const playPhrase = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    audioQuoteContainer.classList.add('loaded');
                    audio.play();            
                    let spans = entry.target.querySelectorAll('.word');
                    spans.forEach((span, i) => {
                        setTimeout(() => {
                            span.classList.add('active');
                        }, (time[i]) * 1000);
                    });
                    setTimeout(() => {
                        autor.classList.add('active');
                    }, (time[time.length - 1]) * 1000);
                } else {
                    audioQuoteContainer.classList.remove('loaded');
                    audioQuoteContainer.classList.remove('played');
                    audio.pause();
                    audio.currentTime = 0;
                    replay.style.display = 'none';
                    let spans = entry.target.querySelectorAll('.word');
                    spans.forEach((span) => {
                        span.classList.remove('active');
                    });
                    autor.classList.remove('active');
                }
            });
        }, {
            threshold: 0,
            rootMargin: '0px 0px -50% 0px'
        });
        playPhrase.observe(audioQuoteContainer);
    });

    function splitPhrase(phrase) {
        return phrase.split(' ');
    }

    function togglePlay() {
        if (audio.paused) {
            audio.play();
            replay.style.display = 'none';
            audioQuoteContainer.classList.remove('played');
            let spans = document.querySelectorAll(`#${id} .word`);
            spans.forEach(function (span) {
                span.classList.remove('active');
            });
            autor.classList.remove('active');
            spans.forEach((span, i) => {
                setTimeout(() => {
                    span.classList.add('active');
                }, (time[i]) * 1000);
            });
            setTimeout(() => {
                autor.classList.add('active');
            }, (time[time.length - 1]) * 1000);
        } else {
            audio.pause();
        }
    }

    function toggleMute() {
        audio.muted = !audio.muted;
        let unmuteLabel = audioQuoteContainer.querySelector('.unmuteLabel');
        let muteLabel = audioQuoteContainer.querySelector('.muteLabel');
        let unmuteIcon = audioQuoteContainer.querySelector('.unmuteIcon');
        let muteIcon = audioQuoteContainer.querySelector('.muteIcon');
        let replay = audioQuoteContainer.querySelector('.replay');
        replay.style.display = 'block';
        if (audio.muted) {
            unmuteLabel.style.display = 'none';
            muteLabel.style.display = 'block';
            unmuteIcon.style.display = 'none';
            muteIcon.style.display = 'block';
        } else {
            unmuteLabel.style.display = 'block';
            muteLabel.style.display = 'none';
            unmuteIcon.style.display = 'block';
            muteIcon.style.display = 'none';
        }
    }

    function audioPlayed() {
        audioQuoteContainer.classList.add('played');
        replay.style.display = 'block';
    }
</script>

<div id={id} class='uva-audio-container {tamanho}' bind:this={audioQuoteContainer}>
    <audio bind:this={audio} on:ended={audioPlayed} src={fonte} muted></audio>
    <div class="phrase" bind:this={quote}>
        <div class="words">
            {#each splitPhrase(frase) as word, i}
                <span data-index={ i + 1 } class="word">{@html word} </span>
            {/each}
        </div>
        <div class='author' bind:this={autor}>{@html descrição}</div>
    </div>
    <button class='audio' on:click={toggleMute}>
            <div class='labels'>            
                <span class='muteLabel' style='display:block'>Escutar</span>
                <span class='unmuteLabel' style='display:none'>Silenciar</span>
            </div>
            <div class='icons-container'>
                <span class="muteIcon" style='display:block'>
                    <svg width="24" height="22" viewBox="0 0 31 30">
                        <path class="icon-fill" d="M22.9734 1.00176C22.9734 0.188391 22.054 -0.284734 21.3922 0.188029L11.9871 6.90598H6.13965C5.03508 6.90598 4.13965 7.80141 4.13965 8.90598V20.6008C4.13965 21.7054 5.03508 22.6008 6.13965 22.6008H7.63671L22.9734 10.6722V1.00176ZM22.9734 14.6489L12.3845 22.8847L21.3922 29.3187C22.054 29.7915 22.9734 29.3184 22.9734 28.505V14.6489Z" fill="black" stroke="none"></path>
                        <path class="icon-path" d="M29.2507 4.63745L1 26.6102" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                </span>
                <span class="unmuteIcon" style='display:none'>
                    <svg width="24" height="22" viewBox="0 0 34 31">
                        <path class="icon-fill" d="M17.2759 0.647423C17.9378 0.17466 18.8571 0.647784 18.8571 1.46116V29.0033C18.8571 29.8167 17.9378 30.2898 17.2759 29.8171L7.85714 23.0894H2C0.89543 23.0894 0 22.194 0 21.0894V9.37511C0 8.27054 0.895431 7.37511 2 7.37511H7.85714L17.2759 0.647423Z" fill="black" stroke="none"></path>
                        <path class="icon-path" d="M23.5617 22.9407C25.5116 20.9559 26.7144 18.2346 26.7144 15.2324C26.7144 12.2175 25.5015 9.48599 23.5371 7.49902" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path class="icon-path" d="M27.9375 3.00928C31.0656 6.13738 33.0004 10.4588 33.0004 15.2321C33.0004 20.0054 31.0656 24.3269 27.9375 27.455" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                </span>
            </div>
    </button>
    <button class="replay" on:click={togglePlay} bind:this={replay}>
        <svg width="22" height="22" viewBox="0 0 74.999 74.999" xml:space="preserve">
            <g>    
                <path d="M33.511,71.013c15.487,0,28.551-10.563,32.375-24.859h9.113L61.055,22L47.111,46.151h8.006c-3.44,8.563-11.826,14.628-21.605,14.628c-12.837,0-23.28-10.443-23.28-23.28c0-12.836,10.443-23.28,23.28-23.28c6.604,0,12.566,2.768,16.809,7.196l5.258-9.108c-5.898-5.176-13.619-8.32-22.065-8.32C15.034,3.987,0,19.019,0,37.5C-0.002,55.981,15.03,71.013,33.511,71.013z"></path>
            </g>
        </svg>
    </button>
</div>


<style>
    audio {
        display: none;
    }

    button {
        font: 500 calc(var(--corpo-desktop) * 0.7) / 1.5 var(--condensed);
        letter-spacing: 0.053rem;
        text-transform: uppercase;
        color: var(--texto);
        cursor:pointer;
        border: 0;
        transition: all .35s ease-out;
    }

    .uva-audio-container {
        position: relative;
        width: 100%;
        height: 100vh;
        margin: calc(var(--margem-vertical) * 2) 0;
        opacity: 0;
    }

    :global(.uva-audio-container.loaded) {
        opacity: 1;
        transition: all 1s ease-in;
    }

    .icons-container {
        margin: 2px 0 0 6px;
    }

    .audio {
        position: absolute; 
        bottom: 70px; 
        left: 50%; 
        transform: translate3d(-50%,0,0); 
        display: flex; 
        background: none; 
        align-items: normal;
    }

    .replay {
        position: absolute; 
        bottom: 76px; 
        right: 20px; 
        display: none; 
        background: none;
    }

    .phrase {
        position: absolute;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        width: 100%;
        height: 100%;
        font: italic 900 calc(var(--corpo-desktop) * 1.9) / 1 var(--texto);
        letter-spacing: -0.02em;
        -webkit-font-smoothing: antialiased;
        text-rendering: geometricPrecision;
        transition: opacity 0.7s;
    }

    .words {
        color: var(--cor-secundaria);
        text-align: left;
        width: calc(100% - var(--margem-horizontal) * 3);
        margin: 0 auto;
    }

    .word {
        opacity: 0;
    }

    .author {
        width: calc(100% - var(--margem-horizontal) * 3);
        margin: calc(var(--margem-vertical)) auto 0 auto;
        font-size: 55%;
        color: var(--texto);
        opacity: 0;
    }

    :global(.word.active, .author.active) {
        opacity: 1;
        transition: opacity 0.2s;
    }

    @media (min-width:740px) { /* Desktop */
        .phrase {
            font-size: calc(var(--corpo-desktop) * 3.5);
            line-height: 1;
            align-items: center;
        }

        .words {
            text-align: center;
        }

        .author {
            width: 100%;
            text-align: center;
        }
    }
</style>