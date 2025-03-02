import {
  createTheme,
  CssBaseline,
  Paper,
  Stack,
  ThemeProvider,
} from "@mui/material";
import {StrictMode} from "react";
import {Form} from "./form.jsx";

export const App = () => {
  return (
    <StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Stack p={2} alignItems="center" width="100%">
          <Paper elevation={2} sx={paperStyle}>
            <Stack p={2} alignItems="center" width="100%">
              <h1>Data Mining Lab 1</h1>
              <Form />
            </Stack>
          </Paper>
        </Stack>
      </ThemeProvider>
    </StrictMode>
  );
};

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

const paperStyle = { width: "min(100%, 42em)" };
