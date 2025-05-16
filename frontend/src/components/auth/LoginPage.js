import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  Typography,
  Avatar,
  Divider,
  Paper,
  Chip
} from "@mui/material";
import { Google as GoogleIcon, Logout as LogoutIcon } from "@mui/icons-material";

function LoginPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = () => {
    window.location.href = "http://localhost:8085/oauth2/authorization/google";
  };

  const logout = () => {
    localStorage.removeItem("userInfo");
    window.location.href = "http://localhost:8085/logout";
  };

  useEffect(() => {
    fetch("http://localhost:8085/api/userinfo", {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Not authenticated");
        return res.json();
      })
      .then((data) => setUser(data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Container maxWidth="sm" sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress size={60} />
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Card elevation={3}>
        <CardContent>
          {user ? (
            <Grid container spacing={4}>
              <Grid item xs={12} md={4} sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Avatar
                  src={user.picture}
                  alt={user.name}
                  sx={{ width: 120, height: 120, mb: 2 }}
                />
                <Typography variant="h5" component="h2" gutterBottom>
                  {user.name}
                </Typography>
                <Typography color="text.secondary" gutterBottom>
                  {user.email}
                </Typography>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<LogoutIcon />}
                  onClick={logout}
                  sx={{ mt: 3 }}
                >
                  Sign Out
                </Button>
              </Grid>
              <Grid item xs={12} md={8}>
                <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                  User Information
                </Typography>
                <Divider sx={{ mb: 3 }} />
                <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
                  <Grid container spacing={2}>
                    {Object.entries(user).map(([key, value]) => (
                      <Grid item xs={12} sm={6} key={key}>
                        <Typography variant="subtitle2" color="text.secondary">
                          {key}
                        </Typography>
                        <Typography variant="body1">
                          {typeof value === "string" ? value : JSON.stringify(value)}
                        </Typography>
                      </Grid>
                    ))}
                  </Grid>
                </Paper>
                <Chip
                  label="Authenticated"
                  color="success"
                  variant="outlined"
                  sx={{ px: 1 }}
                />
              </Grid>
            </Grid>
          ) : (
            <Box sx={{ textAlign: "center", py: 4 }}>
              <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
                Welcome to Our Platform
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 4 }}>
                Please sign in with your Google account to access all features
              </Typography>
              <Button
                variant="contained"
                size="large"
                startIcon={<GoogleIcon />}
                onClick={login}
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  backgroundColor: "#4285F4",
                  "&:hover": { backgroundColor: "#357ABD" }
                }}
              >
                Sign in with Google
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}

export default LoginPage;