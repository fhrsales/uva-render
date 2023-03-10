import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import { UvaPath } from "../../../scripts/store.js";
import { version } from "../../../scripts/version.js";
import { toolTip } from './tooltip.js';

let UvaPages = "";
UvaPath.subscribe(value => { UvaPages = value; });

export const mapaCachorrao = (el, tipo, mapa, dados, largura, altura, variável, value) => {
    const svg = d3.select(el)
            .append('svg')
            .attr('preserveAspectRatio', 'xMidYMid meet')
            .attr('viewBox', '0 0 ' + largura + ' ' + altura)
            let sigla, jsonUrl, classe;

    if (tipo === 'coroplético') {
        if (mapa === 'cachorrao-distritos') {
            sigla = 'distritos-sp';
            jsonUrl = 'https://arte.estadao.com.br/arc/data/sp-distritos.json';
            classe = 'regiao distrito';

        } if (mapa === 'cachorrao-delegacias-policiais') {
            sigla = 'sp-delegacias-policiais';
            jsonUrl = 'https://arte.estadao.com.br/arc/data/sp-delegacias-policiais.json';
            classe = 'regiao DP';
        }
        Promise.all([
            d3.json(jsonUrl),
            d3.csv(`https://arte.estadao.com.br/public/pages/${UvaPages}${dados}?v=${version()}`)
        ]).then(([mapa, dado]) => {
            const map = topojson.feature(mapa, mapa.objects[`${sigla}`]);
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
            .attr('class', classe)
            .attr('id', d => d.properties.id)
            .attr('nome', d => d.properties.nome)
            .attr('bairro', d => d.properties.bairro_distrito_policial)
            .attr('zona', d => d.properties.zona_dp)
            .attr('distrito-municipal', d => d.properties.distrito_municipal)
            .attr('codigo-distrito-municipal', d => d.properties.codigo_distrito_municipal)
            .attr('zona-distrito', d => d.properties.zona_distrito)
            .attr('subprefeitura', d => d.properties.sub_prefeitura)
            .attr('codigo-subprefeitura', d => d.properties.codigo_sub_prefeitura)
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
                const element = dados.find(e => e.id === +d.properties.id);
                if (element) {
                    return element.valor
                } else {
                    return 'Sem dados';
                }
            })
            .attr('fill', d => {
                const element = dados.find(e => e.id === +d.properties.id);
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