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
  Divider
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';

const Header = ({ onDrawerToggle, sidebarOpen, isMobile }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar 
      position="fixed"
      sx={{
        width: { md: `calc(100% - ${sidebarOpen ? 240 : 0}px)` },
        ml: { md: `${sidebarOpen ? 240 : 0}px` },
        zIndex: (theme) => theme.zIndex.drawer + 1,
        transition: (theme) => theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        bgcolor: 'background.paper',
        color: 'text.primary',
        boxShadow: 'none',
        borderBottom: '1px solid',
        borderColor: 'divider'
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
              display: { xs: 'none', sm: 'block' }
            }}
          >
            LearnLink
          </Typography>
          
          <Box sx={{ 
            display: { xs: 'none', md: 'flex' }, 
            ml: 4,
            alignItems: 'center'
          }}>
            <Button color="inherit">Courses</Button>
            <Button color="inherit">My Learning</Button>
            <Button color="inherit">Resources</Button>
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton color="inherit" sx={{ display: { xs: 'none', sm: 'flex' } }}>
            <SearchIcon />
          </IconButton>
          
          <IconButton color="inherit">
            <Badge badgeContent={3} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          
          <IconButton
            onClick={handleMenuOpen}
            color="inherit"
            sx={{ p: 0, ml: 1 }}
          >
            <Avatar 
  src={userInfo && userInfo.picture ? userInfo.picture : '/default-avatar.png'} 
  sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}
/>
          </IconButton>
          
          <Menu
            anchorEl={anchorEl}
            open={open}
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
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My Account</MenuItem>
            <Divider />
            <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;