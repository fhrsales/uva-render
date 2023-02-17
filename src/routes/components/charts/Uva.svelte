<script>
    import { boolean } from "../../../scripts/boolean.js";
    import UvaRepositorioMediaOnce from "../observer/Uva-repositorio-media-once.svelte";
    export let value;
    const { id, fonte, tamanho } = value;
    const mostrar_título = boolean(value.mostrar_título);
    const mostrar_descrição = boolean(value.mostrar_descrição);
    const mostrar_marca = boolean(value.mostrar_marca);
    const rootMargin = "0px 0px 100px 0px";

</script>
<UvaRepositorioMediaOnce {id} {tamanho} {rootMargin}>
    <script 
        type="text/javascript" 
        class="uva-grafico" 
        data-uva-id={fonte} 
        data-show-title= {mostrar_descrição}
        data-show-description={mostrar_título} 
        data-show-brand={mostrar_marca} 
        src="https://arte.estadao.com.br/uva/scripts/embed.min.js">
    </script>
    <placeholder slot="placeholder">
        <img 
            loading="lazy"
            width="180px"
            height="120px"
            src="https://arte.estadao.com.br/uva/content/{fonte}/uploads/fallback.jpg" 
            alt="Gráfico indisponível"
        />
    </placeholder>
</UvaRepositorioMediaOnce>