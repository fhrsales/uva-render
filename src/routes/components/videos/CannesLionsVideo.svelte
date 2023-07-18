<script>
    let CannesLionsHeader = 'https://arte.estadao.com.br/economia/2023/cannes-lions/img/header.svg'
    export let value;
    const fonte = value;
</script>
<div class='uva-cannes-lions-header-container'>
    <img src={CannesLionsHeader} alt="Cobertura Cannes Lions – Estadão • RZK Digital • Oxigen"/>
</div>

<div class="uva-cannes-lions-frame"></div>

<div class="uva-cannes-lions-youtube-container">
    <iframe 
        title='Vídeo do Youtube' 
        frameborder='0' 
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' 
        allowfullscreen='' 
        src={`https://www.youtube.com/embed/${value.fonte}?autoplay=1&mute=1`}>
    </iframe>
</div>

<style>
    :global(body) {
        margin: 0;
        width: 100vw;
        height: 100%;
        overflow-x: hidden;
        background-color: #312b36;
    }

    .uva-cannes-lions-header-container {
        position: fixed;
        top: 8vh;
        width: 100vw;
        height: 90px;
        margin: 0 auto;
    }

    .uva-cannes-lions-header-container > img {
        margin: 0 auto;
        width: 60vw;
        max-width: 700px;
        height:auto;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .uva-cannes-lions-frame {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 68vw;
        height: 88vh;
        border: 13px solid white;
    }

    .uva-cannes-lions-youtube-container {
        position:relative;
        padding-bottom:56.25%;
        height:0;
        overflow:hidden;
        margin: 30vh auto;
        box-shadow: 0px 0px 15px 5px #00000054;
    }

    iframe {
        position:absolute;
        top:0;
        left:0;
        width:100%;
        height:100%;
    }
</style>