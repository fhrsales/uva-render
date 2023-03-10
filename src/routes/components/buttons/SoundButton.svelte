<script>
    export let { audio, audioQuoteContainer } = [];
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
</script>

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

<style>
    button {
        text-transform: uppercase;
        font: 500 calc(var(--corpo-desktop) * 0.7) / 1.5 var(--condensed);
        letter-spacing: 0.053rem;
        color: var(--texto);
        cursor:pointer;
        border: 0;
        transition: all .35s ease-out;
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
</style>