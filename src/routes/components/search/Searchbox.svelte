<script>
	export let searchTerm;
	export let placeholder = 'Digite uma palavra...';
    export let tamanho = 'P';
    export let classe= 'uva-search-input';
</script>

<div class={tamanho}>
	<input class={classe} type="text" placeholder={placeholder} bind:value={searchTerm} on:input />
</div>

<style>
    :global(input[type="text"]) {
        font-family: var(--texto) !important;
    }

	:global(input[type=search]::-ms-clear) {
		display: none;
		width: 0;
		height: 0;
	}

	:global(input[type=search]::-ms-reveal) {
		display: none;
		width: 0;
		height: 0;
	}

	/* clears the ‘X’ from Chrome */
	:global(input[type="search"]::-webkit-search-decoration,
	input[type="search"]::-webkit-search-cancel-button,
	input[type="search"]::-webkit-search-results-button,
	input[type="search"]::-webkit-search-results-decoration) {
		display: none;
	}

	.uva-search-input {
		display: flex;
		width: -webkit-fill-available;
		/* margin: calc(var(--margem-vertical) * 2) 0; */
		padding: 0px 18px;
		font: 500 normal var(--corpo-mobile) / var(--entrelinha-mobile) var(--texto);
		text-indent: 29px;
		background: transparent url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='black' class='bi bi-search' viewBox='0 0 16 16'%3E%3Cpath d='M11.3,9.2C11.7,8.4,12,7.5,12,6.5C12,3.5,9.5,1,6.5,1S1,3.5,1,6.5S3.5,12,6.5,12c1,0,1.9-0.3,2.7-0.7l3.3,3.3c0.3,0.3,0.7,0.4,1.1,0.4s0.8-0.1,1.1-0.4c0.6-0.6,0.6-1.5,0-2.1L11.3,9.2zM6.5,10.3c-2.1,0-3.8-1.7-3.8-3.8c0-2.1,1.7-3.8,3.8-3.8c2.1,0,3.8,1.7,3.8,3.8C10.3,8.6,8.6,10.3,6.5,10.3z'%3E%3C/path%3E%3C/svg%3E") no-repeat 20px center;
        background-color: var(--cor-terciaria);
        color: var(--cor-texto);
		border: none;
		border-radius: 30px;
		outline: none;
        height: 41px;
	}

    :global(input::placeholder) {
        font: 500 normal var(--corpo-mobile) / var(--entrelinha-mobile) var(--texto);
        color: var(--cor-texto);
    }

	@media (min-width:740px) {
        /* desktop */
        .uva-search-input {
            font-size: var(--corpo-desktop);
            line-height: var(--entrelinha-desktop);
        }
    }
</style>