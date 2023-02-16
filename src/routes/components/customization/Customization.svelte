<script>
    import { UvaPath } from "../../../scripts/store.js"
    let UvaPages = "";
    UvaPath.subscribe(value => {
        UvaPages = value;
    });
    import { version } from "../../../scripts/version.js";
    export let value;
    const { CSS, JS } = value;
</script>
{#if CSS === "sim"}
    <link rel="stylesheet" href="https://arte.estadao.com.br/public/pages/{UvaPages}/custom.css?v=${version()}">
{/if}
{#if JS === "sim"}
    <script src="https://arte.estadao.com.br/public/pages/{UvaPages}/custom.js?v=${version()}"></script>
{/if}