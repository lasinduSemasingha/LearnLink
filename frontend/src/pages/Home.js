import { Box, Typography, Container, Paper, useTheme, Chip, Avatar, Button, Divider, IconButton } from '@mui/material';
import PostList from '../components/posts/PostList';
import CreatePost from '../components/posts/CreatePost';
import { useState } from 'react';
import {
  TrendingUp,
  People,
  ChatBubble,
  School,
  Star,
  Notifications,
  Search,
  HelpOutline
} from '@mui/icons-material';

const Home = () => {
  const theme = useTheme();
  const [posts, setPosts] = useState([
    { 
      id: 1, 
      title: 'Welcome to Learn Link Pro!', 
      content: 'We are excited to launch our new platform where professionals can share knowledge and grow together. Let us know what skills you would like to learn or teach!',
      author: 'Admin Team',
      authorAvatar: '/avatars/admin.png',
      date: '2 days ago',
      likes: 24,
      comments: 7,
      category: 'Announcement',
      isPinned: true,
      isFeatured: true
    },
    { 
      id: 2, 
      title: 'Best practices for teaching programming online', 
      content: 'After teaching JavaScript to over 500 students, I wanted to share some tips on structuring your lessons for maximum engagement and retention.',
      author: 'Alex Johnson',
      authorAvatar: '/avatars/alex.png',
      date: '5 hours ago',
      likes: 18,
      comments: 5,
      category: 'Teaching Tips',
      isFeatured: true
    },
    { 
      id: 3, 
      title: 'Looking for UX design mentor', 
      content: 'I have 2 years of graphic design experience and want to transition into UX/UI. Would anyone be willing to mentor me? I can offer branding help in return!',
      author: 'Maria Garcia',
      authorAvatar: '/avatars/maria.png',
      date: '1 hour ago',
      likes: 8,
      comments: 3,
      category: 'Mentorship'
    },
  ]);

  const [activeCategory, setActiveCategory] = useState('All');

  const handleCreatePost = (newPost) => {
    const postWithId = { 
      ...newPost, 
      id: posts.length + 1,
      author: 'You',
      authorAvatar: '/avatars/user.png',
      date: 'Just now',
      likes: 0,
      comments: 0,
      category: newPost.category || 'General',
      isPinned: false,
      isFeatured: false
    };
    setPosts([postWithId, ...posts]);
  };

  const categories = ['All', 'Programming', 'Design', 'Business', 'Photography', 'Music', 'Languages', 'Teaching Tips', 'Mentorship'];

  return (
    <Container maxWidth="xl" sx={{ display: 'flex', gap: 4, py: 4 }}>
      {/* Main Content Area */}
      <Box sx={{ flex: 2.5 }}>
        {/* Navigation Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>
            LearnLink Pro
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <IconButton>
              <Notifications />
            </IconButton>
            <IconButton>
              <HelpOutline />
            </IconButton>
            <Avatar src="/avatars/user.png" />
          </Box>
        </Box>

        {/* Hero Section */}
        <Paper 
          elevation={0}
          sx={{
            p: 6,
            mb: 4,
            background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`,
            color: 'white',
            borderRadius: 3,
            position: 'relative',
            overflow: 'hidden',
            '&:before': {
              content: '""',
              position: 'absolute',
              top: -50,
              right: -50,
              width: 200,
              height: 200,
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '50%'
            }
          }}
        >
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 800, position: 'relative' }}>
            Elevate Your Skills Through Community
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9, maxWidth: '80%', mb: 3, position: 'relative' }}>
            Join thousands of professionals sharing knowledge, collaborating on projects, and advancing their careers.
          </Typography>
          <Button 
            variant="contained" 
            color="secondary" 
            size="large"
            sx={{ 
              fontWeight: 600,
              position: 'relative',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: 3
              }
            }}
          >
            Explore Learning Paths
          </Button>
        </Paper>

        {/* Category Filter */}
        <Box sx={{ mb: 4, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {categories.map(category => (
            <Chip
              key={category}
              label={category}
              onClick={() => setActiveCategory(category)}
              variant={activeCategory === category ? 'filled' : 'outlined'}
              color={activeCategory === category ? 'primary' : 'default'}
              sx={{
                px: 1,
                '&:hover': {
                  transform: 'scale(1.05)'
                }
              }}
            />
          ))}
        </Box>

        {/* Create Post Section */}
        <Paper elevation={0} sx={{ p: 3, mb: 4, borderRadius: 3, border: `1px solid ${theme.palette.grey[200]}` }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar src="/avatars/user.png" sx={{ mr: 2 }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Share your knowledge
            </Typography>
          </Box>
          <CreatePost onCreate={handleCreatePost} categories={categories.filter(cat => cat !== 'All')} />
        </Paper>

        {/* Posts Section */}
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              Community Discussions
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Search sx={{ mr: 1, color: theme.palette.grey[500] }} />
              <Typography variant="body2" color="textSecondary">
                Search discussions...
              </Typography>
            </Box>
          </Box>
          
          <Divider sx={{ mb: 3 }} />
          
          
        </Box>
      </Box>

      {/* Sidebar */}
      <Box sx={{ flex: 1 }}>
        {/* Quick Actions */}
        <Paper elevation={0} sx={{ p: 3, mb: 4, borderRadius: 3, border: `1px solid ${theme.palette.grey[200]}` }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, display: 'flex', alignItems: 'center' }}>
            <Star color="primary" sx={{ mr: 1 }} /> Quick Actions
          </Typography>
          <Button 
            fullWidth 
            variant="outlined" 
            sx={{ mb: 2, py: 1.5, justifyContent: 'flex-start' }}
            startIcon={<School />}
          >
            Start a Course
          </Button>
          <Button 
            fullWidth 
            variant="outlined" 
            sx={{ mb: 2, py: 1.5, justifyContent: 'flex-start' }}
            startIcon={<People />}
          >
            Find a Mentor
          </Button>
          <Button 
            fullWidth 
            variant="outlined" 
            sx={{ py: 1.5, justifyContent: 'flex-start' }}
            startIcon={<ChatBubble />}
          >
            Join a Discussion
          </Button>
        </Paper>

        {/* Trending Categories */}
        <Paper elevation={0} sx={{ p: 3, mb: 4, borderRadius: 3, border: `1px solid ${theme.palette.grey[200]}` }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, display: 'flex', alignItems: 'center' }}>
            <TrendingUp color="primary" sx={{ mr: 1 }} /> Trending Categories
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {['Web Development', 'Data Science', 'UX Design', 'Digital Marketing', 'Project Management'].map(category => (
              <Chip 
                key={category} 
                label={category}
                clickable
                sx={{
                  borderRadius: 1,
                  '&:hover': {
                    backgroundColor: theme.palette.primary.light,
                    color: 'white'
                  }
                }}
              />
            ))}
          </Box>
        </Paper>

        {/* Community Stats */}
        <Paper elevation={0} sx={{ p: 3, mb: 4, borderRadius: 3, border: `1px solid ${theme.palette.grey[200]}` }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
            Community Growth
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="body2">Total Members:</Typography>
            <Typography variant="body2" fontWeight="bold">8,742</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="body2">Active Discussions:</Typography>
            <Typography variant="body2" fontWeight="bold">1,328</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="body2">Courses Shared:</Typography>
            <Typography variant="body2" fontWeight="bold">572</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2">Mentorships Formed:</Typography>
            <Typography variant="body2" fontWeight="bold">289</Typography>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Typography variant="body2" color="textSecondary">
            Last updated: Today
          </Typography>
        </Paper>

        {/* Featured Contributors */}
        <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: `1px solid ${theme.palette.grey[200]}` }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
            Top Contributors
          </Typography>
          {[
            { name: 'Sarah Chen', role: 'Data Scientist', contributions: 42 },
            { name: 'James Wilson', role: 'UX Lead', contributions: 38 },
            { name: 'Priya Patel', role: 'Full Stack Dev', contributions: 35 }
          ].map((contributor, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar src={`/avatars/contributor-${index+1}.png`} sx={{ mr: 2 }} />
              <Box>
                <Typography fontWeight="medium">{contributor.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {contributor.role} • {contributor.contributions} contributions
                </Typography>
              </Box>
            </Box>
          ))}
          <Button fullWidth sx={{ mt: 1 }}>View All</Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default Home;