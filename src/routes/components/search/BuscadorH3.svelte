<script>
	import Searchbox from './Searchbox.svelte';
	let searchTerm = "";

	function filter() {
		const headers = document.getElementsByTagName("h3");
		for (let i = 0; i < headers.length; i++) {
			const header = headers[i];
			const parentDiv = header.previousElementSibling;
			//console.log(parentDiv)
			//const p = parentDiv.querySelectorAll("p");
			const text = header.textContent.toLowerCase();
			const shouldShow = text.includes(searchTerm.toLowerCase());
			header.style.display = shouldShow ? "block" : "none";
		}
	}
	// const filter = () => {
	// 	return document.querySelectorAll("h3").forEach(h3 => {
	// 		let h3Text = h3.textContent.toLowerCase();
	// 		const parentDiv = h3.parentElement;
	// 		const p = parentDiv.querySelectorAll("p");
	// 		if (h3Text.includes(searchTerm.toLowerCase())) {
	// 			p.style.display = "block";
	// 		} else {
	// 			p.style.display = "none";
	// 		}
	// 		return h3.style.display = h3Text.includes(searchTerm.toLowerCase()) ? "block" : "none";
	// 	});
	// }
</script>

<Searchbox bind:searchTerm on:input={filter} />
	<!-- <div>
		<h3>Second Header com ã</h3>
		<p>This is the content for the second header.</p>
		<p>This is the content for the second header.</p>
		<p>This is the content for the second header.</p>
	</div>

	<div>
		<h3>Second Header com é</h3>
		<p>This is the content for the second header.</p>
	</div>

	<div>
		<h3>Third Header</h3>
		<p>This is the content for the third header.</p>
	</div> -->

<!-- <script>

export let searchTerm = "";

function filterHeaders() {
	const headers = document.getElementsByTagName("h3");
	for (let i = 0; i < headers.length; i++) {
		const header = headers[i];
		const text = header.textContent.toLowerCase();
		const shouldShow = text.includes(searchTerm.toLowerCase());
		header.style.display = shouldShow ? "block" : "none";
	}

}

$: filterHeaders();



	// function filtrar() {
	// 	let input, filter, selecionaPerguntas, mostraResposta, i, txtValue
	// 	input = document.getElementById('inputFiltro');
	// 	filter = input.value.replace(/[ÀÁÂÃÄÅàáâãäåAaÈÉÊËèéêëEeÌÍÎÏìíîïIiÒÓÔÕÕÖØòóôõöøOoÙÚÛÜùúûüUuÇçCc]/g, "AEIOUC");
	// 	selecionaPerguntas = document.getElementById('perguntas');
	// 	mostraResposta = selecionaPerguntas.getElementsByClassName('container_pergunta');

	// 	for (i = 0; i < mostraResposta.length; i++) {
	// 		resposta = mostraResposta[i].getElementsByTagName('h3')[0];

	// 		if (resposta) {
	// 			txtValue = resposta.textContent || resposta.innerText;
	// 			if (txtValue.replace(/[ÀÁÂÃÄÅàáâãäåAaÈÉÊËèéêëEeÌÍÎÏìíîïIiÒÓÔÕÕÖØòóôõöøOoÙÚÛÜùúûüUuÇçCc]/g, "AEIOUC").indexOf(filter) > -1) {
	// 				mostraResposta[i].style.display = '';
	// 			} else {
	// 				mostraResposta[i].style.display = 'none';
	// 			}
	// 		}
	// 	}
	// };


	//		function esconde (){
	//			let Temas = document.getElementsByClassName('chap2');
	//			Temas.style.display = 'none';
	//		};
	//		
	//		escondeTemas.esconde();

<div>
	<label for="search-input">Search:</label>
	<input id="search-input" bind:value={searchTerm} />
  </div>



  
<div id="perguntas">
	<div class="container_input"><input type="text" id="inputFiltro" onkeyup="filtrar()" placeholder="Escreva sua dúvida..."></div><br>

	<div id="botoes">

		<style>
			.botao {
				background-color: #cbcccc;
				color: #fff;
				padding: 6px 16px;
				font-family: 'Flama Condensed';
				font-size: 1.1rem;
				font-weight: 700;
				font-style: normal;
				text-decoration: none;
				text-transform: uppercase;
				text-align: center;
				border-radius: 30px;
				margin-right: 0;
				margin-bottom: 5px;
				cursor: pointer;
				-webkit-appearance: none !important;
				border: none !important;
				margin-right: 2px;
			}

			.botao:focus {
				outline: none !important;
				-webkit-appearance: none !important;
			}

			.botao.ativo {
				background-color: #a22a2a !important;
			}


			input[type=button] {
				-moz-appearance: none !important;
				-webkit-appearance: none !important;
			}

		</style>


		<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.0/jquery.slim.js"></script>

		<script>
			$(document).on('click', 'input', function() {
				$(this).addClass('ativo').siblings().removeClass('ativo')
			});
			
			function setVisibility(id, visibility) {
				document.getElementById(id).style.display = visibility;
			};

		</script> -->

		<!-- <input id="botao_cuidados_especiais" class="botao" type=button name=type value="cuidados especiais" onclick="setVisibility('cuidados_especiais', 'block'); setVisibility('condominio', 'none'); setVisibility('educacao', 'none'); setVisibility('novo_coronavirus', 'none'); setVisibility('violencia_domestica', 'none'); setVisibility('trabalho', 'none'); setVisibility('financas_pessoais', 'none'); setVisibility('economia', 'none'); setVisibility('no_mundo', 'none'); setVisibility('turismo', 'none'); setVisibility('politica', 'none'); setVisibility('meio_ambiente', 'none'); setVisibility('esportes', 'none');">

		<input id="botao_condominio" class="botao" type=button name=type value="Condomínio" onclick="setVisibility('cuidados_especiais', 'none'); setVisibility('condominio', 'block'); setVisibility('educacao', 'none'); setVisibility('novo_coronavirus', 'none'); setVisibility('violencia_domestica', 'none'); setVisibility('trabalho', 'none'); setVisibility('financas_pessoais', 'none'); setVisibility('economia', 'none'); setVisibility('no_mundo', 'none'); setVisibility('turismo', 'none'); setVisibility('politica', 'none'); setVisibility('meio_ambiente', 'none'); setVisibility('esportes', 'none');">

		<input id="botao_educacao" class="botao" type=button name=type value="Educação" onclick="setVisibility('cuidados_especiais', 'none'); setVisibility('condominio', 'none'); setVisibility('educacao', 'block'); setVisibility('novo_coronavirus', 'none'); setVisibility('violencia_domestica', 'none'); setVisibility('trabalho', 'none'); setVisibility('financas_pessoais', 'none'); setVisibility('economia', 'none'); setVisibility('no_mundo', 'none'); setVisibility('turismo', 'none'); setVisibility('politica', 'none'); setVisibility('meio_ambiente', 'none'); setVisibility('esportes', 'none');">

		<input id="botao_novo_coronavirus" class="botao" type=button name=type value="Novo Coronavírus" onclick="setVisibility('cuidados_especiais', 'none'); setVisibility('condominio', 'none'); setVisibility('educacao', 'none'); setVisibility('novo_coronavirus', 'block'); setVisibility('violencia_domestica', 'none'); setVisibility('trabalho', 'none'); setVisibility('financas_pessoais', 'none'); setVisibility('economia', 'none'); setVisibility('no_mundo', 'none'); setVisibility('turismo', 'none'); setVisibility('politica', 'none'); setVisibility('meio_ambiente', 'none'); setVisibility('esportes', 'none');">

		<input id="botao_violencia_domestica" class="botao" type=button name=type value="Violência doméstica" onclick="setVisibility('cuidados_especiais', 'none'); setVisibility('condominio', 'none'); setVisibility('educacao', 'none'); setVisibility('novo_coronavirus', 'none'); setVisibility('violencia_domestica', 'block'); setVisibility('trabalho', 'none'); setVisibility('financas_pessoais', 'none'); setVisibility('economia', 'none'); setVisibility('no_mundo', 'none'); setVisibility('turismo', 'none'); setVisibility('politica', 'none'); setVisibility('meio_ambiente', 'none'); setVisibility('esportes', 'none');">

		<input id="botao_trabalho" class="botao" type=button name=type value="Trabalho" onclick="setVisibility('cuidados_especiais', 'none'); setVisibility('condominio', 'none'); setVisibility('educacao', 'none'); setVisibility('novo_coronavirus', 'none'); setVisibility('violencia_domestica', 'none'); setVisibility('trabalho', 'block'); setVisibility('financas_pessoais', 'none'); setVisibility('economia', 'none'); setVisibility('no_mundo', 'none'); setVisibility('turismo', 'none'); setVisibility('politica', 'none'); setVisibility('meio_ambiente', 'none'); setVisibility('esportes', 'none');">

		<input id="botao_financas_pessoais" class="botao" type=button name=type value="Finanças pessoais" onclick="setVisibility('cuidados_especiais', 'none'); setVisibility('condominio', 'none'); setVisibility('educacao', 'none'); setVisibility('novo_coronavirus', 'none'); setVisibility('violencia_domestica', 'none'); setVisibility('trabalho', 'none'); setVisibility('financas_pessoais', 'block'); setVisibility('economia', 'none'); setVisibility('no_mundo', 'none'); setVisibility('turismo', 'none'); setVisibility('politica', 'none'); setVisibility('meio_ambiente', 'none'); setVisibility('esportes', 'none');">

		<input id="botao_economia" class="botao" type=button name=type value="Economia" onclick="setVisibility('cuidados_especiais', 'none'); setVisibility('condominio', 'none'); setVisibility('educacao', 'none'); setVisibility('novo_coronavirus', 'none'); setVisibility('violencia_domestica', 'none'); setVisibility('trabalho', 'none'); setVisibility('financas_pessoais', 'none'); setVisibility('economia', 'block'); setVisibility('no_mundo', 'none'); setVisibility('turismo', 'none'); setVisibility('politica', 'none'); setVisibility('meio_ambiente', 'none'); setVisibility('esportes', 'none');">

		<input id="botao_no_mundo" class="botao" type=button name=type value="No mundo" onclick="setVisibility('cuidados_especiais', 'none'); setVisibility('condominio', 'none'); setVisibility('educacao', 'none'); setVisibility('novo_coronavirus', 'none'); setVisibility('violencia_domestica', 'none'); setVisibility('trabalho', 'none'); setVisibility('financas_pessoais', 'none'); setVisibility('economia', 'none'); setVisibility('no_mundo', 'block'); setVisibility('turismo', 'none'); setVisibility('politica', 'none'); setVisibility('meio_ambiente', 'none'); setVisibility('esportes', 'none');">

		<input id="botao_turismo" class="botao" type=button name=type value="Turismo" onclick="setVisibility('cuidados_especiais', 'none'); setVisibility('condominio', 'none'); setVisibility('educacao', 'none'); setVisibility('novo_coronavirus', 'none'); setVisibility('violencia_domestica', 'none'); setVisibility('trabalho', 'none'); setVisibility('financas_pessoais', 'none'); setVisibility('economia', 'none'); setVisibility('no_mundo', 'none'); setVisibility('turismo', 'block'); setVisibility('politica', 'none'); setVisibility('meio_ambiente', 'none'); setVisibility('esportes', 'none');">

		<input id="botao_politica" class="botao" type=button name=type value="Política" onclick="setVisibility('cuidados_especiais', 'none'); setVisibility('condominio', 'none'); setVisibility('educacao', 'none'); setVisibility('novo_coronavirus', 'none'); setVisibility('violencia_domestica', 'none'); setVisibility('trabalho', 'none'); setVisibility('financas_pessoais', 'none'); setVisibility('economia', 'none'); setVisibility('no_mundo', 'none'); setVisibility('turismo', 'none'); setVisibility('politica', 'block'); setVisibility('meio_ambiente', 'none'); setVisibility('esportes', 'none');">

		<input id="botao_meio_ambiente" class="botao" type=button name=type value="Meio ambiente" onclick="setVisibility('cuidados_especiais', 'none'); setVisibility('condominio', 'none'); setVisibility('educacao', 'none'); setVisibility('novo_coronavirus', 'none'); setVisibility('violencia_domestica', 'none'); setVisibility('trabalho', 'none'); setVisibility('financas_pessoais', 'none'); setVisibility('economia', 'none'); setVisibility('no_mundo', 'none'); setVisibility('turismo', 'none'); setVisibility('politica', 'none'); setVisibility('meio_ambiente', 'block'); setVisibility('esportes', 'none');">

		<input id="botao_esportes" class="botao" type=button name=type value="Esportes" onclick="setVisibility('cuidados_especiais', 'none'); setVisibility('condominio', 'none'); setVisibility('educacao', 'none'); setVisibility('novo_coronavirus', 'none'); setVisibility('violencia_domestica', 'none'); setVisibility('trabalho', 'none'); setVisibility('financas_pessoais', 'none'); setVisibility('economia', 'none'); setVisibility('no_mundo', 'none'); setVisibility('turismo', 'none'); setVisibility('politica', 'none'); setVisibility('meio_ambiente', 'none'); setVisibility('esportes', 'block');">


		<div id="cuidados_especiais">
			cuidados_especiais
		</div>
		<div id="condominio">
			condominio
		</div>
		<div id="educacao">
			educacao
		</div>

		<div id="novo_coronavirus">
			novo_coronavirus
		</div>
		<div id="violencia_domestica">
			violencia_domestica
		</div>

		<div id="trabalho">
			trabalho
		</div>

		<div id="financas_pessoais">
			financas_pessoais
		</div>

		<div id="economia">
			economia
		</div>

		<div id="no_mundo">
			no_mundo
		</div>
		<div id="turismo">
			turismo
		</div>
		<div id="politica">
			politica
		</div>
		<div id="meio_ambiente">
			meio_ambiente
		</div>
		<div id="esportes">
			esportes
		</div>




		<br><br>
		<div id="cuidados">
			<div class="container_pergunta">
				<hr>
				<h3 class="titulo_pergunta"><span class="chap2">Cuidados especiais</span></h3>
			</div>
			<div class="container_pergunta">
				<h3 class="titulo_pergunta">Titulo lorem ipsum maça.</h3>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur
			</div>
		</div>

		<div id="tema2">
			<div class="container_pergunta">
				<h3 class="titulo_pergunta">Titulo lorem ipsum banana.</h3>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur>
			</div>

			<div class="container_pergunta">
				<h3 class="titulo_pergunta">Titulo lorem ipsum mané.</h3>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur>
			</div>

			<div class="container_pergunta">
				<h3 class="titulo_pergunta">Titulo lorem ipsum mané.</h3>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur>
			</div>
			<div class="container_pergunta">
				<h3 class="titulo_pergunta">Titulo lorem ipsum vacina.</h3>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur>
			</div>
			<div class="container_pergunta">
				<h3 class="titulo_pergunta">Titulo lorem ipsum crepúsculo.</h3>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur>
			</div>
			<div class="container_pergunta">
				<h3 class="titulo_pergunta">Titulo lorem ipsum índex.</h3>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur>
			</div>
		</div>
	</div>

	<style>
		.container_input {
			border-bottom: 2px solid #e2e1e1 !important;
			padding-bottom: 5px;
		}
	
		#inputFiltro {
			background-image: url(https://www.w3schools.com/css/searchicon.png);
			background-position: 7px 17px;
			background-repeat: no-repeat;
			background-size: 16px;
			background-repeat: no-repeat;
			width: 100%;
			font-size: 22px;
			padding: 12px 0px 12px 40px;
			color: none !important;
			border-style: none !important;
		}
	
		#inputFiltro:focus {
			outline: 0 !important;
		}
	
	
		.numero_pergunta {
			float: left;
			display: block;
			position: relative;
			font-family: "LatoBlack", arial, serif;
			font-weight: 400;
			border-radius: 130px;
			font-size: 1rem;
			line-height: 2.4rem;
			height: 2.4em;
			width: 2.4em;
			background: #4089AF;
			color: white;
			text-align: center;
			margin: -3px 9px 0 0;
			-webkit-font-smoothing: antialiased;
		}
	
		.titulo_pergunta {
			font-family: 'LatoBlack', Arial;
			font-size: 17px;
			color: #5D5D5D;
			margin: 32px 0 8px 0 !important;
			word-break: break-word;
			-webkit-font-smoothing: antialiased
		}
	
	</style> -->