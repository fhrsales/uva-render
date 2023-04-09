<script>
    import ChartHeading from './../headings/ChartHeading.svelte';
    import * as d3 from 'd3';
    export let data = [];
    export let id;
    export let classe;
    export let color;
    export let fillFunction;
    export let filterFunctionLessThan;
    export let filterFunctionGreaterThan;

    import { onMount } from 'svelte';
    onMount(drawBubbleChart);

    function drawBubbleChart() {
        const container = d3.select(`#${id}`)
        const containerWidth = container.node().getBoundingClientRect().width;
        const containerHeight = containerWidth;
        const svg = container.append("svg")
            .attr("viewBox", `0 0 ${containerWidth} ${containerHeight}`)
            .style("width", "100%")
            .style("height", "100%");

        const defs = svg.append("defs");
        const pattern = defs.append("pattern")
            .attr("id", "hash")
            .attr("width", 5)
            .attr("height", 8)
            .attr("patternUnits", "userSpaceOnUse")
            .attr("patternTransform", "rotate(45)");
        pattern.append("rect")
            .attr("width", 1)
            .attr("height", 8)
            .attr("transform", "translate(2,0)")
            .attr("fill", "#fff");
        pattern.append("rect")
            .attr("width", 10)
            .attr("height", 10)
            .attr("transform", "translate(1,0)")
            .attr("fill", "#007367");

        const bubble = d3.pack()
            .size([containerWidth, containerHeight]);

        const root = d3.hierarchy({ children: data })
            .sum((d) => d.value)
            .sort((a, b) => b.value - a.value);

        bubble(root);

        const node = svg.selectAll(".node")
            .data(root.descendants())
            .join("g")
            .attr("transform", (d) => `translate(${d.x},${d.y})`);

        node.filter((d) => !d.children)
            .append("circle")
            .attr("r", (d) => d.r)
            .style("fill", (d) => d.data.category === "A favor com ressalvas" ? "url(#hash)" : color(d.data.category))
        node.filter(filterFunctionLessThan)
            .append('text')
            .attr('dy', '0.4em')
            .style('text-anchor', 'middle')
            .style('font-family', 'var(--condensed)')
            .style('font-weight', '500')
            .style('font-size', 'calc(var(--corpo-mobile) * 0.7)')
            .style("fill", fillFunction)
            .text((d) => d.data.name)
            .attr('class', 'name');
        node.filter(filterFunctionGreaterThan)
            .append('text')
            .attr('dy', '-0.1em')
            .style('text-anchor', 'middle')
            .style('font-family', 'var(--condensed)')
            .style('font-weight', '500')
            .style('font-size', 'calc(var(--corpo-mobile) * 0.7)')
            .style("fill", fillFunction)
            .text((d) => d.data.name)
            .attr('class', 'name');
        node.filter(filterFunctionGreaterThan)
            .append('text')
            .attr('dy', '0.9em')
            .style('text-anchor', 'middle')
            .style('font-family', 'var(--condensed)')
            .style('font-weight', '700')
            .style('font-size', 'calc(var(--corpo-mobile) * 0.9)')
            .style("fill", fillFunction)
            .text((d) => d.data.value)
    }
</script>

<div id={id} class='uva-container-bubble-chart {classe}'></div>

<style>
    .uva-container-bubble-chart {
        margin: 0 auto calc(var(--margem-vertical) * 2) auto;
    }
</style>


