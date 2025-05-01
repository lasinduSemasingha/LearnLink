import { 
    Drawer, 
    List, 
    ListItem, 
    ListItemButton, 
    ListItemIcon, 
    ListItemText, 
    Toolbar,
    Divider,
    Typography 
  } from '@mui/material';
  import HomeIcon from '@mui/icons-material/Home';
  import BookIcon from '@mui/icons-material/Book';
  import NotificationsIcon from '@mui/icons-material/Notifications';
  import PeopleIcon from '@mui/icons-material/People';
  import SettingsIcon from '@mui/icons-material/Settings';
  import { Link as RouterLink } from 'react-router-dom';
  import { Pages } from '@mui/icons-material';
  
  const Sidebar = ({ open, onClose, isMobile, drawerWidth }) => {
    const menuItems = [
      { text: 'Home', icon: <HomeIcon />, path: '/' },
      { text: 'Courses', icon: <BookIcon />, path: '/courses' },
      {text: 'Posts', icon: <Pages />, path: '/posts' },
      { text: 'Community', icon: <PeopleIcon />, path: '/community' },
      { text: 'Notifications', icon: <NotificationsIcon />, path: '/notifications' },
    ];
  
    const secondaryItems = [
      { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
    ];
  
    return (
      <Drawer
        variant={isMobile ? 'temporary' : 'persistent'}
        open={open}
        onClose={onClose}
        ModalProps={{
          keepMounted: true, // keeps drawer in memory when closed for better performance on mobile
        }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar>
          <Typography sx={{fontWeight: '800'}} variant="h6" noWrap component="div">
            Learn Link
          </Typography>
        </Toolbar>
        <Divider />
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton 
                component={RouterLink} 
                to={item.path}
              >
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {secondaryItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton 
                component={RouterLink} 
                to={item.path}
              >
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    );
  };
  
  export default Sidebar;
  