<script>
	export let searchTerm;
	export let placeholder = 'Digite uma palavra...';
</script>

<div class="P">
	<input type="text" placeholder={placeholder} bind:value={searchTerm} on:input />
</div>

<style>
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

	input {
		display: flex;
		width: -webkit-fill-available;
		margin: calc(var(--margem-vertical) * 2) 0;
		padding: 8px;
		font: 500 normal var(--corpo-mobile) / var(--entrelinha-mobile) var(--texto);
		text-indent: 19px;
		background: transparent url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='black' class='bi bi-search' viewBox='0 0 16 16'%3E%3Cpath d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z'%3E%3C/path%3E%3C/svg%3E") no-repeat 0px center;
		border: none;
		border-radius: 0;
		border-bottom: var(--fio-solido-fino);
		outline: none;
	}

	@media (min-width:740px) {
        /* desktop */
        input {
            font-size: var(--corpo-desktop);
            line-height: var(--entrelinha-desktop);
        }
    }
</style>