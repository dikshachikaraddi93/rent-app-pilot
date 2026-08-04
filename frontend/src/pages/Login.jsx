import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
} from "@mui/material";

export default function Login({ setIsLoggedIn }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const savedEmail = localStorage.getItem("userEmail");
    const savedPassword = localStorage.getItem("userPassword");

    if (email === savedEmail && password === savedPassword) {
      localStorage.setItem("isLoggedIn", "true");
      setIsLoggedIn(true);

      alert("Login Successful!");

      navigate("/");
    } else {
      alert("Invalid Email or Password");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#F5F7FB",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 5,
          width: 420,
          borderRadius: 4,
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          textAlign="center"
          mb={1}
        >
          RentPilot
        </Typography>

        <Typography
          textAlign="center"
          color="text.secondary"
          mb={3}
        >
          Login to continue
        </Typography>

        <TextField
          fullWidth
          label="Email"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          fullWidth
          type="password"
          label="Password"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3, py: 1.3 }}
          onClick={handleLogin}
        >
          Login
        </Button>

        <Button
          fullWidth
          variant="text"
          sx={{ mt: 2 }}
          onClick={() => navigate("/register")}
        >
          Create New Account
        </Button>
      </Paper>
    </Box>
  );
}