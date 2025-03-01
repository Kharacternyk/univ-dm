import {Alert, Button, Stack, TextField} from "@mui/material";
import {useCallback, useMemo, useState} from "react";
import Plot from "react-plotly.js";
import {parseData, ParseError} from "../lib/parse-data";

export const Form = () => {
  const [input, setInput] = useState("");
  const [data, setData] = useState(null);
  const [message, setMessage] = useState(null);

  const inputHandler = useCallback((event) => {
    setInput(event.target.value);
  }, []);
  const parseHandler = useCallback(() => {
    let data;

    try {
      data = parseData(input);
    } catch (error) {
      if (error instanceof ParseError) {
        setMessage(<Alert severity="error">{error.message}</Alert>);
        return;
      } else {
        throw error;
      }
    }

    setData(data);
    setMessage(null);
  }, [input]);

  const plot = useMemo(() => {
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
          mode: "markers",
          type:
            columnCount > 3 ? "scatter3d" : columnCount > 2 ? "scatter" : "bar",
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

    return <Plot data={plotData} />;
  }, [data]);

  return (
    <Stack gap={2} width="100%">
      <TextField
        value={input}
        onChange={inputHandler}
        placeholder="Data"
        multiline
      />
      {message}
      <Button onClick={parseHandler}>Parse</Button>
      {plot}
    </Stack>
  );
};
