import {Alert, Button, Stack, TextField} from "@mui/material";
import {useCallback, useState} from "react";
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
      <Plot data={data} />
    </Stack>
  );
};
