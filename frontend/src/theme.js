import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2563EB",
    },
    secondary: {
      main: "#22C55E",
    },
    background: {
      default: "#F8FAFC",
    },
  },

  typography: {
    fontFamily: "Poppins, sans-serif",
  },

  shape: {
    borderRadius: 16,
  },
});

export default theme;