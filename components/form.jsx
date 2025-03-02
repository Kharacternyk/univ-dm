import {Alert, Button, ButtonGroup, Stack, TextField} from "@mui/material";
import {useCallback, useMemo, useState} from "react";
import {parseData, ParseError, parseQuery} from "../lib/parse-data";
import {Plot} from "./plot";

export const Form = () => {
  const [dataInput, setDataInput] = useState("");
  const [data, setData] = useState(null);
  const [dataMessage, setDataMessage] = useState(null);
  const [queryInput, setQueryInput] = useState("");
  const [query, setQuery] = useState(null);
  const [queryMessage, setQueryMessage] = useState(null);

  const dataInputHandler = useCallback((event) => {
    setDataInput(event.target.value);
  }, []);
  const queryInputHandler = useCallback((event) => {
    setQueryInput(event.target.value);
  }, []);
  const parseHandler = useCallback(() => {
    let data;

    try {
      data = parseData(dataInput);
    } catch (error) {
      if (error instanceof ParseError) {
        setDataMessage(<Alert severity="error">{error.message}</Alert>);
        return;
      } else {
        throw error;
      }
    }

    setData(data);
    setQuery(null);
    setDataMessage(null);
    setQueryMessage(null);
  }, [dataInput]);
  const classifyHandler = useCallback(() => {
    let query;

    try {
      query = parseQuery(queryInput, data[0].length - 1);
    } catch (error) {
      if (error instanceof ParseError) {
        setQueryMessage(<Alert severity="error">{error.message}</Alert>);
        return;
      } else {
        throw error;
      }
    }

    setQuery(query);
    setQueryMessage(null);
  }, [queryInput, data]);
  const presetHandlers = presets.map(
    (preset) => useCallback(() => setDataInput(preset.trim())),
    []
  );
  const presetButtons = useMemo(() =>
    presetHandlers.map((handler, index) => (
      <Button onClick={handler} key={index}>
        Preset {index + 1}
      </Button>
    ))
  );

  return (
    <Stack gap={2} width="100%">
      <TextField
        value={dataInput}
        onChange={dataInputHandler}
        placeholder="Data"
        multiline
      />
      {dataMessage}
      <ButtonGroup fullWidth>{presetButtons}</ButtonGroup>
      <Button onClick={parseHandler}>Parse</Button>
      <Plot data={data} query={query} />
      <TextField
        value={queryInput}
        onChange={queryInputHandler}
        placeholder="Query"
      />
      {queryMessage}
      <Button onClick={classifyHandler} disabled={data === null}>
        Classify
      </Button>
    </Stack>
  );
};

const presets = [
  `
0 1 2 1
1 0 1 1
0 1 1 0
0 0 1 1
0 0 1 1
1 1 2 0
1 0 2 1
1 0 0 0
0 0 0 0
0 0 1 1
  `,
  `
0 1 2 1
1 0 1 0
0 1 1 1
0 0 1 1
0 0 2 1
1 1 2 1
1 0 2 0
1 0 0 1
0 0 0 0
0 0 1 0
  `,
  `
0 1 2 0
1 0 1 0
0 1 1 0
0 0 1 0
0 0 2 1
1 1 2 1
1 0 2 1
1 0 0 1
0 0 0 0
0 0 1 1
  `,
  `
0 1 2 0
1 0 1 0
0 1 1 0
0 0 1 1
0 0 2 0
1 1 2 1
1 0 2 1
1 0 0 1
0 0 0 0
0 0 1 1
  `,
];
