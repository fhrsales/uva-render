import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import { UvaPath } from "../../../scripts/store.js";
import { version } from "../../../scripts/version.js";
import { toolTip } from "./tooltip.js";

let UvaPages = "";
UvaPath.subscribe(value => { UvaPages = value; });

export const mapaBrasilUFs = (el, tipo, dados, largura, altura, variável, value) => {
    const svg = d3.select(el)
        .append('svg')
        .attr('preserveAspectRatio', 'xMidYMid meet')
        .attr('viewBox', '0 0 ' + largura + ' ' + altura);
        if (tipo === 'coroplético') {
            Promise.all([
                d3.json('https://arte.estadao.com.br/arc/data/estados.json'),
                d3.csv(`https://arte.estadao.com.br/public/pages/${UvaPages}${dados}?v=${version()}`)
            ]).then(([mapa, dado]) => {
                const map = topojson.feature(mapa, mapa.objects.estados);
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
                .attr('class', 'regiao estado')
                .attr('id', d => d.properties.uf)
                .attr('nome', d => d.properties.uf);
                // Aplica os dados no mapa
                const dados = dado.map(d => {
                    return {
                        id: +d.id,
                        valor: +d[variável]
                    }
                });
                const domínio = value.intervalo.split(',').map(Number);
                const faixa = value.cores.split(', ');
                const escala = d3.scaleLinear()
                    .domain(domínio)
                    .range(faixa);
                svg.selectAll('.regiao')
                .attr('valor', d => {
                    const element = dados.find(e => e.id === +d.properties.uf);
                    if (element) {
                        return element.valor
                    } else {
                        return 'Sem dados';
                    }
                })
                .attr('fill', d => {
                    const element = dados.find(e => e.id === +d.properties.uf);
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