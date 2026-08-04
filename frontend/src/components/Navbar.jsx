import { AppBar, Toolbar, Typography } from "@mui/material";

export default function Navbar() {
  return (
    <AppBar
      position="static"
      sx={{
        background: "#1976d2",
      }}
    >
      <Toolbar>
        <Typography
          variant="h5"
          fontWeight="bold"
        >
          Rent Collection System
        </Typography>
      </Toolbar>
    </AppBar>
  );
}