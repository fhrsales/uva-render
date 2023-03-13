<script>
    import { boolean } from "../../../scripts/boolean.js";
    import UvaRepositorioMediaOnce from "../observer/Uva-repositorio-media-once.svelte";
    import ImagePlaceholder from "../images/ImagePlaceholder.svelte";
    export let value;
    export const { id, fonte, tamanho } = value;
    const { mostrar_título, mostrar_descrição, mostrar_marca } = value;
    export const src = `https://arte.estadao.com.br/uva/content/${fonte}/uploads/fallback.jpg`;
    export const rootMargin = "0px 0px 15% 0px";
</script>

<UvaRepositorioMediaOnce {id} {tamanho} {rootMargin}>
    <script type="text/javascript" 
            class="uva-static-chart" 
            data-uva-id={fonte} 
            data-show-title={boolean (mostrar_título)}
            data-show-description={boolean(mostrar_descrição)} 
            data-show-brand={boolean(mostrar_marca)}
            src="https://arte.estadao.com.br/uva/scripts/embed.min.js"
    >
    </script>
    <placeholder slot="placeholder">
        <ImagePlaceholder {src} descrição = "Gráfico indisponível" />
    </placeholder>
</UvaRepositorioMediaOnce>