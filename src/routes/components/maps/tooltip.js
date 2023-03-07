import * as d3 from 'd3';
let locale = d3.formatLocale({
    "decimal": ",",
    "thousands": ".",
    "grouping": [3],
    "currency": ["R$", ""]
});
let brasil = locale.format(",d");

export const toolTip = () => {
    if (window.innerWidth > 768) {
        d3.selectAll('.brasil')
            .on('mouseover', function () {
                let cidade = d3.select(this).attr("nome");
                let uf = ", " + d3.select(this).attr("uf");
                let valor = brasil(d3.select(this).attr("valor"));
                if (d3.select(this).attr("valor") === 'Sem valor') {
                    valor = 'Sem dados';
                }
                let conteúdoTooltip = "<strong>" + cidade + uf + "</strong><hr style='border: 0; border-top: var(--fio-solido-fino);'>" + valor;
                const tooltip = d3.select('body')
                    .append('div')
                    .attr('class', 'tooltip')
                tooltip.append('div')
                    .attr('class', 'label')
                    .html(conteúdoTooltip);
                d3.select('body')
                    .on('mousemove', function (event) {
                        const mouse = d3.pointer(event);
                        tooltip
                            .style('left', `${mouse[0] + 15}px`)
                            .style('top', `${mouse[1] + 15}px`)
                            .style('display', 'block')
                            .style('opacity', 1);
                    });
            })
            .on('mouseout', function () {
                d3.select('.tooltip').remove();
                d3.select('body')
                    .on('mousemove', null);
            });

        d3.selectAll('.estado')
            .on('mouseover', function () {
                let cidade = d3.select(this).attr("nome");
                let valor = brasil(d3.select(this).attr("valor"));
                if (d3.select(this).attr("valor") === 'Sem dados') {
                    valor = '';
                }
                let conteúdoTooltip = "<strong>" + cidade + "</strong><hr style='border: 0; border-top: var(--fio-solido-fino);'>" + valor;
                const tooltip = d3.select('body')
                    .append('div')
                    .attr('class', 'tooltip')
                tooltip.append('div')
                    .attr('class', 'label')
                    .html(conteúdoTooltip);
                d3.select('body')
                    .on('mousemove', function (event) {
                        const mouse = d3.pointer(event);
                        tooltip
                            .style('left', `${mouse[0] + 15}px`)
                            .style('top', `${mouse[1] + 15}px`)
                            .style('display', 'block')
                            .style('opacity', 1);
                    });
            })
            .on('mouseout', function () {
                d3.select('.tooltip').remove();
                d3.select('body')
                    .on('mousemove', null);
            });

        d3.selectAll('.distrito')
            .on('mouseover', function () {
                let distrito = d3.select(this).attr("nome");
                let valor = brasil(d3.select(this).attr("valor"));
                if (d3.select(this).attr("valor") === 'Sem dados') {
                    valor = '';
                }
                let conteúdoTooltip = "<strong>" + distrito + "</strong><hr style='border: 0; border-top: var(--fio-solido-fino);'>" + valor;
                const tooltip = d3.select('body')
                    .append('div')
                    .attr('class', 'tooltip')
                tooltip.append('div')
                    .attr('class', 'label')
                    .html(conteúdoTooltip);
                d3.select('body')
                    .on('mousemove', function (event) {
                        const mouse = d3.pointer(event);
                        tooltip
                            .style('left', `${mouse[0] + 15}px`)
                            .style('top', `${mouse[1] + 15}px`)
                            .style('display', 'block')
                            .style('opacity', 1);
                    });
            })
            .on('mouseout', function () {
                d3.select('.tooltip').remove();
                d3.select('body')
                    .on('mousemove', null);
            });

        d3.selectAll('.DP')
            .on('mouseover', function () {
                let dp = d3.select(this).attr("nome");
                let bairro = ", " + d3.select(this).attr("bairro");
                let valor = brasil(d3.select(this).attr("valor"));
                if (d3.select(this).attr("valor") === 'Sem dados') {
                    valor = '';
                }
                let conteúdoTooltip = "<strong>" + dp + bairro + "</strong><hr style='border: 0; border-top: var(--fio-solido-fino);'>" + valor;
                const tooltip = d3.select('body')
                    .append('div')
                    .attr('class', 'tooltip')
                tooltip.append('div')
                    .attr('class', 'label')
                    .html(conteúdoTooltip);
                d3.select('body')
                    .on('mousemove', function (event) {
                        const mouse = d3.pointer(event);
                        tooltip
                            .style('left', `${mouse[0] + 15}px`)
                            .style('top', `${mouse[1] + 15}px`)
                            .style('display', 'block')
                            .style('opacity', 1);
                    });
            })
            .on('mouseout', function () {
                d3.select('.tooltip').remove();
                d3.select('body')
                    .on('mousemove', null);
            });
    }
}