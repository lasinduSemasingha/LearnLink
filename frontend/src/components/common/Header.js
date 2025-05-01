import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Header = ({ onDrawerToggle, sidebarOpen, isMobile }) => {
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
      }}
    >
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={onDrawerToggle}
          sx={{ mr: 2, display: { md: 'none' } }} // only visible on mobile
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
