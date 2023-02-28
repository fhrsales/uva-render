// ******** //
// Calcula a altura do viewport
// ******** //
function alturaDaTela() {
    var vh = window?.innerHeight * 1;
    document.documentElement.style.setProperty(`--vh`, `${vh}px`);
}
alturaDaTela();
// ******** //
// Substitui 'sim' e 'não' por variáveis booleanas
// ******** //
function boolean(valor) {
    if (valor == `sim`) {
        return true;
    } else {
        return false;
    }
}
// ******** //
// Carrega folhas de estilo no cabeçalho
// ******** //
function adicionaCSS(fileName) {
    var link = document.createElement(`link`);
        link.rel= `stylesheet`;
        link.type= `text/css`;
        link.href= fileName;
        document.head.appendChild(link);
}
adicionaCSS(`https://arte.estadao.com.br/arc/styles/uva-app.min.css`);
//adicionaCSS(`./styles/uva-app.min.css`); // CSS local
adicionaCSS(`https://arte.estadao.com.br/arc/styles/uva-font.min.css`);
// ******** //
// Monta o nome do arquivo json a partir do data-uva-id do script no Arc
// ******** //
var uvaScript = document.querySelectorAll(`[data-uva-id]`);
    uvaId = uvaScript[0].getAttribute(`data-uva-id`);
    // ******** //
    // Prepara o ID da reportagem do Uva Pages
    // ******** //
    function IDReportagem($id) {
        return $id.replace(/.{2}/g, `$&/`)
    }
    uvaPath = IDReportagem(uvaId);
    // ******** //
    // Cria um parâmetro de randomização para evitar cache da reportagem do Uva Pages
    // ******** //
    function versao() {
        return Math.random();
    }
    page = `https://arte.estadao.com.br/public/pages/` + uvaPath + `page.json?v=${versao()}`;
// ******** //
// Lê o arquivo json
// ******** //
function googleDocsToJSON(file, callback) {
    var rawFile = new XMLHttpRequest();
        rawFile.overrideMimeType(`application/json`);
        rawFile.open(`GET`, file, true);
        rawFile.onreadystatechange = function () {
            if (rawFile.readyState == 4 && rawFile.status == `200`) callback(rawFile.responseText);
        };
        rawFile.send(null);
};
// ******** //
// Prepara a div que receberá a reportagem
// ******** //
var embedContainer = document.getElementsByClassName(`embed-container`)[0];
var embed = document.createElement(`div`);
    embed.id = `uva-embed`;
    embedContainer.appendChild(embed);
// ******** //
// Parseia e renderiza o arquivo json
// ******** //
var functionExecuted = false;
googleDocsToJSON(page, function (text) {
    if (functionExecuted) {
        return;
    }
    functionExecuted = true;
    var googleDocsData = JSON.parse(text);
    //console.log(googleDocsData);
    googleDocsData.conteúdo.forEach(function (block) {
        switch (block.type) {
            case `animação`:
                var animação = document.createElement(`div`);
                    animação.setAttribute(`aria-label`, `Scrollytelling`);
                    if (block.value.id !== undefined) {
                        animação.id = block.value.id;
                    }
                    animação.className = `uva-repositorio-scrollyTelling ${block.value.classe} ${block.value.tamanho}`;
                    fundos = document.createElement(`div`);
                    altura = Math.round((block.value.frames) * (block.value.framesTotais) - window.innerHeight);
                    fundos.setAttribute(`style`, `height: ${altura}px;`);
                    animação.appendChild(fundos);
                    fundo = document.createElement(`figure`);
                    fundo.className = `fundo`;
                    fundos.appendChild(fundo);
                    imagem = document.createElement(`img`);
                    imagem.setAttribute(`referrerpolicy`, `no-referrer`); 
                    imagem.setAttribute(`data-src`, `https://arte.estadao.com.br/public/pages/${uvaPath}0001.jpg`);
                    imagem.setAttribute(`data-src-mobile`, `https://arte.estadao.com.br/public/pages/${uvaPath}0001-mobile.jpg`);
                    fundo.appendChild(imagem);
                    passos = document.createElement(`div`);
                    passos.className = `passos`;
                for (var i = 0; i < block.value.conteúdo.length; i++) {
                    var conteúdo = block.value.conteúdo[i];
                        passo = document.createElement(`div`);
                        passo.setAttribute('data-index', i);
                        passo.className = `passo`;
                            if (conteúdo.value.classe !== undefined) {
                                passo.className += ` ${conteúdo.value.classe}`;
                            }
                        passo.setAttribute(`style`, `height: auto; position: absolute; top: ${(altura * conteúdo.value.percentual)}px; left: 50%; transform: translate(-50%, 0%);`);
                        passo.innerHTML = `<p class='uva-corpo'>${conteúdo.value.texto}</p>`;
                        passos.appendChild(passo);
                    animação.appendChild(passos);
                };
                // ******** //
                // Cria guias para ajudar o posicionamento dos passos
                // ******** //
                if (block.value.guias == `sim`) {
                    for (var i = 0; i < 1; i += 0.01) {
                        var guia = document.createElement(`div`);
                            guia.className = `guias-scrolly-animado`;
                            guia.setAttribute(`style`, `height: 1px; position: absolute; top: ${altura * i}px;`);
                            guia.innerHTML = i.toFixed(2);
                        passos.appendChild(guia);
                    }
                };
                embed.appendChild(animação);
                // ******** //
                // Anima a sequencia de imagens quando entra no viewport
                // ******** //
                document.querySelectorAll(`.scrolly-animado`).forEach(i => {
                    new IntersectionObserver((entries) => {                
                        entries.forEach(entry => {
                            if (entry.isIntersecting) {
                                entry.target.classList.add(`carregado`);
                            } else {
                                entry.target.classList.remove(`carregado`);
                            }
                        });
                    }, {rootMargin: `6% 0px 6% 0px`, threshold: 0}).observe(i);
                });
                // ******** //
                document.querySelectorAll(`.scrolly-animado > div`).forEach(i => {
                    new IntersectionObserver((entries) => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting) {
                                var imagemInicial = entry.target.querySelector(`img`);
                                    if (window.innerWidth < 480 && imagemInicial) {
                                        imagemInicial.src = imagemInicial.getAttribute(`data-src-mobile`);
                                    } else if (window.innerWidth >= 480 && imagemInicial) {
                                        imagemInicial.src = imagemInicial.getAttribute(`data-src`);
                                    }

                                var imagens = [];
                                    for (var i = 1; i <= block.value.framesTotais; i++) {
                                        if (window.innerWidth < 480) {
                                            imagens.push(`https://arte.estadao.com.br/public/pages/${uvaPath}` + i.toString().padStart(4, `0`) + `-mobile.jpg`);
                                            //imagens.push(`img/` + i.toString().padStart(4, `0`) + `-mobile.jpg`);
                                        } else if (window.innerWidth >= 480) {
                                            imagens.push(`https://arte.estadao.com.br/public/pages/${uvaPath}` + i.toString().padStart(4, `0`) + `.jpg`);
                                            //imagens.push(`img/` + i.toString().padStart(4, `0`) + `.jpg`);
                                        }
                                    }

                                // Versão com imagens carregadas dinamicamente
                                var repositorioDaImagem = document.querySelector(`#${block.value.id} > div > figure > img`);
                                var controller = new ScrollMagic.Controller();
                                var obj = { curImg: 0 };
                                var imageTween = TweenMax.to(obj, 0.5, {
                                    curImg: imagens.length - 1,
                                    roundProps: 'curImg',
                                    repeat: 0,
                                    immediateRender: true,
                                    ease: Linear.easeNone,
                                    onUpdate: function () {
                                        if (obj.curImg < imagens.length - 1) {
                                            repositorioDaImagem.src = imagens[obj.curImg];
                                        } else {
                                            scene.destroy(true);
                                        }
                                    }
                                });
                                scene = new ScrollMagic.Scene({
                                    triggerElement: entry.target,
                                    duration: altura,
                                    })
                                    .setTween(imageTween)
                                    .addTo(controller);
                                    }

                                // Versão com imagens pré-carregadas
                                // var imagensCarregadas = [];
                                //     for (var i = 0; i < imagens.length; i++) {
                                //         var img = new Image();
                                //             img.src = imagens[i];
                                //             imagensCarregadas.push(img);
                                //     }
                                // var controller = new ScrollMagic.Controller();
                                // var obj = { curImg: 0 };
                                // var imageTween = TweenMax.to(obj, 0.5, {
                                //     curImg: imagensCarregadas.length - 1,
                                //     roundProps: 'curImg',
                                //     repeat: 0,
                                //     immediateRender: true,
                                //     ease: Linear.easeNone,
                                //     onUpdate: function () {
                                //         repositorioDaImagem.src = imagensCarregadas[obj.curImg].src;
                                //         if (obj.curImg == imagensCarregadas.length - 1) {
                                //             scene.destroy(true);
                                //         }
                                //     }
                                // });
                                // scene = new ScrollMagic.Scene({
                                // triggerElement: entry.target,
                                // duration: altura,
                                // })
                                // .setTween(imageTween)
                                // .addTo(controller);
                                // }
                        });
                    }, { rootMargin: `0px 0px 95% 0px`, threshold: 0 }).observe(i);
                });
            break;
            // ******** //
            case `audio`:
                var audio = document.createElement(`div`);
                    audio.setAttribute(`aria-label`, `audio`);
                    audio.className = `uva-repositorio-media P`;
                    audio.innerHTML = `<audio class='uva-audio' controls preload='none'>
                                            <source 
                                                src='https://arte.estadao.com.br/public/pages/` + uvaPath + `${block.value.fonte}' 
                                                type='audio/mp3'
                                            >
                                        </audio>`;
                embed.appendChild(audio);
            break;
            // ******** //
            case `customização`:
                if (block.value.CSS == `sim`) {
                    var customizacaoCSS = document.createElement(`link`);
                        customizacaoCSS.rel = `stylesheet`;
                        customizacaoCSS.type = `text/css`;
                        customizacaoCSS.href = `https://arte.estadao.com.br/public/pages/` + uvaPath + `custom.css?v=${versao()}`;
                    embed.appendChild(customizacaoCSS);
                }
                if (block.value.JS == `sim`) {
                    var customizacaoJS = document.createElement(`script`);
                        customizacaoJS.async = true;
                        customizacaoJS.defer = true;
                        customizacaoJS.type= `text/javascript`;
                        customizacaoJS.src = `https://arte.estadao.com.br/public/pages/` + uvaPath + `custom.js?v=${versao()}`;
                    document.body.parentNode.insertBefore(customizacaoJS, document.body.nextSibling);
                }  
            break;
            // ******** //
            case `estanteDeLivros`:
                var estanteDeLivros = document.createElement(`div`);
                    estanteDeLivros.setAttribute(`aria-label`, `estante de livros`);
                    estanteDeLivros.className = `uva-repositorio-estante-de-livros P`;
                    estanteDeLivros.innerHTML = 
                        `<div>
                            <div class='uva-repositorio-media uva-estante-de-livros-imagem'>
                                <figure>
                                    <img itemprop='image' src='https://www.estadao.com.br${block.value.fonte}' src-mobile='https://www.estadao.com.br${block.value.fonte}' alt='${block.value.titulo}, por ${block.value.autor}' />
                                </figure>
                            </div>
                            <div class='uva-estante-de-livros-ficha'>
                                <h4 class='uva-estante-de-livros-genero' item-prop='genre'>${block.value.genero}</h4>
                                <h3 class='uva-estante-de-livros-titulo' item-prop='title'>${block.value.titulo}</h3>
                                <p class='uva-estante-de-livros-autor' itemprop='author'><strong>${block.value.autor}</strong></p>
                                <p class='uva-estante-de-livros-complemento' itemprop='complement'>${block.value.complemento}</p>
                                <p class='uva-estante-de-livros-editora' itemprop='publisher'>Editora ${block.value.editora}</p>
                                <p class='uva-estante-de-livros-preco'>
                                    <span class='uva-estante-de-livros-paginas' itemprop='pages'>${block.value.paginas}</span> • 
                                    <span class='uva-estante-de-livros-valor' itemprop='price'>${block.value.valor}</span>
                                </p>
                                    <button class='uva-botao uva-estante-de-livros-comprar'>Comprar ▾</button>
                            </div>
                        </div>`;
                        if (block.value.complemento == undefined) {
                            estanteDeLivros.querySelector(`.uva-estante-de-livros-complemento`).remove();
                        };
                    estanteDeLivros.innerHTML +=
                        `<div class='uva-estante-de-livros-descricao'>
                            <p class='uva-corpo' itemprop='description'>
                                ${block.value.texto} •
                                <span class='uva-estante-de-livros-assinatura'><strong> ${block.value.assinatura}</strong></span>
                            </p>
                        </div>`;
                        if (block.value.assinatura == undefined) {
                            estanteDeLivros.querySelector(`.uva-estante-de-livros-assinatura`).remove();
                        };
                        if (block.value.comprar == undefined) {
                            estanteDeLivros.querySelector(`.uva-estante-de-livros-comprar`).remove();
                        };
                embed.appendChild(estanteDeLivros);
                if (block.value.comprar != undefined) {
                    var estante = document.querySelectorAll(`[aria-label='estante de livros']`);
                    for (var i = 0; i < estante.length; i++) {
                        estante[i].querySelector(`button`).addEventListener(`click`, function () {
                            if (document.querySelector(`.triangulo`) == null) {
                                this.style.backgroundColor = `var(--cor-c2-primaria)`;
                                var lojas = document.createElement(`ul`);
                                    lojas.className = `uva-estante-de-livros-lojas`;
                                    for (var i = 0; i < block.value.comprar.length; i++) {
                                        lojas.innerHTML +=
                                            `<li class='uva-estante-de-livros-loja'>
                                                <a href='${block.value.comprar[i].link}' target='_blank' rel='noopener noreferrer'>${block.value.comprar[i].nome}</a>
                                            </li>`;
                                    }
                                this.after(lojas);
                                var trianguloSombra = document.createElement(`div`);
                                    trianguloSombra.className = `trianguloSombra`;
                                this.after(trianguloSombra);
                                var triangulo = document.createElement(`div`);
                                    triangulo.className = `triangulo`;
                                this.after(triangulo);
                            } else {
                                this.style.removeProperty(`background-color`);
                                document.querySelector(`.triangulo`).remove();
                                document.querySelector(`.trianguloSombra`).remove();
                                document.querySelector(`.uva-estante-de-livros-lojas`).remove();
                            }
                        });
                    }
                }
                function indice () {
                    var estante = document.querySelectorAll(`[aria-label='estante de livros']`);
                    for (var i = 0; i < estante.length; i++) {
                        estante[i].setAttribute(`livro`, i+1);
                    }
                }
                indice();
            break;
            // ******** //
            case `gráfico`:
                var grafico = document.createElement(`div`);
                    grafico.ariaLabel = `grafico`;
                    if (block.value.id !== undefined) {
                        grafico.id = block.value.id;
                    }
                    grafico.className = `uva-repositorio-media ` + block.value.classe + block.value.tamanho;
                embed.appendChild(grafico);
                // ******** //
                // Cria o script para receber o gráfico do Uva quando entra no viewport
                // ******** //
                var disparaGraficoUva = {rootMargin: `0px 0px 100px 0px`, threshold: 0};
                    containerGrafico = [...document.querySelectorAll(`[aria-label='grafico']`)];
                    carregacontainerGrafico = new IntersectionObserver(carregada, disparaGraficoUva);
                containerGrafico.forEach(i => {carregacontainerGrafico.observe(i);});
                function carregada(entries, observer) {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            var figure = document.createElement(`script`);
                                figure.type = `text/javascript`;
                                figure.className = `uva-grafico`;
                                figure.setAttribute(`data-uva-id`, block.value.fonte);
                                figure.setAttribute(`data-show-title`, boolean(block.value.mostrar_título));
                                figure.setAttribute(`data-show-description`, boolean(block.value.mostrar_descrição));
                                figure.setAttribute(`data-show-brand`, boolean(block.value.mostrar_marca));
                                figure.setAttribute(`src`, `https://arte.estadao.com.br/uva/scripts/embed.min.js`);
                                figure.onerror = function() {
                                    var erro = document.createElement(`figure`);
                                        erro.className = `uva-grafico-fallback`;
                                        erro.innerHTML = 
                                        `<img 
                                            src='https://arte.estadao.com.br/uva/content/drafts/${block.value.fonte}/1/uploads/fallback.jpg' 
                                            alt='Gráfico indisponível'
                                        />`;
                                    grafico.appendChild(erro);
                                };
                            grafico.appendChild(figure);
                            observer.unobserve(entry.target);
                        }
                    });
                }
            break;
            // ******** //
            case `html`:
                var HTML = document.createElement(`div`);
                    HTML.ariaLabel = `codigo customizado`;
                    HTML.className = `uva-codigo ` + block.value.tamanho;
                var conteudoHTML = block.value.conteúdo.map (i => {
                    if (i.type == `text`) {
                        return i.value;
                    }
                }).join(``);
                HTML.innerHTML = conteudoHTML;
            embed.appendChild(HTML);
            break;
            // ******** //
            case `imagem`:
                var figure = document.createElement(`figure`);
                    figure.ariaLabel = `imagem`;
                    if (block.value.id !== undefined) {
                        figure.id = block.value.id;
                    }
                    figure.className = `uva-repositorio-media ` + block.value.tamanho;
                    figure.innerHTML = 
                        `<img 
                            width='180' 
                            height='120'
                            class='uva-imagem ${block.value.classe}' 
                            data-src='https://www.estadao.com.br${block.value.fonte}'
                            data-src-mobile='https://www.estadao.com.br${block.value.fonte}'
                            alt='${block.value.legenda}'
                        />`;
                        figure.innerHTML += 
                            `<figcaption class='uva-legenda'>
                                <span class='uva-legenda'>${block.value.legenda} • </span>
                                <span class='uva-creditos'>${block.value.crédito}</span>
                            </figcaption>`
                        if (block.value.mostrarLegenda == `não`) {
                            figure.querySelector(`.uva-legenda > span`).remove();
                            figure.querySelector(`.uva-legenda`).style = `text-align: right;`;
                        };
                embed.appendChild(figure);
                
            break;
            // ******** //
            case `quiz`: 
                var divQuiz = document.createElement(`div`);
                var score = 0;
                var divScore = document.createElement(`div`);
                divScore.className = `uva-quiz-container-score`;
                divQuiz.ariaLabel = `quiz`;
                divQuiz.className = `uva-quiz`;
                for (var i = 0; i < block.value.conteúdo.length; i++) {
                        var html = `<div class='uva-quiz-questao nao-respondida'>`;
                        html += `<div class='uva-quiz-contador P'>${i+1} de ${block.value.conteúdo.length}</div>`;
                    if (block.value.conteúdo[i].type == `questão`) {
                        var audio = block.value.conteúdo[i].value.audio;
                        if (audio !== undefined) {
                            html += `<div aria-label='audio' class='uva-repositorio-media ${audio.tamanho}'>`;
                            html += `<audio
                                        class='uva-audio'
                                        controls
                                        preload='none'
                                        data-src='https://arte.estadao.com.br/public/pages/` + uvaPath + `${audio.fonte}'
                                    >`;
                            html += `<source src='https://arte.estadao.com.br/public/pages/` + uvaPath + `${audio.fonte}'>`;
                            html += `</audio>`;
                            html += `</div>`;
                        }
                        html += `<h3 class='uva-quiz-pergunta P'>${block.value.conteúdo[i].value.pergunta}</h3>`
                        var image = block.value.conteúdo[i].value.imagem;
                        if (image !== undefined) {
                            html += `<figure class='uva-repositorio-media ${image.tamanho}'>`;
                            html += `<img
                                        width= ${image.largura}
                                        height= ${image.altura}
                                        class='uva-imagem ${image.classe}'
                                        data-src='https://estadao.com.br${image.fonte}'
                                        data-src-mobile='https://estadao.com.br${image.fonte}'
                                        alt='${image.legenda}'
                                    />`;
                            if (image.mostrarLegenda == `sim`) {
                                html += `<figcaption class='uva-legenda'>`;
                                html += `<span class='uva-legenda'>${image.legenda} • </span>`;
                                html += `<span class='uva-creditos'>${image.crédito}</span>`;
                                html += `</figcaption>`;
                                html += `</figure>`;
                            }
                            if (image.mostrarLegenda == `não`) {
                                html += `<figcaption class='uva-legenda' style='text-align:right'>`;
                                html += `<span class='uva-creditos'>${image.crédito}</span>`;
                                html += `</figcaption>`;
                                html += `</figure>`;
                            }
                        }
                        var youtube = block.value.conteúdo[i].value.youtube;
                        if (youtube !== undefined) {
                            html += `<figure class='uva-repositorio-media ${youtube.tamanho}'>
                                        <div class='uva-video'>
                                            <iframe data-src='https://www.youtube.com/embed/${youtube.fonte}' title='Vídeo do Youtube' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>
                                        </div>
                                    </figure>`;
                        }
                        for (var j = 0; j < block.value.conteúdo[i].value.alternativas.length; j++) {
                            html += `<div class='uva-quiz-alternativas P'><button data-index='${j}' class='uva-botao uva-quiz-alternativa P'>${block.value.conteúdo[i].value.alternativas[j].value}</button></div>`
                        }
                        html += `</div>`;
                        divQuiz.innerHTML += html;
                    }
                }
                divQuiz.appendChild(divScore);
                embed.appendChild(divQuiz);
                // // ******** //
                // // Ao clicar em uma alternativa adiciona classes, remove outras, desabilita os botões, conta e mostra a resposta
                // // ******** //
                var questaoNaoRespondida = [...document.querySelectorAll(`.uva-quiz-questao.nao-respondida`)];
                var botões = questaoNaoRespondida.map(i => [...i.querySelectorAll(`.uva-quiz-alternativa`)]);
                for (var i = 0; i < botões.length; i++) {
                    for (var j = 0; j < botões[i].length; j++) {
                        botões[i][j].addEventListener(`click`, function() {
                            var selecionada = this;
                            var selecionadaValue = this.innerHTML;
                            for (var i = 0; i < block.value.conteúdo.length; i++) {
                                if (block.value.conteúdo[i].type == `questão`) {
                                    var respostas = block.value.conteúdo[i].value.resposta;
                                    var explicações = block.value.conteúdo[i].value.explicação;
                                    for (var j = 0; j < block.value.conteúdo[i].value.alternativas.length; j++) {
                                        if (block.value.conteúdo[i].value.alternativas[j].value == selecionadaValue) {
                                            var resposta = respostas;
                                            var explicaçãoMap = explicações;
                                            var explicaçãoJoin = explicaçãoMap.map (i => {
                                                if (i.type == `text`) {
                                                    return `<p class='uva-quiz-resposta-correta P'>${i.value}</p>`
                                                }
                                                if (i.type == `imagem`) {
                                                    return `<figure 
                                                                aria-label='imagem' 
                                                                class='uva-repositorio-media ${i.value.tamanho} carregada'>
                                                                <img class='uva-imagem' src='https://estadao.com.br${i.value.fonte}' 
                                                                alt='${i.value.legenda}
                                                            '>
                                                                <figcaption class='uva-legenda' style='text-align:right'>
                                                                    <span class='uva-creditos'>${i.value.crédito}</span>
                                                                </figcaption>
                                                            </figure>`
                                                }
                                                if (i.type == `youtube`) {
                                                    return `<figure class='uva-repositorio-media ${i.value.tamanho} carregada'>
                                                                <div class='uva-video'>
                                                                    <iframe src='https://www.youtube.com/embed/${i.value.fonte}' title='Vídeo do Youtube' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>
                                                                </div>
                                                            </figure>`
                                                }
                                            })
                                            var explicação = explicaçãoJoin.join(``);
                                            if (selecionadaValue == resposta) {
                                                questaoNaoRespondida[i].classList.remove(`nao-respondida`);
                                                questaoNaoRespondida[i].classList.add(`respondida`);
                                                var divResposta = document.createElement(`div`);
                                                divResposta.className = `uva-quiz-resposta`;
                                                divResposta.innerHTML = `<p class='uva-quiz-resposta-correta P' style='margin-bottom: calc(var(--margem-vertical) * -0.5)'><span class='correta'>Você acertou! 😃</span> </p>${explicação}`
                                                questaoNaoRespondida[i].appendChild(divResposta);
                                                botões[i].forEach(i => i.disabled = true);
                                                botões[i].forEach(i => i.classList.add(`respondida`));
                                                selecionada.classList.add(`selecionada`);
                                                selecionada.classList.add(`correta`);
                                                score += 1;
                                                if (score == 0) {
                                                    divScore.innerHTML = `<div class='uva-quiz-score P'>Você não acertou nenhuma questão. 😢</div>`;
                                                }
                                                if (score < block.value.conteúdo.length) {
                                                    divScore.innerHTML = `<div class='uva-quiz-score P'>É um bom começo! 🎉 Você acertou ${score} de ${block.value.conteúdo.length} questões</div>`;
                                                } if (score == block.value.conteúdo.length) {
                                                    divScore.innerHTML = `<div class='uva-quiz-score P'>Parabéns! 🎉 Você acertou todas as questões!</div>`
                                                }
                                            } else {
                                                questaoNaoRespondida[i].classList.remove(`nao-respondida`);
                                                questaoNaoRespondida[i].classList.add(`respondida`);
                                                var divResposta = document.createElement(`div`);
                                                divResposta.className = `uva-quiz-resposta`;
                                                divResposta.innerHTML = `<p class='uva-quiz-resposta-correta P' style='margin-bottom: calc(var(--margem-vertical) * -0.5)'><span class='incorreta'>Você não acertou!</span> 😩</p>${explicação}`;
                                                questaoNaoRespondida[i].appendChild(divResposta);
                                                botões[i].forEach(i => i.disabled = true);
                                                botões[i].forEach(i => i.classList.add(`respondida`));
                                                selecionada.classList.add(`selecionada`);
                                                selecionada.classList.add(`incorreta`);
                                                var textoBotoes = botões[i].map(i => i.innerHTML);
                                                for (var e = 0; e < textoBotoes.length; e++) {
                                                    if (textoBotoes[e] == resposta) {
                                                        botões[i][e].classList.add(`correta`);
                                                    }
                                                }
                                                if (score == 0) {
                                                    divScore.innerHTML = `<div class='uva-quiz-score P'>Você não acertou nenhuma questão. 😢</div>`;
                                                }
                                                else {
                                                    divScore.innerHTML = `<div class='uva-quiz-score P'>É um bom começo! 🎉 Você acertou ${score} de ${block.value.conteúdo.length} questões</div>`;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        });
                    }
                }
                break;
            // ******** //
            case `mudaFundo`:
                var div = document.createElement(`div`);
                    div.setAttribute(`aria-label`, `muda background`);
                    div.className = `uva-repositorio-mudaFundo`;
                    embed.appendChild(div);
                    // ******** //
                    // Anima o vídeo quando entra no viewport
                    // ******** //
                    var dispara_nasVista = {rootMargin: `0px 0px 0px 0px`, threshold: 0};
                        container_nasVista = [...document.querySelectorAll(`.uva-repositorio-mudaFundo`)];
                        carrega_nasVista = new IntersectionObserver(nasVista, dispara_nasVista);
                    container_nasVista.forEach(i => {carrega_nasVista.observe(i);});
                    function nasVista(entries) {
                        entries.forEach(entry => {
                            if (entry.isIntersecting) {
                                document.body.style.background = block.value.corNova;
                            }
                            else {
                                document.body.style.background = block.value.corOriginal;
                            }
                        });
                    }
            break;
            // ******** //
            case `navegador`:
                var navegador = document.createElement(`div`);
                    navegador.setAttribute(`aria-label`, `uva-navegador`);
                    navegador.className = `uva-repositorio-navegador P`;
                    div = document.createElement(`div`);
                    navegador.appendChild(div);
                    if (block.value.anterior !== undefined) {
                        div.innerHTML += `<div><a href='${block.value.anterior}'>‹ Anterior</a></div>`;
                    }
                    div.innerHTML += `<figure aria-label='imagem'><img class='uva-imagem' data-src='https://arte.estadao.com.br/arc/images/${block.value.fonte}' data-src-mobile='https://arte.estadao.com.br/arc/images/${block.value.fonte}' alt='Aliás – Estante de Livros'></figure>`;
                    if (block.value.próximo !== undefined) {
                        div.innerHTML += `<div><a href='${block.value.próximo}'>Próxima ›</a></div>`;
                    }
                embed.appendChild(navegador);
                var viewportWidth = window.innerWidth;
                    width = (viewportWidth >= 480) ? block.value.larguraDesk : block.value.larguraMobile;
                    divs = document.querySelectorAll('.uva-repositorio-navegador > div > figure');
                    divs.forEach(function(div) {
                        div.style.width = width;
                    });
            break
            // ******** //
            case `scrolly`:
                var scrolly = document.createElement(`div`);
                    scrolly.setAttribute(`aria-label`, `scrollytelling`);
                    if (block.value.id !== undefined) {
                        scrolly.id = block.value.id;
                    }
                    scrolly.className = `uva-repositorio-scrollyTelling ${block.value.classe} ${block.value.tamanho}`;
                    var fundos = document.createElement(`div`);
                        fundos.className = `fundos`;
                for (var i = 0; i < block.value.conteúdo.length; i++) {
                    var conteúdo = block.value.conteúdo[i];
                        if (conteúdo.value.uva !== undefined) {
                            var fundo = document.createElement(`div`);
                                fundo.setAttribute('data-index', i+1);
                                fundo.className = `fundo`;
                            var script = document.createElement(`script`);
                                script.setAttribute('type', 'text/javascript');
                                script.className = `uva-imagem`;
                                script.setAttribute('data-uva-id', conteúdo.value.uva);
                                script.setAttribute('data-show-title', 'false');
                                script.setAttribute('data-show-description', 'false');
                                script.setAttribute('data-show-brand', 'false');
                            fundo.appendChild(script);
                        }
                        if (conteúdo.value.imagemDesk !== undefined) {
                            var fundo = document.createElement(`div`);
                                fundo.setAttribute(`data-index`, i+1);
                                fundo.className = `fundo`;
                            var figure = document.createElement(`figure`);
                                figure.ariaLabel = `imagem`;
                                figure.className = `uva-repositorio-media`;
                                figure.innerHTML = 
                                    `<img
                                        width='180px'
                                        height='120px' 
                                        class='uva-imagem' 
                                        data-src='https://estadao.com.br${conteúdo.value.imagemDesk}'
                                        data-src-mobile='https://estadao.com.br${conteúdo.value.imagemMobile}'
                                        alt='${conteúdo.value.legenda}'
                                        style='height: 100vh;'
                                    />`;
                            fundo.appendChild(figure);
                        }
                        if (conteúdo.value.videoDesk !== undefined) {
                            var fundo = document.createElement(`div`);
                                fundo.setAttribute(`data-index`, i+1);
                                fundo.className = `fundo`;
                            var video = document.createElement(`figure`);
                                video.ariaLabel = `video`;
                                video.className = `uva-repositorio-media`;
                                video.innerHTML =
                                    `<video
                                        class='uva-video'
                                        preload= auto
                                        playsinline = true
                                        autoplay = true
                                        muted = true
                                        loop = true
                                        data-src='${conteúdo.value.videoDesk}'
                                        data-src-mobile='${conteúdo.value.videoMobile}'
                                        style='height: 100vh; margin:0' 
                                    />`;
                            fundo.appendChild(video);
                        }
                    fundos.appendChild(fundo);
                    scrolly.appendChild(fundos);
                }
                var passos = document.createElement(`div`);
                    passos.className = `passos`;
                        for (var i = 0; i < block.value.conteúdo.length; i++) {
                            var conteúdo = block.value.conteúdo[i];
                            var passo = document.createElement(`div`);
                                passo.setAttribute(`data-index`, i+1);
                                passo.className = `passo`;
                                    if (conteúdo.value.classe !== undefined) {
                                        passo.className += ` ${conteúdo.value.classe}`;
                                    }
                                passo.innerHTML = `<p class='uva-corpo'>${conteúdo.value.texto}</p>`;
                                    if (conteúdo.value.transformações !== undefined) {
                                        passo.setAttribute(`data-transform`, conteúdo.value.transformações);
                                    }
                            passos.appendChild(passo);
                            scrolly.appendChild(passos);
                        }
                embed.appendChild(scrolly);
                // ******** //
                // Scrollytelling: dispara um trigger no background quando o componente entra no viewport
                // ******** //
                var disparaScrollytelling = {rootMargin: `6% 0px 6% 0px`, threshold: 0};
                    carregaContainerScrollytelling = new IntersectionObserver(scrollytellingCarregado, disparaScrollytelling);
                    containerScrollyTelling = [...document.querySelectorAll(`.uva-repositorio-scrollyTelling`)];
                containerScrollyTelling.forEach(i => {carregaContainerScrollytelling.observe(i);});
                function scrollytellingCarregado(entries) {
                    entries.forEach(entry => {
                        if (entry.isIntersecting ) {
                            entry.target.classList.add(`carregado`);
                                script = document.querySelector(`.uva-repositorio-scrollyTelling.carregado > div.fundos > div[data-index='1'] > script`);
                                    if (script !== null) {
                                        script.setAttribute('src', 'https://arte.estadao.com.br/uva/scripts/embed.min.js')
                                    }
                                video = document.querySelector(`.uva-repositorio-scrollyTelling.carregado > div.fundos > div[data-index='1'] > figure > video`);
                                if (video !== null) {
                                    if (window.innerWidth < 480) {
                                        video.src = video.getAttribute('data-src-mobile');
                                    } else if (window.innerWidth >= 480) {
                                        video.src = video.getAttribute('data-src');
                                    }
                                }
                            } else {
                                entry.target.classList.remove(`carregado`);
                            }
                        var disparaPassos = {rootMargin: `0px 0px 0px 0px`, threshold: 0};
                            carregaPassos = new IntersectionObserver(passosCarregado, disparaPassos);
                            containerPassos = [...document.querySelectorAll(`.uva-repositorio-scrollyTelling.carregado > div > div.passo`)];
                        containerPassos.forEach(i => {carregaPassos.observe(i);});
                            function passosCarregado(entries) {
                                entries.forEach(entry => {                    
                                    if (entry.isIntersecting) {
                                        entry.target.classList.add('carregado');
                                            var fundo = document.querySelector(`.uva-repositorio-scrollyTelling.carregado > div.fundos > div[data-index='${entry.target.dataset.index}']`);
                                                if (fundo !== null) {
                                                    fundo.classList.add('carregado');
                                                    if (entry.isIntersecting && entry.target !== containerPassos[0]) {       
                                                        script = fundo.querySelector(`[data-index='${entry.target.dataset.index}'] > script`);
                                                            if (script !== null) {
                                                                script.setAttribute('src', 'https://arte.estadao.com.br/uva/scripts/embed.min.js')
                                                            }
                                                        video = document.querySelector(`.uva-repositorio-scrollyTelling.carregado > div.fundos > div[data-index='${entry.target.dataset.index}'] > figure > video`);
                                                            if (video !== null) {
                                                                if (window.innerWidth < 480) {
                                                                    video.src = video.getAttribute('data-src-mobile');
                                                                } else if (window.innerWidth >= 480) {
                                                                    video.src = video.getAttribute('data-src');
                                                                }
                                                            }
                                                    }
                                                }
                                            var fundos = document.querySelector(`.uva-repositorio-scrollyTelling.carregado > div.fundos`);
                                                if (fundos !== null) {
                                                    fundos.style.setProperty('-webkit-transform', entry.target.dataset.transform);
                                                }
                                    } else {
                                            entry.target.classList.remove('carregado');
                                            var fundo = document.querySelector(`.uva-repositorio-scrollyTelling.carregado > div.fundos > div[data-index='${entry.target.dataset.index}']`);
                                            if (fundo !== null) {
                                                fundo.classList.remove('carregado');
                                            }
                                    }
                            });
                        }
                    });
                }
            break;
            // ******** //
            case `separador`:
                var separador = document.createElement(`hr`);
                    separador.className = `uva-separador-pontilhado`;
                embed.appendChild(separador);
            break;
            // ******** //
            case `testeira`:
                var testeira = document.createElement(`div`);
                    testeira.className = `uva-repositorio-media-testeira P`;
                    testeira.innerHTML = `
                        <a href='${block.value.link}' target='_blank'>
                            <figure aria-label='imagem' class='uva-testeira'>
                                <img width='180' height='120' class='uva-imagem' data-src='https://arte.estadao.com.br/public/pages/` + uvaPath + `${block.value.fonte}' data-src-mobile='https://arte.estadao.com.br/public/pages/` + uvaPath + `${block.value.fonte}'alt='${block.value.descrição}' style='border-radius: 0px'/>
                            </figure>
                        </a>`;
                    larguraDaTela = window.innerWidth;
                    imagem = testeira.querySelector(`figure`);
                        if (larguraDaTela > 580) {
                            imagem.setAttribute('style', `width: ${block.value.larguraDesk}`);
                        } else {
                            imagem.setAttribute('style', `width: ${block.value.larguraMobile}`);
                        }
                    window.addEventListener('resize', function() {
                        var larguraDaTela = window.innerWidth;
                            imagem = testeira.querySelector(`figure`);
                                if (larguraDaTela > 580) {
                                    imagem.setAttribute('style', `width: ${block.value.larguraDesk}`);
                                } else {
                                    imagem.setAttribute('style', `width: ${block.value.larguraMobile}`);
                                }
                    });
                embed.appendChild(testeira);
            break;
            // ******** //
            case `text`:
                var texto = document.createElement(`p`);
                    texto.className = `uva-corpo`;
                    texto.innerHTML = block.value;
                embed.appendChild(texto);
            break;
            // ******** //
            case `título`:
                var h3 = document.createElement(`h3`);
                    h3.className = `uva-subtitulo`;
                    h3.innerHTML = block.value;
                embed.appendChild(h3);
            break;
            // ******** //
            case `vídeo`:
                var vídeo = document.createElement(`figure`);
                    vídeo.setAttribute('aria-label', 'video');
                        if (block.value.id !== undefined) {
                            vídeo.id = block.value.id;
                        }
                    vídeo.className = `uva-repositorio-media ${block.value.tamanho}`;
                    vídeo.innerHTML = 
                        `<video
                            width='180'
                            height='120'
                            class='uva-video'
                            playsinline=${boolean(block.value.playsinline)}
                            autoplay=${boolean(block.value.autoplay)}
                            muted=${boolean(block.value.muted)}
                            preload=${boolean(block.value.preload)}
                            loop=${boolean(block.value.loop)}
                            data-src=${block.value.fonteDesk}
                            data-src-mobile=${block.value.fonteMobile}
                            data-poster=${block.value.posterDesk}
                            data-poster-mobile=${block.value.posterMobile}>`;
                            //legenda
                            if (block.value.mostrarLegenda == `sim`) { 
                                vídeo.innerHTML += 
                                    `<figcaption class='uva-legenda'>
                                        <span class='uva-legenda'>${block.value.legenda} • </span>
                                        <span class='uva-creditos'>${block.value.crédito}</span>
                                    </figcaption>`
                            };
                embed.appendChild(vídeo);
                // ******** //
                // Troca data-src por src no video //
                // ******** //
                var containerVideo = [...document.querySelectorAll('video.uva-video')];
                    containerVideo.forEach(i => {new IntersectionObserver(trocaSourceVideo, {rootMargin: '6% 0px 6% 0px', threshold: 0}).observe(i);});
                    function trocaSourceVideo(entries, observer) {
                        entries.forEach(entry => {
                            if (entry.isIntersecting) {
                                // mobile
                                if(window.innerWidth < 480){
                                    entry.target.src = entry.target.getAttribute('data-src-mobile');
                                }
                                // desktop
                                else if (window.innerWidth >= 480){
                                    entry.target.src = entry.target.getAttribute('data-src');
                                }
                                var video = document.querySelectorAll(`.uva-repositorio-media.carregada > video`);
                                    for (var i = 0; i < video.length; i++) {
                                        var width = video[i].clientWidth;
                                            height = video[i].clientHeight;
                                            video[i].setAttribute(`width`, width);
                                            video[i].setAttribute(`height`, height);
                                    }
                                    // ******** //
                                    // Redimensiona a imagem quando o usuário redimensiona a tela
                                    // ******** //
                                    window.addEventListener(`resize`, function(){
                                        if (entry.target.nodeName === `img`) {
                                            entry.target.setAttribute(`width`, entry.target.clientWidth);
                                            entry.target.setAttribute(`height`, entry.target.clientHeight);
                                        }
                                    });
                                    // Toca e pausa o vídeo quando entra e sai do viewport
                                    if (entry.isIntersecting) {
                                        entry.target.play();
                                    } else if (!entry.isIntersecting) {
                                        entry.target.pause();
                                    }
                                observer.unobserve(entry.target);
                            }
                        });
                    }
            break;
            // ******** //
            case `youtube`:
                var youtube = document.createElement(`div`);
                    youtube.className = `uva-repositorio-media ${block.value.tamanho}`;
                    youtube.innerHTML =
                        `<figure class='uva-video'>
                                <iframe data-src='https://www.youtube.com/embed/${block.value.fonte}' title='Vídeo do Youtube' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>
                        </figure>`;
                embed.appendChild(youtube);
                // ******** //
                // Troca data-src por src em um video do Youtube //
                // ******** //
                var videoYoutube = [...document.querySelectorAll('.uva-video > iframe')];
                    videoYoutube.forEach(i => {new IntersectionObserver(trocaSourceVideoYoutube, {rootMargin: '6% 0px 5% 0px', threshold: 0}).observe(i);});
                    function trocaSourceVideoYoutube(entries, observer) {
                        entries.forEach(entry => {
                            if (entry.isIntersecting) {
                                    entry.target.src = entry.target.getAttribute('data-src');
                                    observer.unobserve(entry.target);
                                }
                        });
                    }
            break;
            // ******** //
            default:
                var blockDefault = document.createElement(`custom-archieml`);
                    blockDefault.setAttribute(`data-value`, JSON.stringify(block).replace(/"/g, `'`));
                    embed.appendChild(blockDefault);
            break;
        }
    });
    // ******** //
    // Aplica uma classe no repositório de mídias. Esta função precisa estar fora do render para funcionar em todas os containers de mídia
    // ******** //
    var disparaContainerImagem = {rootMargin: `0px 0px 6% 0px`, threshold: 0};
        carregaContainerImagem = new IntersectionObserver(carregada, disparaContainerImagem);
        containerImagem = [...document.querySelectorAll(`.uva-repositorio-media`)];
        containerImagem.forEach(i => {carregaContainerImagem.observe(i);});
        function carregada(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(`carregada`);
                    // ******** //
                    // Define largura e altura da imagem
                    // ******** //
                    var imagem = document.querySelectorAll(`.uva-repositorio-media.carregada > img`);
                        for (var i = 0; i < imagem.length; i++) {
                            var height = imagem[i].clientHeight;
                                width = imagem[i].clientWidth;
                                imagem[i].setAttribute(`height`, height);
                                imagem[i].setAttribute(`width`, width);
                        }
                    // ******** //
                    // Ajusta a altura da lombada e da contra-capa da estante de livros
                    // ******** //
                    var livro = document.querySelectorAll(`.uva-repositorio-media.uva-estante-de-livros-imagem.carregada > figure`);
                        for (var i = 0; i < livro.length; i++) {
                            var imagem = livro[i].querySelector(`img`);
                                height = imagem.clientHeight;
                                width = imagem.clientWidth;
                                imagem.setAttribute(`height`, height);
                                imagem.setAttribute(`width`, width);
                                livro[i].setAttribute(`style`, `height: ${height}px`);
                            var lombada = livro[i].style;
                                lombada.setProperty(`--lombada`, `${height - 12}px`);
                            var contraCapa = livro[i].style;
                                contraCapa.setProperty(`--contraCapa`, `${height}px`);
                        }
                    observer.unobserve(entry.target); 
                }
            })
        };
    // ******** //
    // Troca data-src por src na imagem quando entra no viewport. Esta função precisa estar fora do render para funcionar em todas as imagens
    // ******** //
    var disparaImagem = {rootMargin: `0px 0px 15% 0px`, threshold: 0};
        carregaImagem = new IntersectionObserver(trocaSourceImagem, disparaImagem);
        imagem = [...document.querySelectorAll(`.uva-imagem`)];
        imagem.forEach(i => {carregaImagem.observe(i);});
        function trocaSourceImagem(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    observer.observe(entry.target);
                        if (window.innerWidth < 480) {
                            entry.target.src = entry.target.getAttribute('data-src-mobile');
                        } else if (window.innerWidth >= 480) {
                            entry.target.src = entry.target.getAttribute('data-src');
                        }
                        // ******** //
                        // Redimensiona a imagem quando o usuário redimensiona a tela
                        // ******** //
                        window.addEventListener(`resize`, function(){
                            entry.target.setAttribute(`width`, entry.target.clientWidth);
                            entry.target.setAttribute(`height`, entry.target.clientHeight);
                        });
                    observer.unobserve(entry.target);
                }
            });
        }
    
});