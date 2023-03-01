<script>
    export let {
        classe,
        handleClick,
        index,
        value
    } = [];
</script>

<button data-index={index} class={classe} on:click={handleClick}>{value}</button>

<style>
    button {
        display: block;
        /* margin: 0.5rem 0; */
        padding: 0.625rem 1.25rem;
        font: 500 calc(var(--corpo-desktop) * 0.7) / 1.5 var(--condensed);
        letter-spacing: 0.053rem;
        text-transform: uppercase;
        text-align: left;
        border-radius: 2.5rem;
        border: none;
        cursor: pointer;
        transition: all .35s ease-out;
    }
</style>