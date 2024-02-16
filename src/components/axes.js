import { axisLeft, axisBottom } from "d3";

export const axes = (
  selection,
  {
    xScale,
    yScale,
    xAxisLabel,
    yAxisLabel,
    xAxisLabelOffset = 25,
    yAxisLabelOffset = 30,
  }
) => {
  const [min, max] = xScale.range();
  const distanceWidth = max - min;

  selection
    .selectAll("g.y-axis")
    .data([null])
    .join("g")
    .attr("stroke", "cyan")
    .style("color", "white")
    .attr("class", "y-axis")
    .attr("transform", `translate(${xScale.range()[0]},0)`)
    .call(axisLeft(yScale));

  selection
    .selectAll("g.x-axis")
    .data([null])
    .join("g")
    .attr("class", "x-axis")
    .attr("stroke", "cyan")
    .style("color", "white")
    .attr("transform", `translate(0,${yScale.range()[0]})`)
    .call(axisBottom(xScale).ticks(distanceWidth / 60));

  selection
    .selectAll("text.x-axis-label")
    .data([null])
    .join("text")
    .attr("x", (xScale.range()[0] + xScale.range()[1]) / 2)
    .attr("y", yScale.range()[0] + xAxisLabelOffset)
    .attr("class", "x-axis-label")
    .attr("alignment-baseline", "hanging")
    .attr("text-anchor", "middle")
    .attr("font-family", "sans-serif")
    .attr("fill", "rgba(222,200,220,1)")
    .text(xAxisLabel);

  selection
    .selectAll("text.y-axis-label")
    .data([null])
    .join("text")
    .attr("class", "y-axis-label")
    .attr("fill", "rgba(222,200,220,1)")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .attr("font-family", "sans-serif")
    .attr("x", -(yScale.range()[0] + yScale.range()[1]) / 2)
    .attr("y", xScale.range()[0] - yAxisLabelOffset)
    .text(yAxisLabel);
};
