import {Stack, TextField} from "@mui/material";
import {useCallback, useState} from "react";

export const Form = () => {
  const [data, setData] = useState("");

  const textHandler = useCallback((event) => {
    setData(event.target.value);
  }, []);

  return (
    <Stack>
      <TextField
        value={data}
        onChange={textHandler}
        placeholder="Data"
        multiline
      />
    </Stack>
  );
};
