<script>
    export let value;
    const { genero, titulo, fonte, autor, editora, paginas, valor, texto, comprar } = value;
    const ComprarNome = comprar.map((item) => item.nome);
    const ComprarLink = comprar.map((item) => item.link);
</script>
<div class="uva-repositorio-estante-de-livros P">
    <div>
    <div class="uva-repositorio-media uva-estante-de-livros-imagem carregada">
        <figure style="height: 295px; --lombada:283px; --contraCapa:295px;">
            <img loading="lazy" itemprop="image" src="https://www.estadao.com.br{fonte}" alt="{titulo + ', por ' + autor}" height="295" width="200">
        </figure>
    </div>
        <div class="uva-estante-de-livros-ficha">
            <h4 class="uva-estante-de-livros-genero" item-prop="genre">{genero}</h4>
            <h3 class="uva-estante-de-livros-titulo" item-prop="title">{titulo}</h3>
            <p class="uva-estante-de-livros-autor" itemprop="author"><strong>{autor}</strong></p>
            <p class="uva-estante-de-livros-editora" itemprop="publisher">Editora {editora}</p>
            <p class="uva-estante-de-livros-preco">
                <span class="uva-estante-de-livros-paginas" itemprop="pages">{paginas}</span> • 
                <span class="uva-estante-de-livros-valor" itemprop="price">{valor}</span>
            </p>
                <button class="uva-botao uva-estante-de-livros-comprar">Comprar ▾</button>
        </div>
    </div>
    <div class="uva-estante-de-livros-descricao">
        <p class="uva-corpo" itemprop="description">{@html texto} •</p>
    </div>
</div>
<style>
.uva-repositorio-estante-de-livros {
    display: block;
}

.uva-estante-de-livros-ficha::before {
    content: '';
    display: block;
    width: var(--filete);
    height: 0.188rem;
    margin-top: 0.375rem;
    background-color: var(--cor-c2-primaria);
}

.uva-estante-de-livros-ficha {
    width: var(--largura-celular);
    margin: 2.2rem 0 1.78125rem 0;
}

.uva-estante-de-livros-ficha > h4 {
    font-family: var(--serif);
    font-weight: 700;
    color: var(--cor-texto);
    margin: 0.5rem 0 -0.5rem 0;
}

.uva-estante-de-livros-ficha > h3 {
    font-family: var(--condensed);
    font-weight: 500;
    color: var(--cor-c2-primaria);
    text-transform: uppercase;
    margin-top: 0.563rem;
    margin-bottom: 0.563rem;
    letter-spacing: 0.009rem;
}

.uva-estante-de-livros-preco::after, .uva-estante-de-livros-ficha > h3::after {
    content: '';
    display: block;
    width: var(--filete);
    height: 0.063rem;
    background-color: var(--cor-texto);
    margin-top: 0.563rem;
    opacity: 0.7;
}

.uva-estante-de-livros-ficha > p {
    font-family: var(--condensed);
    font-weight: 400;
    text-transform: uppercase;
    color: var(--cor-texto);
    letter-spacing: 0.012rem;
    margin: 0;
}

.uva-estante-de-livros-comprar {
    background-color: var(--cor-c2-secundaria);
}

.uva-estante-de-livros-comprar:hover {
    background-color: var(--cor-c2-primaria);
}

.triangulo {
    position: absolute;
    display: inline-block;
    background-color: var(--cor-fundo);
    height: 12px;
    width: 12px;
    margin: -18px 0 0 52px;
    z-index: 1;
    transform: rotate(45deg);
}

.trianguloSombra {
    position: relative;
    display: inline-block;
    height: 12px;
    width: 12px;
    margin: -19px 0 0 51px;
    border: 1px solid #C7C7C7;
    border-radius: 4px;
    transform: rotate(45deg);
    box-shadow: 2px 2px 2px hsl(0deg 0% 7% / 20%);
}

.uva-estante-de-livros-lojas {
    position: sticky;
    list-style: none;
    opacity: 1;
    background-color:var(--cor-fundo);
    border: 1px solid #C7C7C7;
    border-radius: 4px;
    font-family: var(--condensed), sans-serif;
    box-shadow: 2px 2px 2px hsl(0deg 0% 7% / 20%);
    left: 0;
    margin-top: -13px;
    padding: 12px;
    top: 28px;
    width: 176px;
}

.uva-estante-de-livros-assinatura {
    font-family: var(--condensed);
    font-size: 70%;
    text-transform: uppercase;
    letter-spacing: 0.012rem;
}

.uva-estante-de-livros-imagem {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    perspective: 400px;
    max-width: 220px;
    margin: 28px 0 0 8px !important;
    transform: translate(-18px, 0px);
}

.uva-estante-de-livros-imagem > figure {
    width: 200px;
    position: relative;
    transform-style: preserve-3d;
    transform: rotateY(-31deg);
}

.uva-estante-de-livros-imagem > figure > :first-child {
    position: absolute;
    top: 0;
    left: 0;
    background-color: red;
    width: 200px;
    transform: translateZ(22.5px);
    background-color: #01060f;
    border-radius: 0 2px 2px 0;
    box-shadow: 5px 5px 20px #666;
}

.uva-estante-de-livros-imagem > figure::before {
    position: absolute;
    content: '';
    background-color: blue;
    left: 0;
    top: 5px;
    width: 43px;
    height: var(--lombada);
    transform: translateX(172.5px) rotateY(90deg);
    background: linear-gradient(90deg, 
    var(--cor-fundo) 0%,
    #f9f9f9 5%,
    var(--cor-fundo) 10%,
    #f9f9f9 15%,
    var(--cor-fundo) 20%,
    #f9f9f9 25%,
    var(--cor-fundo) 30%,
    #f9f9f9 35%,
    var(--cor-fundo) 40%,
    #f9f9f9 45%,
    var(--cor-fundo) 50%,
    #f9f9f9 55%,
    var(--cor-fundo) 60%,
    #f9f9f9 65%,
    var(--cor-fundo) 70%,
    #f9f9f9 75%,
    var(--cor-fundo) 80%,
    #f9f9f9 85%,
    var(--cor-fundo) 90%,
    #f9f9f9 95%,
    var(--cor-fundo) 100%
    );
}

.uva-estante-de-livros-imagem > figure::after {
    position: absolute;
    top: 0;
    left: 0;
    content: '';
    width: 200px;
    height: var(--contraCapa);
    transform: translateZ(-22.5px);
    background-color: #01060f;
    border-radius: 0 2px 2px 0;
    box-shadow: -10px 0 50px 10px #666;
}

.uva-estante-de-livros-descricao > p {
    width: 100%;
    margin: 0 auto;
}

@media (min-width:740px) { /* Desktop */
    .uva-repositorio-estante-de-livros {
        display: flex; 
        justify-content: space-between;
        margin-bottom: -30px;
    }

    .uva-estante-de-livros-descricao {
        min-width: 324px;
        max-width: 324px;
    }
}
</style>