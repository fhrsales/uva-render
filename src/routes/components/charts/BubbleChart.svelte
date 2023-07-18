<script>
    import { onMount } from 'svelte';
    import ChartHeading from './../headings/ChartHeading.svelte';
    import Button from './../buttons/Button.svelte';
    import * as d3 from 'd3';
    export let data = [];
    export let id;
    export let classe;
    export let color;
    export let fillFunction;
    export let createPatternFunction;
    export let order;

    let groupByCategory = false;
    let node = [];
    let initialPositions = [];
    let toggleText = 'Agrupar';
    let containerWidth;
    let containerHeight;

    function drawBubbleChart() {
        const container = d3.select(`#${id}`)
            containerWidth = container.node().getBoundingClientRect().width;
            containerHeight = containerWidth;
        const svg = container.append('svg')
            .attr('viewBox', `0 0 ${containerWidth} ${containerHeight}`)
            .style('width', '100%')
            .style('height', '100%');

        const pattern = createPatternFunction(svg);

        const bubble = data => d3.pack()
            .size([containerWidth, containerHeight])
            .padding(0)
            (d3.hierarchy({ children: data })
                .sum(d => d.value)
                .sort((a, b) => b.value - a.value));

        const root = bubble(data);

            node = svg.selectAll()
                .data(root.children)
                .enter().append('g')
                .attr('transform', (d, i) => {
                initialPositions[i] = { x: d.x, y: d.y };
                return `translate(${containerWidth / 2}, ${containerHeight / 2})`;
            })
            .style('opacity', 0);

            node.transition()
            .ease(d3.easeExpInOut)
            .duration(500)
            .style('opacity', 1)
            .attr('transform', d => `translate(${d.x}, ${d.y})`);

        const tooltip = d3.select(`#${id}-tooltip`)
            .style('opacity', 0);

        function handleMouseOverTouchStart(event, d) {
            svg.selectAll('circle').transition()
                .duration(200)
                .style('opacity', (circleData) => {
                    return circleData === d ? 1 : 0.1;
                });
            svg.selectAll('text').transition()
                .duration(200)
                .style('opacity', (textData) => {
                    return textData === d ? 1 : 0;
                });
            d3.select(event.currentTarget).transition()                
                .duration(200)
                .style('opacity', 1);
            tooltip.transition()
                .duration(200)
                .style('opacity', 1);

            const { x, y, width, height } = event.currentTarget.getBoundingClientRect();
            const { pageX, pageY } = event;
            const { clientWidth, clientHeight } = document.documentElement;

            tooltip.html(`<div>${d.data.name}</div><hr><div>${d.data.value}</div>`)
                .style('left', `${event.pageX - d.r}px`)
                .style('top', `${event.pageY - d.r}px`);
        }

        function handleMouseOutTouchEnd() {
            svg.selectAll('circle')
                .transition()
                .duration(200)
                .style('opacity', 1);
            svg.selectAll('text')
                .transition()
                .duration(200)
                .style('opacity', 1);
            tooltip.transition()
                .duration(200)
                .style('opacity', 0);
        }

        node.filter((d) => !d.children)
            .append('circle')
            .attr('r', (d) => d.r)
            .style('stroke', 1)
            .style('stroke', 'var(--cor-fundo)')
            .style('fill', (d) => d.data.category === 'A favor com ressalvas' ? 'url(#hash)' : color(d.data.category))
            .style('cursor', 'pointer')
            .on('mouseover', handleMouseOverTouchStart)
            .on('touchstart', handleMouseOverTouchStart)
            .on('mouseout', handleMouseOutTouchEnd)
            .on('touchend', handleMouseOutTouchEnd);

        node.filter((d) => !d.children)
            .append('text')
            .attr('dy', '0.4em')
            .style('text-anchor', 'middle')
            .style('font-family', 'var(--condensed)')
            .style('font-weight', '500')
            .style('font-size', 'calc(var(--corpo-mobile) * 0.6)')
            .style('cursor', 'pointer')
            .style('fill', fillFunction)
            .text((d) => {
        if (d.r * 2 >= getTextWidth(d.data.name)) {
            return d.data.name;
        }
        return '';
    });
    }

    function getTextWidth(text) {
    const dummyText = d3.select('body')
        .append('span')
        .attr('class', 'dummy-text')
        .text(text)
        .style('font-family', 'var(--condensed)')
        .style('font-weight', '500')
        .style('font-size', 'calc(var(--corpo-mobile) * 0.6)')
        .style('opacity', 0)
        .style('pointer-events', 'none');

    const width = dummyText.node().getBoundingClientRect().width;
    dummyText.remove();

    return width;
}

    // function positionGroupedCircles() {
    //     const groupedNodes = {};
    //     node.each((d) => {
    //         if (!groupedNodes[d.data.category]) {
    //             groupedNodes[d.data.category] = [];
    //         }
    //         groupedNodes[d.data.category].push(d);
    //     });

    //     const numGroups = Object.keys(groupedNodes).length;
    //     const maxRadius = d3.max(node.data(), (d) => d.r) * 0.7;
    //     const groupSpacing = containerWidth / (numGroups + 1);

    //     const orderedGroups = Object.entries(groupedNodes)
    //         .sort((a, b) => {
    //             const aIndex = order.indexOf(a[0]);
    //             const bIndex = order.indexOf(b[0]);
    //             return aIndex - bIndex;
    //         })
    //         .map(([key, value]) => value);

    //     orderedGroups.forEach((group, i) => {
    //         const groupX = (i + 1.2) * groupSpacing;
    //         const numNodes = group.length;
    //         const maxGroupHeight = maxRadius * 1.4 * numNodes;

    //         group.forEach((node, j) => {
    //             const nodeY = (j + 1.3) * (maxGroupHeight / numNodes);
    //             node.x = groupX;
    //             node.y = nodeY;
    //         });
    //     });
    // }

    function positionGroupedCircles() {
    const groupedNodes = {};
    node.each((d) => {
        const key = `${d.data.category}-${d.above ? d.above.data.id : "top"}`;
        if (!groupedNodes[key]) {
            groupedNodes[key] = [];
        }
        groupedNodes[key].push(d);
    });

    const numGroups = Object.keys(groupedNodes).length;
    const groupSpacing = containerWidth / (numGroups + 1);
    const maxGroupHeight = containerHeight * 0.8; // Define a altura máxima para os grupos
    const verticalOffset = containerHeight * 0.1; // Define o deslocamento vertical

    const orderedGroups = Object.entries(groupedNodes)
        .sort((a, b) => {
            const aIndex = order.indexOf(a[0].split("-")[0]);
            const bIndex = order.indexOf(b[0].split("-")[0]);
            return aIndex - bIndex;
        })
        .map(([key, value]) => value);

    orderedGroups.forEach((group, i) => {
        const groupX = (i + 1.2) * groupSpacing;
        let yOffset = 0;
        let isFirstInGroup = true;
        let totalHeight = 0;

        group.forEach((node) => {
            const aboveNodes = groupedNodes[`${node.data.category}-${node.above ? node.above.data.id : "top"}`];
            const aboveIndex = aboveNodes.indexOf(node.above);
            const radiusAbove = aboveIndex !== -1 ? aboveNodes[aboveIndex].r : 0;
            let nodeY = yOffset;

            if (isFirstInGroup) {
                // Define a posição vertical do primeiro círculo da categoria
                totalHeight = aboveIndex !== -1 ? aboveNodes[aboveIndex].y + aboveNodes[aboveIndex].r : 0;
                nodeY = totalHeight - node.r;
                isFirstInGroup = false;
            } else {
                // Calcula a posição vertical com base no raio do círculo acima
                nodeY += radiusAbove + node.r * 1.4;
            }

            node.x = groupX;
            node.y = nodeY;
            yOffset = nodeY + node.r * 0.05;
        });

        // Verifica se o grupo ultrapassa a altura máxima
        const groupHeight = group[group.length - 1].y + group[group.length - 1].r - totalHeight;
        const scaleFactor = groupHeight > maxGroupHeight ? maxGroupHeight / groupHeight : 1;

        // Redimensiona a posição vertical dos círculos para se ajustarem à altura máxima
        group.forEach((node) => {
            node.y = totalHeight + scaleFactor * (node.y - totalHeight);
        });

        // Desloca todo o grupo para baixo
        const groupBottom = group[group.length - 1].y + group[group.length - 1].r;
        const offsetY = containerHeight - groupBottom + verticalOffset;
        group.forEach((node) => {
            node.y += offsetY;
        });
    });
}


    function handleClick() {
        groupByCategory = !groupByCategory;

        if (groupByCategory) {
            positionGroupedCircles();
            node.transition()
                .ease(d3.easeExpInOut)
                .duration(500)
                .attr('transform', (d) => `translate(${d.x}, ${d.y})`)
                .style('opacity', 0.95);
            toggleText = 'Desagrupar';
        } else {
            node.transition()
                .ease(d3.easeExpInOut)
                .duration(500)
                .attr('transform', (d, i) => `translate(${initialPositions[i].x}, ${initialPositions[i].y})`)
                .style('opacity', 1);
            toggleText = 'Agrupar';
            node.filter((d) => !d.children)
                .select('text')
                .style('position', null)
                .style('left', null)
                .style('top', null);
        }
    }

    onMount(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('loaded');
                    drawBubbleChart();
                    observer.disconnect();
                }
            });
        }, {});

        const chartElement = document.querySelector(`#${id}`);
            chartElement.classList.add('loaded');
            observer.observe(chartElement);
    });

</script>

<div id={id} class='uva-container-bubble-chart {classe}'>
    <div id='{id}-tooltip' class='uva-tooltip'></div>
</div>
<Button classe='uva-button-toggleChart' {handleClick} value={toggleText} />


<style>
    .uva-container-bubble-chart {
        opacity: 0;
        margin: auto;
        max-width: 400px;
        height:490px;
    }

    .uva-container-bubble-chart.loaded {
        opacity: 1;
        transition: all 1s ease-in;
    }

    .uva-tooltip {
        position: absolute;
        font: 500 calc(var(--corpo-mobile) * 0.7) / 1 var(--condensed);
        color: var(--cor-texto);
        text-align: center;
        background-color: var(--cor-fundo);
        pointer-events: none;
        padding: 12px;
        border: var(--borda-fina);
        border-radius: 4px;
        box-shadow: var(--sombra-leve);
    }

    .uva-tooltip > div > div {
        font-size: calc(var(--corpo-mobile) * 1.5);
    }

    :global(.uva-button-toggleChart) {
        margin: calc(var(--margem-vertical) * 0.5)  auto calc(var(--margem-vertical) * 2) auto;
        background-color: var(--cor-texto);
        color: var(--cor-fundo);
        transition: all .35s ease-out;
    }

    :global(.uva-button-toggleChart):active,:global(.uva-button-toggleChart):hover {
        background-color: #838383;
    }
</style>