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
        <Stack alignItems="center">
          <Paper elevation={2} sx={paperStyle}>
            <Stack p={2} alignItems="center">
              <h1>Data Mining</h1>
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

const paperStyle = { m: 2 };
