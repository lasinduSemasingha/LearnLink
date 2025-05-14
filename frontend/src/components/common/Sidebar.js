import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Toolbar,
  Divider,
  Typography,
  Avatar,
  Box,
  Chip,
  useTheme
} from '@mui/material';
import {
  Home,
  School,
  Article,
  Groups,
  Notifications,
  Settings,
  VideoLibrary,
  Assignment,
  Quiz,
  BarChart,
  Help,
  Bookmark,
  History
} from '@mui/icons-material';
import { Link as RouterLink, useLocation } from 'react-router-dom';

const Sidebar = ({ open, onClose, isMobile, drawerWidth }) => {
  const theme = useTheme();
  const location = useLocation();

  const primaryItems = [
    { text: 'Home', icon: <Home />, path: '/' },
    { text: 'My Courses', icon: <School />, path: '/my-courses' },
    { text: 'Browse Courses', icon: <VideoLibrary />, path: '/courses' },
    { text: 'Learning Paths', icon: <Assignment />, path: '/paths' },
    { text: 'Practice Tests', icon: <Quiz />, path: '/tests' },
    { text: 'Community', icon: <Groups />, path: '/community' },
    { text: 'Resources', icon: <Article />, path: '/resources' },
  ];

  const secondaryItems = [
    { text: 'Bookmarks', icon: <Bookmark />, path: '/bookmarks' },
    { text: 'History', icon: <History />, path: '/history' },
    { text: 'Progress', icon: <BarChart />, path: '/progress' },
  ];

  const settingsItems = [
    { text: 'Settings', icon: <Settings />, path: '/settings' },
    { text: 'Help Center', icon: <Help />, path: '/help' },
  ];

  const user = {
    name: 'Alex Johnson',
    role: 'Premium Member',
    avatar: '/avatars/user1.jpg' // Replace with your avatar path
  };

  return (
    <Drawer
      variant={isMobile ? 'temporary' : 'persistent'}
      open={open}
      onClose={onClose}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: theme.palette.background.default,
          borderRight: 'none',
        },
      }}
    >
      {/* User Profile Section */}
      <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar 
          src={user.avatar} 
          sx={{ 
            width: 64, 
            height: 64, 
            mb: 2,
            border: `2px solid ${theme.palette.primary.main}` 
          }} 
        />
        <Typography variant="subtitle1" fontWeight="600">
          {user.name}
        </Typography>
        <Chip 
          label={user.role} 
          size="small" 
          color="primary" 
          sx={{ mt: 1, fontSize: '0.7rem' }} 
        />
      </Box>
      <Divider />

      {/* Main Navigation */}
      <List sx={{ py: 0 }}>
        {primaryItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={RouterLink}
              to={item.path}
              selected={location.pathname === item.path}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: theme.palette.action.selected,
                  borderLeft: `3px solid ${theme.palette.primary.main}`,
                },
                '&.Mui-selected:hover': {
                  backgroundColor: theme.palette.action.selected,
                },
                px: 3,
                py: 1.5,
              }}
            >
              <ListItemIcon sx={{ minWidth: '40px', color: 'inherit' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                primaryTypographyProps={{ 
                  fontWeight: location.pathname === item.path ? '600' : '500',
                  fontSize: '0.95rem'
                }} 
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />

      {/* Learning Tools */}
      <Typography variant="overline" sx={{ px: 3, py: 1, display: 'block', color: 'text.secondary' }}>
        Learning Tools
      </Typography>
      <List sx={{ py: 0 }}>
        {secondaryItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={RouterLink}
              to={item.path}
              selected={location.pathname === item.path}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: theme.palette.action.selected,
                  borderLeft: `3px solid ${theme.palette.primary.main}`,
                },
                px: 3,
                py: 1.5,
              }}
            >
              <ListItemIcon sx={{ minWidth: '40px', color: 'inherit' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                primaryTypographyProps={{ 
                  fontWeight: location.pathname === item.path ? '600' : '500',
                  fontSize: '0.95rem'
                }} 
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />

      {/* Settings & Help */}
      <List sx={{ py: 0 }}>
        {settingsItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={RouterLink}
              to={item.path}
              selected={location.pathname === item.path}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: theme.palette.action.selected,
                  borderLeft: `3px solid ${theme.palette.primary.main}`,
                },
                px: 3,
                py: 1.5,
              }}
            >
              <ListItemIcon sx={{ minWidth: '40px', color: 'inherit' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                primaryTypographyProps={{ 
                  fontWeight: location.pathname === item.path ? '600' : '500',
                  fontSize: '0.95rem'
                }} 
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* Upgrade Banner */}
      {open && (
        <Box sx={{ 
          m: 2, 
          p: 2, 
          borderRadius: 1, 
          backgroundColor: theme.palette.primary.light,
          color: theme.palette.primary.contrastText
        }}>
          <Typography variant="body2" fontWeight="600" gutterBottom>
            Unlock Premium Features
          </Typography>
          <Typography variant="caption" sx={{ display: 'block', mb: 1 }}>
            Get unlimited access to all courses and certifications
          </Typography>
          <Chip 
            label="Upgrade Now" 
            size="small" 
            sx={{ 
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              fontWeight: '600',
              cursor: 'pointer'
            }} 
          />
        </Box>
      )}
    </Drawer>
  );
};

export default Sidebar;