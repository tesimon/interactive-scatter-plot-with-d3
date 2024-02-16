import { csvParse, select } from "d3";
import { scatterPlot } from "./scatterPlot";

// import { getResizeObserver } from "./components/resizeObserver";
export const main = (container, { state, setState }) => {
  // const [width, height] = resizeObserver;

  const { width, height } = state;

  const svg = select(container)
    .selectAll("svg")
    .data([null])
    .join("svg")
    .style("background", "rgba(10,10,10,0.8)")
    .attr("width", width)
    .attr("height", height);

  // state.data could be:
  // * undefined
  // * 'LOADING'
  // * An array of objects
  const { data, hoveredValue } = state;

  const setHoveredValue = (d) => {
    setState((state) => ({
      ...state,
      hoveredValue: d,
    }));
  };

  if (data && data !== "LOADING") {
    svg.call(scatterPlot, {
      data,
      width,
      height,
      xValue: (d) => d.sepal_length,
      yValue: (d) => d.petal_length,
      colorValue: (d) => d.species,
      xAxisLabel: "Sepal Length",
      yAxisLabel: "Petal Length",
      colorLegendLabel: "Species",
      margin: {
        top: 10,
        right: 10,
        bottom: 50,
        left: 50,
      },
      colorLegendX: 850,
      colorLegendY: 320,
      setHoveredValue,
      hoveredValue,
    });
  }

  if (data === undefined) {
    setState((state) => ({
      ...state,
      data: "LOADING",
    }));
    fetch(
      "https://gist.githubusercontent.com/curran/a08a1080b88344b0c8a7/raw/0e7a9b0a5d22642a06d3d5b9bcbad9890c8ee534/iris.csv"
    )
      .then((response) => response.text())
      .then((csvString) => {
        const data = csvParse(csvString);

        for (const d of data) {
          d.petal_length = +d.petal_length;
          d.petal_width = +d.petal_width;
          d.sepal_length = +d.sepal_length;
          d.sepal_width = +d.sepal_width;
        }

        setState((state) => ({
          ...state,
          data,
        }));
      });
  }
};
