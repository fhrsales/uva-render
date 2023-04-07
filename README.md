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

Apagar diretório: 
https://atelie.estadao.com.br/rmdir.php

"<?php

/**
 * Recursively removes a folder along with all its files and directories
 * 
 * @param String $path 
 */
function rrmdir($path) {
     // Open the source directory to read in files
        $i = new DirectoryIterator($path);
        foreach($i as $f) {
            if($f->isFile()) {
                unlink($f->getRealPath());
            } else if(!$f->isDot() && $f->isDir()) {
                rrmdir($f->getRealPath());
            }
        }
        rmdir($path);
}

//$path = '/OESP/legado/www/infograficos/backup';
$path = '/OESP/prod/www/atelie/public/uploads/pages';

rrmdir($path);"