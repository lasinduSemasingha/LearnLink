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
  Chip,
  Stack,
  useTheme
} from "@mui/material";
import { 
  Google as GoogleIcon, 
  Logout as LogoutIcon,
  Security as SecurityIcon,
  VerifiedUser as VerifiedUserIcon,
  Info as InfoIcon,
  Email as EmailIcon,
  Person as PersonIcon,
  Lock as LockIcon
} from "@mui/icons-material";
import { motion } from "framer-motion";

function LoginPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  const login = () => {
    sessionStorage.setItem("isLoggedIn", "true");
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
      <Container maxWidth="sm" sx={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        height: "100vh" 
      }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <CircularProgress size={60} thickness={4} />
          <Typography variant="h6" sx={{ mt: 3, textAlign: 'center' }}>
            Verifying authentication...
          </Typography>
        </motion.div>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card elevation={3} sx={{ 
          borderRadius: 3,
          overflow: 'hidden',
          boxShadow: theme.shadows[6]
        }}>
          {user ? (
            <Grid container>
              <Grid item xs={12} md={4} sx={{ 
                bgcolor: theme.palette.primary.light, 
                p: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center'
              }}>
                <Avatar
                  src={user.picture}
                  alt={user.name}
                  sx={{ 
                    width: 140, 
                    height: 140, 
                    mb: 3,
                    border: `4px solid ${theme.palette.background.paper}`,
                    boxShadow: theme.shadows[3]
                  }}
                />
                <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
                  {user.name}
                </Typography>
                <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                  <EmailIcon fontSize="small" color="action" />
                  <Typography color="text.secondary">
                    {user.email}
                  </Typography>
                </Stack>
                <Chip
                  icon={<VerifiedUserIcon />}
                  label="Verified Account"
                  color="success"
                  variant="outlined"
                  sx={{ mb: 3 }}
                />
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<LogoutIcon />}
                  onClick={logout}
                  sx={{ 
                    mt: 2,
                    px: 4,
                    borderRadius: 2,
                    textTransform: 'none'
                  }}
                >
                  Sign Out
                </Button>
              </Grid>
              <Grid item xs={12} md={8} sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom sx={{ 
                  mb: 3,
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}>
                  <SecurityIcon color="primary" /> Account Details
                </Typography>
                <Divider sx={{ mb: 4 }} />
                <Paper variant="outlined" sx={{ 
                  p: 3, 
                  mb: 3,
                  borderRadius: 2,
                  borderColor: theme.palette.divider
                }}>
                  <Grid container spacing={3}>
                    {Object.entries(user).filter(([key]) => !['picture', 'sub'].includes(key)).map(([key, value]) => (
                      <Grid item xs={12} sm={6} key={key}>
                        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5 }}>
                          {key === 'name' && <PersonIcon fontSize="small" color="action" />}
                          {key === 'email' && <EmailIcon fontSize="small" color="action" />}
                          {key === 'email_verified' && <LockIcon fontSize="small" color="action" />}
                          {!['name', 'email', 'email_verified'].includes(key) && <InfoIcon fontSize="small" color="action" />}
                          <Typography variant="subtitle2" color="text.secondary" sx={{ textTransform: 'capitalize' }}>
                            {key.replace('_', ' ')}
                          </Typography>
                        </Stack>
                        <Typography variant="body1" sx={{ 
                          fontWeight: 500,
                          wordBreak: 'break-word'
                        }}>
                          {typeof value === 'boolean' ? 
                            (value ? 'Yes' : 'No') : 
                            (typeof value === 'string' ? value : JSON.stringify(value))}
                        </Typography>
                      </Grid>
                    ))}
                  </Grid>
                </Paper>
                <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                  <Chip
                    label="Secure Connection"
                    color="success"
                    icon={<SecurityIcon />}
                    variant="outlined"
                  />
                  <Chip
                    label="OAuth 2.0"
                    color="primary"
                    variant="outlined"
                  />
                </Stack>
              </Grid>
            </Grid>
          ) : (
            <Box sx={{ 
              textAlign: "center", 
              p: 6,
              background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.primary.light} 100%)`
            }}>
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <SecurityIcon sx={{ 
                  fontSize: 60, 
                  color: theme.palette.primary.main,
                  mb: 2
                }} />
                <Typography variant="h3" component="h1" gutterBottom sx={{ 
                  mb: 3,
                  fontWeight: 700,
                  color: theme.palette.text.primary
                }}>
                  Secure Portal Access
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph sx={{ 
                  mb: 4,
                  maxWidth: '600px',
                  margin: '0 auto',
                  fontSize: '1.1rem',
                  lineHeight: 1.6
                }}>
                  Authenticate with your Google account to access the platform. Your information is protected with industry-standard security protocols.
                </Typography>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<GoogleIcon />}
                    onClick={login}
                    sx={{
                      px: 5,
                      py: 1.5,
                      borderRadius: 2,
                      backgroundColor: "#4285F4",
                      color: 'white',
                      fontWeight: 600,
                      fontSize: '1rem',
                      textTransform: 'none',
                      "&:hover": { 
                        backgroundColor: "#357ABD",
                        boxShadow: theme.shadows[4]
                      },
                      boxShadow: theme.shadows[2]
                    }}
                  >
                    Continue with Google
                  </Button>
                </motion.div>
                <Typography variant="caption" color="text.secondary" display="block" sx={{ 
                  mt: 4,
                  fontSize: '0.8rem'
                }}>
                  By continuing, you agree to our Terms of Service and Privacy Policy
                </Typography>
              </motion.div>
            </Box>
          )}
        </Card>
      </motion.div>
    </Container>
  );
}

export default LoginPage;