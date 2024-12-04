import { createTheme } from "@mui/material/styles";

const Theme = createTheme({
  typography: {
    fontFamily: '"Poppins", sans-serif',
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-root": {
            height: "40px",
          },
        },
      },
    },
  },
});

export default Theme;
