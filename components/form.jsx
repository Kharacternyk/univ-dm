import {Alert, Button, ButtonGroup, Stack, TextField} from "@mui/material";
import {useCallback, useMemo, useState} from "react";
import {parseData, ParseError} from "../lib/parse-data";
import {Plot} from "./plot";

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
  const presetHandlers = presets.map(
    (preset) => useCallback(() => setInput(preset.trim())),
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
        value={input}
        onChange={inputHandler}
        placeholder="Data"
        multiline
      />
      {message}
      <ButtonGroup fullWidth>{presetButtons}</ButtonGroup>
      <Button onClick={parseHandler}>Parse</Button>
      <Plot data={data} />
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
