<script>
    export let {classe, handleClick, index, value} = [];
</script>

<style>
    button {
        display: block;
        /* margin: 0.5rem 0; */
        padding: 0.625rem 1.25rem;
        font-family: var(--condensed);
        font-weight: 500;
        font-size: calc(var(--corpo-desktop) * 0.7);
        line-height: 1.5;
        letter-spacing: 0.053rem;
        text-transform: uppercase;
        text-align: left;
        border-radius: 2.5rem;
        border: none;
        cursor: pointer;
        transition: all .35s ease-out;
    }
</style>

<button data-index={index} class={classe} on:click={handleClick}>{value}</button>