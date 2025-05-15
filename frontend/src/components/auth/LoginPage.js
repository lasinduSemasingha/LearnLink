import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("http://localhost:8085/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Login failed");
      }

      const data = await response.json();
      // Store token securely - here localStorage for demo
      localStorage.setItem("token", data.token);
      setSuccess("Login successful!");
      setUsername("");
      setPassword("");
      navigate("/home"); // Redirect to home page or dashboard
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <Box
      maxWidth={400}
      mx="auto"
      mt={8}
      p={4}
      boxShadow={3}
      borderRadius={2}
      bgcolor="background.paper"
    >
      <Typography variant="h5" mb={3} textAlign="center">
        Login
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}

      <TextField
        label="Username"
        variant="outlined"
        fullWidth
        margin="normal"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        autoComplete="username"
      />
      <TextField
        label="Password"
        variant="outlined"
        type="password"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="current-password"
      />

      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleLogin}
        disabled={loading || !username || !password}
        sx={{ mt: 2 }}
      >
        {loading ? <CircularProgress size={24} /> : "Login"}
      </Button>
    </Box>
  );
}
