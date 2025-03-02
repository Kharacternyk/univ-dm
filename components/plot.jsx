import {memo} from "react";
import Plotly from "react-plotly.js";

export const Plot = memo(({ data, query }) => {
  if (data === null) {
    return null;
  }

  const columnCount = data[0].length;
  const plotData = [];

  for (const row of data) {
    const label = row[row.length - 1];

    if (plotData[label] === undefined) {
      plotData[label] = {
        x: [],
        y: columnCount > 2 ? [] : undefined,
        z: columnCount > 3 ? [] : undefined,
        type:
          columnCount > 3 ? "scatter3d" : columnCount > 2 ? "scatter" : "bar",
        name: `Class ${label}`,
        ...commonPlotData,
      };
    }

    plotData[label].x.push(row[0]);

    if (columnCount > 2) {
      plotData[label].y.push(row[1]);
    }

    if (columnCount > 3) {
      plotData[label].z.push(row[2]);
    }
  }

  if (query !== null) {
    plotData[plotData.length] = {
      x: [query[0]],
      y: columnCount > 2 ? [query[1]] : undefined,
      z: columnCount > 3 ? [query[2]] : undefined,
      name: "Query",
      type: columnCount > 3 ? "scatter3d" : columnCount > 2 ? "scatter" : "bar",
      ...commonPlotData,
    };
  }

  return <Plotly data={plotData} />;
});

const commonPlotData = {
  mode: "markers",
  marker: {
    size: 6,
    opacity: 0.75,
  },
};
