export const colorLegend = (
  selection,
  {
    colorScale,
    colorLegendLabel,
    tickSpacing = 30,
    tickPadding = 15,
    colorLegendLabelX = -10,
    colorLegendLabelY = -24,
    setHoveredValue,
    hoveredValue,
  }
) => {
  const colorLegendG = selection
    .selectAll("g.color-legend")
    .data([null])
    .join("g")
    .attr("class", "color-legend")
    .attr("transform", `translate(${innerWidth / 1.2},${innerHeight / 1.5})`);

  colorLegendG
    .selectAll("text.color-legend-label")
    .data([null])
    .join("text")
    .attr("x", colorLegendLabelX)
    .attr("y", colorLegendLabelY)
    .attr("class", "color-legend-label")
    .attr("fill", "cyan")
    .attr("font-family", "sans-serif")
    .text(colorLegendLabel);

  colorLegendG
    .selectAll("g.tick")
    .data(colorScale.domain())
    .join((enter) =>
      enter
        .append("g")
        .attr("class", "tick")
        .call((selection) => {
          selection.append("circle");
          selection.append("text");
        })
    )
    .style("cursor", "pointer")
    .attr("transform", (d, i) => `translate(0, ${i * tickSpacing})`)
    .attr("font-size", 8)
    .attr("font-family", "sans-serif")
    .call((selection) => {
      selection.select("circle").attr("r", 10).attr("fill", colorScale);
      selection
        .select("text")
        .attr("dy", "0.32em")
        .attr("x", tickPadding)
        .attr("fill", "white")
        .attr("font-size", 13)
        .style("user-select", "none")
        .text((d) => d);
    })
    .attr("opacity", (d) => (hoveredValue ? (d === hoveredValue ? 1 : 0.2) : 1))
    .on("mouseover", (event, d) => {
      setHoveredValue(d);
    })
    .on("mouseout", () => {
      setHoveredValue(null);
    });
};
