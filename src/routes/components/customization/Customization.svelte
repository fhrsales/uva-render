<script>
    import { UvaPath } from "../../../scripts/store.js"
    let UvaPages = "";
    UvaPath.subscribe(value => {
        UvaPages = value;
    });
    import { version } from "../../../scripts/version.js";
    export let value;
    const { CSS, JS} = value; 

    function setCorPrimaria() {
            switch (value.editoria) {
                case 'hardnews':
                    document.documentElement.style.setProperty('--cor-primaria', '#005d92');
                    document.documentElement.style.setProperty('--cor-secundaria', '#008ed0');
                    document.documentElement.style.setProperty('--cor-terciaria', '#f5f5f5');
                    break;
                case 'economia':
                    document.documentElement.style.setProperty('--cor-primaria', '#007367');
                    document.documentElement.style.setProperty('--cor-secundaria', '#86ae1c');
                    document.documentElement.style.setProperty('--cor-terciaria', '#f5f5f5');
                    break;
                case 'cultura':
                    document.documentElement.style.setProperty('--cor-primaria', '#c20736');
                    document.documentElement.style.setProperty('--cor-secundaria', '#e677a8');
                    document.documentElement.style.setProperty('--cor-terciaria', '#f5f5f5');
                    break;
            }
        }
        setCorPrimaria(value.editoria);
</script>
{#if CSS === "sim"}
    <link rel="stylesheet" href="https://arte.estadao.com.br/public/pages/{UvaPages}/custom.css?v=${version()}">
{/if}
{#if JS === "sim"}
    <script src="https://arte.estadao.com.br/public/pages/{UvaPages}/custom.js?v=${version()}"></script>
{/if}