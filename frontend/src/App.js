import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, CssBaseline, useMediaQuery, useTheme } from '@mui/material';
import { useState } from 'react';
import Header from './components/common/Header';
import Sidebar from './components/common/Sidebar';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import Courses from './components/courses/Courses';
import Notifications from './pages/Notifications';
import PostDetails from './pages/PostDetails';
import CourseDetails from './pages/CourseDetails';
import PostList from './components/posts/PostList';
import NotificationDetail from './components/notifications/NotificationDetail';
import UpdatePostPage from './components/posts/UpdatePostPage';
import CoursesWithProgress from './components/courses/CoursesWithProgress';
import LoginPage from './components/auth/LoginPage';
import ProfilePage from './components/common/ProfilePage';

const App = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  const handleDrawerToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const drawerWidth = 240;

  return (
    <Router>
      <CssBaseline />
      <Box 
        sx={{ 
          minHeight: '100vh',
          backgroundImage: 'url(/background.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <Box 
          sx={{ 
            display: 'flex', 
            minHeight: '100vh',
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
          }}
        >
          <Header 
            onDrawerToggle={handleDrawerToggle} 
            sidebarOpen={sidebarOpen}
            isMobile={isMobile}
          />
          <Sidebar 
            open={sidebarOpen} 
            onClose={handleDrawerToggle}
            isMobile={isMobile}
            drawerWidth={drawerWidth}
          />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              width: { md: `calc(100% - ${drawerWidth}px)` },
              marginTop: '64px',
              transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
              }),
            }}
          >
            <Box sx={{ 
              maxWidth: 1200,
              margin: '0 auto',
              minHeight: 'calc(100vh - 64px - 64px)',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/posts/:id" element={<PostDetails />} />
                <Route path="/courses/:id" element={<CourseDetails />} />
                <Route path="/posts" element={<PostList />} />
                <Route path="/notifications/:id" element={<NotificationDetail />} />
                <Route path="/posts/update/:id" element={<UpdatePostPage />} />
                <Route path="/courses/progress" element={<CoursesWithProgress />} />

                {/* Add more routes as needed */}
                <Route path="/profile" element={<ProfilePage />} />

                {/* Authentication Urls */}
                <Route path="/home" element={<Home />} />
              </Routes>
              <Box sx={{ mt: 'auto', pt: 4 }}>
                <Footer />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Router>
  );
};

export default App;
