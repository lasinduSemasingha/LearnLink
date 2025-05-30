import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Button,
  Avatar,
  Badge,
  Menu,
  MenuItem,
  Divider,
  ListItemText,
  CircularProgress,
  Chip
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header = ({ onDrawerToggle, sidebarOpen, isMobile }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifAnchorEl, setNotifAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const notifOpen = Boolean(notifAnchorEl);
  const menuOpen = Boolean(anchorEl);
  const unreadCount = notifications.filter((n) => n.status === false).length;

  useEffect(() => {
    try {
      const storedUserInfo = localStorage.getItem('userInfo');
      const loggedInStatus = sessionStorage.getItem('isLoggedIn') === 'true';

      if (storedUserInfo) {
        setUserInfo(JSON.parse(storedUserInfo));
      }
      setIsLoggedIn(loggedInStatus);
    } catch (error) {
      console.error("Error accessing localStorage:", error);
      setUserInfo(null);
      setIsLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:8085/api/notification');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const sorted = [...data].sort((a, b) => b.id - a.id);
        setNotifications(sorted);
      } catch (err) {
        console.error('Error fetching notifications:', err);
        setError('Failed to load notifications');
      } finally {
        setLoading(false);
      }
    };

    if (isLoggedIn) {
      fetchNotifications();
    }
  }, [isLoggedIn]);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotifOpen = (event) => {
    setNotifAnchorEl(event.currentTarget);
  };

  const handleNotifClose = () => {
    setNotifAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    sessionStorage.removeItem('isLoggedIn');
    setUserInfo(null);
    setIsLoggedIn(false);
    setAnchorEl(null);
    window.location.href = "http://localhost:8085/logout";
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { md: `calc(100% - ${sidebarOpen ? 240 : 0}px)` },
        ml: { md: `${sidebarOpen ? 240 : 0}px` },
        zIndex: (theme) => theme.zIndex.drawer + 1,
        transition: (theme) =>
          theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        bgcolor: 'background.paper',
        color: 'text.primary',
        boxShadow: 'none',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={onDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: 700,
              color: 'primary.main',
              display: { xs: 'none', sm: 'block' },
            }}
          >
            LearnLink
          </Typography>

          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              ml: 4,
              alignItems: 'center',
            }}
          > 
            <Button component={Link} to="/courses" color="inherit">Courses</Button>
            {isLoggedIn ? (
              <>
                <Button component={Link} to="/my-learning" color="inherit">My Learning</Button>
                <Button component={Link} to="/resources" color="inherit">Resources</Button>
              </>
            ) : null}
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton color="inherit" sx={{ display: { xs: 'none', sm: 'flex' } }}>
            <SearchIcon />
          </IconButton>

          {isLoggedIn ? (
            <>
              <IconButton color="inherit" onClick={handleNotifOpen}>
                <Badge badgeContent={unreadCount} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>

              <Menu
                anchorEl={notifAnchorEl}
                open={notifOpen}
                onClose={handleNotifClose}
                PaperProps={{
                  elevation: 3,
                  sx: {
                    mt: 1.5,
                    width: 350,
                    maxHeight: 400,
                    '& .MuiMenuItem-root': {
                      whiteSpace: 'normal',
                      alignItems: 'flex-start',
                    },
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 16,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              >
                <Typography 
  variant="subtitle1" 
  sx={{ 
    px: 2, 
    pt: 1,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }}
>
  Notifications
  <Button 
    component={Link}
    to="/notifications"
    size="small"
    variant="text"
    sx={{
      textTransform: 'none',
      color: 'primary.main',
      '&:hover': {
        backgroundColor: 'transparent',
        textDecoration: 'underline'
      }
    }}
  >
    View All
  </Button>
</Typography>
                <Divider />
                {loading ? (
                  <MenuItem>
                    <CircularProgress size={20} />
                    <ListItemText primary="Loading..." sx={{ ml: 2 }} />
                  </MenuItem>
                ) : error ? (
                  <MenuItem disabled>
                    <ListItemText primary={error} />
                  </MenuItem>
                ) : notifications.filter((n) => !n.status).length === 0 ? (
                  <MenuItem disabled>
                    <ListItemText primary="No new notifications" />
                  </MenuItem>
                ) : (
                  notifications.filter((n) => !n.status).slice(0, 5).map((notif) => (
                    <MenuItem key={notif.id} onClick={handleNotifClose}>
                      <Box sx={{ width: '100%' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography variant="subtitle2" fontWeight="bold">
                            {notif.title}
                          </Typography>
                          {!notif.status && (
                            <Chip size="small" label="Unread" color="primary" />
                          )}
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                          {notif.description}
                        </Typography>
                        <Typography variant="caption" color="text.disabled">
                          From: {notif.sender}
                        </Typography>
                      </Box>
                    </MenuItem>
                  ))
                )}
              </Menu>

              <IconButton
                onClick={handleMenuOpen}
                color="inherit"
                sx={{ p: 0, ml: 1 }}
              >
                <Avatar
                  src={userInfo.picture || '/default-avatar.png'}
                  sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}
                />
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                open={menuOpen}
                onClose={handleMenuClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    mt: 1.5,
                    minWidth: 200,
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem onClick={handleMenuClose} component={Link} to="/profile">
                  Profile
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>My Account</MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <Button
              color="inherit"
              variant="outlined"
              sx={{ display: { xs: 'none', sm: 'flex' } }}
              component={Link}
              to="/"
            >
              <AccountCircleIcon sx={{ mr: 1 }} />
              Sign In
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;