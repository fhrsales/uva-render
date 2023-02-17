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
    --corpo-mobile: 1.275rem;
    --corpo-desktop: 1.475rem;
    --corpo-h3-mobile: 1.525rem;
    --corpo-h3-desktop: 1.75rem;
    --entrelinha-mobile: 1.6625rem;
    --entrelinha-desktop: 1.975rem;
    --entrelinha-h3-mobile: 1.725rem;
    --entrelinha-h3-desktop: 2.1rem;
    --cor-fundo: #fff;
    --cor-texto: #333;
    --cor-primaria: #005d92;
    --cor-secundaria: #0093d6;
    --cor-terciaria: #f5f5f5;
    --cor-EeN-primaria: #007367;
    --cor-EeN-secundaria: #86ae1c;
    --cor-c2-primaria: #c20736;;
    --cor-c2-secundaria: #e677a8;
    --margem-horizontal: 1rem;
    --margem-vertical: 2rem;
    --filete: 2.5rem;
    --fio-solido-grosso: 3px solid var(--cor-texto);
    --fio-solido-fino: 1px solid rgba(0, 0, 0, 0.5);
    --fio-pontilhado: 1.5px dotted var(--cor-texto);
    --P: 580px;
    --M: 768px;
    --G: 1024px;
    --GG: 100%;
    --largura-celular: calc(100% - var(--filete));
}

/* ******** */
/* Normalização do Arc
/* ******** */
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
    color:var(--cor-primaria);
    font-weight: bold;
    text-decoration: underline;
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
    transition: background .5s
}

:global(iframe) {
    width: 1px;
    min-width: 100%;
    border: none
}


/* ******** */
/* Regras gerais
/* ******** */
:global(.uva-botao) {
    margin: 1rem 0;
    display: block;
    padding: 0.625rem 1.25rem;
    font-family: var(--condensed);
    font-weight: 500;
    font-size: 1.063rem;
    line-height: 1.5;
    letter-spacing: 0.053rem;
    text-transform: uppercase;
    text-align: left;
    border-radius: 2.5rem;
    border: none;
    cursor: pointer;
    transition: all .35s ease-out;
    color: white;
    background-color: var(--cor-secundaria);
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
/* Imagem e video
/* ******** */
:global(figure) {
    margin: 0;
}

/* :global(figcaption) {
    font-family: var(--sans-serif);
    margin: 10px auto 20px auto;
}

:global(.GG > figcaption) {
    width: var(--largura-celular);
    max-width: var(--G);
} */

:global(.uva-imagem,
.uva-video) {
    width: 100%;
    object-fit: cover;
    height: auto;
}



/* :global(.uva-legenda) {
    font-weight: 500;
    font-size: 0.875rem;
} */

/* :global(.uva-creditos) {
    font-weight: 400;
    font-size: 0.65rem;
    text-transform: uppercase;
    letter-spacing: 0.017rem;
    opacity: 0.8;
} */

@media (min-width:748px) { /* Desktop */
    /* :global(.uva-legenda) {
        font-size: 0.9375rem;
    } */
}
</style>