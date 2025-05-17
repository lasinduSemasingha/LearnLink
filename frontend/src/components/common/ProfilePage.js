import React, { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Avatar,
    Paper,
    Divider,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    CircularProgress,
} from "@mui/material";
import {
    Person,
    Email,
    AccountCircle,
    FamilyRestroom,
    Badge,
    VerifiedUser,
} from "@mui/icons-material";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import { blue, purple, teal, amber } from "@mui/material/colors";

// Custom Theme
const customTheme = createTheme({
    palette: {
        primary: {
            main: blue[500], // Vibrant blue
        },
        secondary: {
            main: purple[500], // Complementary purple
        },
        accent: {
            main: teal[400], // Teal accent
        },
        warning: {
            main: amber[500]
        },
        text: {
            primary: "#2c3e50", // Darker, more readable text
            secondary: "#66737d",
        },
        background: {
            paper: "transparent", // Changed to transparent
            default: "#f9f9f9",
        },
    },
    typography: {
        fontFamily: "'Nunito', sans-serif", // Modern font
        h4: {
            fontWeight: 800, // Extra bold for headings
            color: blue[800],
        },
        h6: {
            fontWeight: 700,
            color: purple[700],
        },
        subtitle1: {
            color: "#7f8c8d",
            fontWeight: 500,
        },
    },
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 16, // More rounded paper
                    boxShadow: "0px 15px 40px rgba(0, 0, 0, 0.12)", // Deeper shadow
                    transition:
                        "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                    "&:hover": {
                        transform: "translateY(-6px)",
                        boxShadow: "0px 18px 50px rgba(0, 0, 0, 0.18)", // Enhanced hover shadow
                    },
                    maxWidth: 700, // Increased maxWidth
                    margin: '0 auto',
                    padding: '32px', // Added padding here
                    // backgroundColor: 'transparent', // Removed backgroundColor
                },
            },
        },
        MuiAvatar: {
            styleOverrides: {
                root: {
                    width: 130, // Larger avatar
                    height: 130,
                    border: `4px solid ${blue[500]}`,
                    boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.15)",
                    transition: "transform 0.2s ease-in-out",
                    "&:hover": {
                        transform: "scale(1.08)", // Stronger scale on hover
                    },
                },
            },
        },
        MuiListItem: {
            styleOverrides: {
                root: {
                    padding: "12px 0",
                    transition: "background-color 0.3s ease",
                    "&:hover": {
                        backgroundColor: "rgba(0, 0, 0, 0.04)", // Subtle hover background
                        borderRadius: 8,
                    },
                },
            },
        },
        MuiListItemIcon: {
            styleOverrides: {
                root: {
                    color: teal[500], // Accent color for icons
                    marginRight: "16px",
                    fontSize: "28px",
                },
            },
        },
        MuiListItemText: {
            styleOverrides: {
                primary: {
                    fontWeight: 600,
                    color: "#34495e", // Darker primary text
                },
                secondary: {
                    color: "#4a6572", // Slightly darker secondary
                },
            },
        },
        MuiDivider: {
            styleOverrides: {
                root: {
                    backgroundColor: "rgba(0, 0, 0, 0.08)", // Very light divider
                    margin: "24px 0",
                },
            },
        },
        MuiBadge: {
            styleOverrides: {
                badge: {
                    backgroundColor: amber[500], // Warning color for badge
                    color: "white",
                    fontWeight: 600,
                    fontSize: "0.8rem",
                    minWidth: "24px",
                    height: "24px",
                    borderRadius: "12px",
                    padding: "0 6px",
                    transform: "scale(1.1)", // Larger badge
                },
            },
        },
    },
});

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem("userInfo");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="80vh"
            >
                <CircularProgress size={70} color="primary" />
            </Box>
        );
    }

    if (!user) {
        return (
            <Box p={4} textAlign="center">
                <Typography variant="h6" color="textSecondary">
                    No user information found. Please log in.
                </Typography>
            </Box>
        );
    }

    return (
        <ThemeProvider theme={customTheme}>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="80vh"
                padding={3}
                bgcolor={customTheme.palette.background.default}
            >
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    style={{ width: '100%' }}
                >
                    <Paper>
                        <Box
                            display="flex"
                            flexDirection="column"
                            alignItems="center"
                            marginBottom={5}
                        >
                            <motion.div
                                whileHover={{ scale: 1.15 }} // Stronger hover
                                transition={{
                                    type: "spring",
                                    stiffness: 450,
                                    damping: 25,
                                }}
                            >
                                <Avatar
                                    src={user.picture}
                                    alt="User avatar"
                                />
                            </motion.div>
                            <Typography variant="h4" component="h1" gutterBottom>
                                {user.name}
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom>
                                {user.email}
                            </Typography>
                        </Box>

                        <Divider />

                        <Typography variant="h6">Profile Details</Typography>

                        <List>
                            <ListItem>
                                <ListItemIcon>
                                    <Badge color="primary" />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Full Name"
                                    secondary={user.name}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <AccountCircle color="primary" />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Given Name"
                                    secondary={user.given_name}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <FamilyRestroom color="primary" />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Family Name"
                                    secondary={user.family_name}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <Email color="primary" />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Email"
                                    secondary={user.email}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <VerifiedUser color="primary" />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Auth Provider"
                                    secondary="Google"
                                />
                            </ListItem>
                        </List>
                    </Paper>
                </motion.div>
            </Box>
        </ThemeProvider>
    );
};

export default ProfilePage;
