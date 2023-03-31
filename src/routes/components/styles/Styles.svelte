<style>
    @import 'https://arte.estadao.com.br/arc/styles/uva-font.min.css';

    :root {
        --sans-serif: 'Flama', sans-serif;
        --serif: 'Estado Headline', serif;
        --fine: 'Estado Fine', serif;
        --semicondensed: 'Flama Semicondensed', sans-serif;
        --condensed: 'Flama Condensed', sans-serif;
        --ultracondensed: 'Flama Condensed', sans-serif;
        --texto: 'Freight Text', serif;

        --borda-fina: 1px solid #C7C7C7;
        --sombra-leve: 2px 2px 2px hsla(0, 0%, 7%, 0.119);
        --sombra-forte: 3px 3px 3px hsla(0, 0%, 7%, 0.429);

        --corpo-mobile: 1.275rem;
        --corpo-desktop: 1.475rem;
        --corpo-h3-mobile: 1.525rem;
        --corpo-h3-desktop: 1.75rem;

        --entrelinha-mobile: 1.6625rem;
        --entrelinha-desktop: 1.975rem;
        --entrelinha-h3-mobile: 1.725rem;
        --entrelinha-h3-desktop: 2.1rem;

        --cor-primaria: #005d92;
        --cor-secundaria: #008ed0;
        --cor-fundo: #fff;
        --cor-texto: #333;
        --cor-placeholder: #eeeeee;
        --cor-correto: #007367;
        --cor-incorreto: #c20736;

        --filete: 2.5rem;
        --fio-solido-grosso: 3px solid var(--cor-texto);
        --fio-solido-fino: 1px solid rgba(0, 0, 0, 0.5);
        --fio-pontilhado: 1.5px dotted var(--cor-texto);

        --margem-horizontal: 1rem;
        --margem-vertical: 2rem;

        --P: 580px;
        --M: 768px;
        --G: 1024px;
        --GG: 100%;
        --largura-celular: calc(100% - var(--filete));
    }

    /* ******** */
    /* Normalização do Arc
    /* ******** */

    :global(.OB-REACT-WRAPPER) {
        max-width: 705px !important;
        margin-bottom: 80px !important;
    }

    @media (min-width:576px) {
        :global(.container) {
            max-width: 100% !important;
        }
    }

    @media (min-width:768px) {
        :global(.container) {
            max-width: 100% !important;
        }
    }

    :global(a:link, a:visited, a:hover, a:active) {
        color: var(--cor-primaria);
        font-family: inherit;
        font-weight: inherit;
        text-decoration: inherit;
    }

    :global(.news-body.container) {
        background-color: inherit !important;
    }

    :global(.social-media-sticky-bar) {
        display: none !important;
    }

    :global(.news-header) {
        height: var(--vh) !important;
    }

    :global(.subheadline-feature-block) {
        font-family: var(--texto) !important;
        font-style: italic !important;
        width: 100% !important;
        max-width: 580px !important;
    }

    :global(.subheadline-feature-block h2:before) {
        content: "__ "
    }

    :global(.subheadline-feature-block h2) {
        font-size: 24px !important;
        line-height: 29px !important;
        text-align: left !important;
        letter-spacing: .009em !important;
    }

    :global(.content-wrapper.news-body.content) {
        padding: 0 !important;
    }

    :global(.embed-wrapper) {
        width: 100% !important;
        max-width: 100% !important;
        z-index: 1 !important;
    }

    :global(button[disabled]) {
        opacity: 1 !important;
    }

    :global(body) {
        transition: background .5s;
    }

    :global(iframe) {
        width: 1px;
        min-width: 100%;
        border: none
    }

    /* ******** */
    /* Largura dos containers
/* ******** */
    :global(.P) {
        width: var(--largura-celular);
        max-width: var(--P);
        margin-left: auto;
        margin-right: auto;
    }

    :global(.M) {
        width: var(--largura-celular);
        max-width: var(--M);
        margin-left: auto;
        margin-right: auto;
    }

    :global(.G) {
        width: var(--largura-celular);
        max-width: var(--G);
        margin-left: auto;
        margin-right: auto;
    }

    :global(.GG) {
        width: var(--GG);
        max-width: var(--GG);
        margin-left: auto;
        margin-right: auto;
    }

    /* ******** */
    /* Bold e itálico
/* ******** */
    :global(b) {
        font-weight: 800;
    }

    :global(i) {
        font-weight: 500;
    }
</style>