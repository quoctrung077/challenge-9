import { createTheme } from "@mui/material/styles";

const Theme = createTheme({
  typography: {
    fontFamily: '"Poppins", sans-serif',
  },
  TextField: {
    "& .MuiInputBase-root": {
      height: "40px",
    },
  },
});

export default Theme;
