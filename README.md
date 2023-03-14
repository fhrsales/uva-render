Como declarar fonte em uma única variável
/* font: [optional: style variant weight] [required: size][optional:/line-height] [required: family]; */


Exemplo de on:intersection:
<script>
  let target;
  
  function onIntersection(entries) {
    entries.forEach(entry => {
      console.log(entry.isIntersecting);
    });
  }
</script>

<div bind:this={target} on:intersect={onIntersection}>
  <!-- Conteúdo do elemento observado -->
</div>
