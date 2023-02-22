<script>
    import { onMount } from 'svelte';
    import child_process from 'child_process';
  
    function build() {
      child_process.exec('npm run build', (error, stdout, stderr) => {
        if (error) {
          console.error(`error: ${error.message}`);
          return;
        }
        if (stderr) {
          console.error(`stderr: ${stderr}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
      });
    }
  </script>
  
  <button on:click={build}>Build</button>  