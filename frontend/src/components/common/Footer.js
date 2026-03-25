import { 
  Box, 
  Typography, 
  Grid, 
  Link, 
  Divider,
  IconButton,
  useTheme
} from '@mui/material';
import {
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  LinkedIn as LinkedInIcon,
  Instagram as InstagramIcon,
  YouTube as YouTubeIcon
} from '@mui/icons-material';

const Footer = ({ sidebarOpen }) => {
  const theme = useTheme();
  
  return (
    <Box 
      component="footer"
      sx={{
        width: { md: `calc(100% - ${sidebarOpen ? 240 : 0}px)` },
        ml: { md: `${sidebarOpen ? 240 : 0}px` },
        bgcolor: 'background.paper',
        color: 'text.secondary',
        borderTop: '1px solid',
        borderColor: 'divider',
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      }}
    >
      <Box sx={{ px: 4, py: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              LearnLink
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Empowering your learning journey with world-class courses and resources.
            </Typography>
            <Box>
              <IconButton aria-label="Facebook" color="inherit">
                <FacebookIcon />
              </IconButton>
              <IconButton aria-label="Twitter" color="inherit">
                <TwitterIcon />
              </IconButton>
              <IconButton aria-label="LinkedIn" color="inherit">
                <LinkedInIcon />
              </IconButton>
              <IconButton aria-label="Instagram" color="inherit">
                <InstagramIcon />
              </IconButton>
              <IconButton aria-label="YouTube" color="inherit">
                <YouTubeIcon />
              </IconButton>
            </Box>
          </Grid>
          
          <Grid item xs={6} md={2}>
            <Typography variant="subtitle1" color="text.primary" gutterBottom>
              Learn
            </Typography>
            <Link href="#" color="inherit" underline="hover" display="block" mb={1}>Courses</Link>
            <Link href="#" color="inherit" underline="hover" display="block" mb={1}>Categories</Link>
            <Link href="#" color="inherit" underline="hover" display="block" mb={1}>New Features</Link>
            <Link href="#" color="inherit" underline="hover" display="block">Learning Paths</Link>
          </Grid>
          
          <Grid item xs={6} md={2}>
            <Typography variant="subtitle1" color="text.primary" gutterBottom>
              Company
            </Typography>
            <Link href="#" color="inherit" underline="hover" display="block" mb={1}>About</Link>
            <Link href="#" color="inherit" underline="hover" display="block" mb={1}>Careers</Link>
            <Link href="#" color="inherit" underline="hover" display="block" mb={1}>Blog</Link>
            <Link href="#" color="inherit" underline="hover" display="block">Partners</Link>
          </Grid>
          
          <Grid item xs={6} md={2}>
            <Typography variant="subtitle1" color="text.primary" gutterBottom>
              Support
            </Typography>
            <Link href="#" color="inherit" underline="hover" display="block" mb={1}>Help Center</Link>
            <Link href="#" color="inherit" underline="hover" display="block" mb={1}>Contact Us</Link>
            <Link href="#" color="inherit" underline="hover" display="block" mb={1}>Feedback</Link>
            <Link href="#" color="inherit" underline="hover" display="block">Accessibility</Link>
          </Grid>
          
          <Grid item xs={6} md={3}>
            <Typography variant="subtitle1" color="text.primary" gutterBottom>
              Legal
            </Typography>
            <Link href="#" color="inherit" underline="hover" display="block" mb={1}>Terms</Link>
            <Link href="#" color="inherit" underline="hover" display="block" mb={1}>Privacy</Link>
            <Link href="#" color="inherit" underline="hover" display="block" mb={1}>Cookie Policy</Link>
            <Link href="#" color="inherit" underline="hover" display="block">Copyright</Link>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 4 }} />
        
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Typography variant="body2">
            © {new Date().getFullYear()} LearnLink. All rights reserved.
          </Typography>
          <Box sx={{ mt: { xs: 2, sm: 0 } }}>
            <Typography variant="caption" display="inline" mr={1}>
              Made with ❤️ for learners worldwide
            </Typography>
            <Typography variant="caption" color="text.secondary">
              v1.2.0
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;