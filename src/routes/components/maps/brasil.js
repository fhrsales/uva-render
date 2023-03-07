import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import { UvaPath } from "../../../scripts/store.js";
import { version } from "../../../scripts/version.js";
import { toolTip } from "./tooltip.js";

let UvaPages = "";
UvaPath.subscribe(value => { UvaPages = value; });

export const mapaBrasil = (el, tipo, dados, largura, altura, variável, value) => {
    const svg = d3.select(el)
        .append('svg')
        .attr('preserveAspectRatio', 'xMidYMid meet')
        .attr('viewBox', '0 0 ' + largura + ' ' + altura);
        if (tipo === 'coroplético') {
            Promise.all([
                d3.json('https://arte.estadao.com.br/arc/data/brasil.json'),
                d3.json('https://arte.estadao.com.br/arc/data/estados.json'),
                d3.csv(`https://arte.estadao.com.br/public/pages/${UvaPages}${dados}?v=${version()}`)
            ]).then(([mapa, estado, dado]) => {
                
                const map = topojson.feature(mapa, mapa.objects['-']);
                const projection = d3.geoMercator().fitSize([largura, altura], map);
                const path = d3.geoPath().projection(projection);
                // Desenha o mapa
                svg.append('g')
                .attr('class', 'mapa')
                .selectAll('path')
                .data(map.features)
                .enter()
                .append('path')
                .attr('d', path)
                .attr('class', 'regiao brasil')
                .attr('id', d => d.properties.ibge)
                .attr('uf', d => d.properties.uf)
                .attr('nome', d => d.properties.nome)
                .attr('codigo-ibge', d => d.properties.ibge)
                .attr('codigo-tse', d => d.properties.tse);

                const mapUF = topojson.feature(estado, estado.objects.estados);
                const projectionUF = d3.geoMercator().fitSize([largura, altura], mapUF);
                const pathUF = d3.geoPath().projection(projectionUF);
                // Desenha o mapa
                svg.append('g')
                .attr('class', 'UFs')
                .selectAll('path')
                .data(mapUF.features)
                .enter()
                .append('path')
                .attr('d', pathUF)
                .attr('class', 'estados')
                .attr('id', d => d.properties.uf)
                .attr('codigo-ibge', d => d.properties.ibge)
                // Aplica os dados no mapa
                const dados = dado.map(d => {
                    return {
                        id: +d.id,
                        valor: +d[variável]
                    }
                });
                const domínio = JSON.parse(value.intervalo);
                const faixa = value.cores.split(', ');
                const escala = d3.scaleLinear()
                    .domain(domínio)
                    .range(faixa);
                svg.selectAll('.regiao')
                .attr('valor', d => {
                    const element = dados.find(e => e.id === +d.properties.ibge);
                    if (element) {
                        return element.valor
                    } else {
                        return 'Sem valor';
                    }
                })
                .attr('fill', d => {
                    const element = dados.find(e => e.id === +d.properties.ibge);
                    if (element) {
                        return escala(element.valor);
                    } else {
                        return '#eeeeee';
                    }
                })
                toolTip();
            });
        }
}