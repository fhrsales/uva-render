<script>
    export let value;
    const { conteúdo, tamanho}  = value;
</script>

<div class={tamanho}>
    {#each conteúdo as block}
        {#if block.type === "text"}
            {@html block.value}
        {/if}
    {/each}
</div>