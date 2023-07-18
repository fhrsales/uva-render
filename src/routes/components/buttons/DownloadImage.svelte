<script src="https://html2canvas.hertzen.com/dist/html2canvas.min.js"></script>

<script>
  function downloadImage() {
    // Seleciona a div com o gráfico
    const div = document.querySelector('#grafico');

    // Captura uma screenshot da div com html2canvas
    html2canvas(div).then(canvas => {
      // Cria um elemento de link e define seu atributo href como o arquivo jpg
      const link = document.createElement('a');
      link.download = 'meu-grafico.jpg';
      link.href = canvas.toDataURL('image/jpeg');

      // Clica no link para iniciar o download
      link.click();
    });
  }
</script>

<button onclick="downloadImage()">Baixar Gráfico</button>

