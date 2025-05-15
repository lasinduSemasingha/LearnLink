import { Box, Typography, Container, Paper, useTheme, Chip, Avatar, Button, Divider, IconButton, Badge, InputBase } from '@mui/material';
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
  HelpOutline,
  Bolt,
  RocketLaunch,
  Groups,
  Bookmark,
  Forum
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
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <RocketLaunch color="primary" sx={{ fontSize: 32 }} />
            <Typography variant="h4" sx={{ fontWeight: 800, color: theme.palette.primary.main, letterSpacing: '-0.5px' }}>
              LearnLink<span style={{ color: theme.palette.secondary.main }}>Pro</span>
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Paper 
              component="form" 
              sx={{ 
                p: '2px 8px', 
                display: 'flex', 
                alignItems: 'center', 
                width: 300,
                borderRadius: 3,
                boxShadow: 'none',
                border: `1px solid ${theme.palette.grey[300]}`
              }}
            >
              <Search sx={{ color: theme.palette.grey[500], mr: 1 }} />
              <InputBase
                placeholder="Search skills, topics, mentors..."
                sx={{ flex: 1 }}
              />
            </Paper>
            <IconButton sx={{ 
              backgroundColor: theme.palette.grey[100],
              '&:hover': { backgroundColor: theme.palette.grey[200] }
            }}>
              <HelpOutline />
            </IconButton>
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
            boxShadow: `0 10px 20px ${theme.palette.primary.light}30`,
            '&:before': {
              content: '""',
              position: 'absolute',
              top: -50,
              right: -50,
              width: 200,
              height: 200,
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '50%'
            },
            '&:after': {
              content: '""',
              position: 'absolute',
              bottom: -80,
              left: -80,
              width: 250,
              height: 250,
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '50%'
            }
          }}
        >
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Chip 
              label="New Feature" 
              color="secondary" 
              size="small" 
              icon={<Bolt sx={{ fontSize: 16 }} />}
              sx={{ mb: 2, fontWeight: 600 }}
            />
            <Typography variant="h3" gutterBottom sx={{ fontWeight: 800, lineHeight: 1.2 }}>
              Grow Your Skills <br />Through Community
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9, maxWidth: '80%', mb: 4 }}>
              Join thousands of professionals sharing knowledge, collaborating on projects, and advancing their careers.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button 
                variant="contained" 
                color="secondary" 
                size="large"
                sx={{ 
                  fontWeight: 700,
                  px: 4,
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 3
                  }
                }}
              >
                Explore Learning Paths
              </Button>
              <Button 
                variant="outlined" 
                size="large"
                sx={{ 
                  fontWeight: 600,
                  px: 4,
                  color: 'white',
                  borderColor: 'white',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    borderColor: 'white'
                  }
                }}
              >
                Meet Mentors
              </Button>
            </Box>
          </Box>
        </Paper>

        {/* Stats Bar */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          mb: 4,
          backgroundColor: theme.palette.grey[50],
          borderRadius: 3,
          p: 3,
          border: `1px solid ${theme.palette.grey[200]}`
        }}>
          {[
            { icon: <Groups sx={{ fontSize: 32, color: theme.palette.primary.main }} />, value: '8.7K+', label: 'Members' },
            { icon: <School sx={{ fontSize: 32, color: theme.palette.secondary.main }} />, value: '572', label: 'Courses' },
            { icon: <Forum sx={{ fontSize: 32, color: theme.palette.success.main }} />, value: '1.3K', label: 'Discussions' },
            { icon: <People sx={{ fontSize: 32, color: theme.palette.warning.main }} />, value: '289', label: 'Mentorships' }
          ].map((stat, index) => (
            <Box key={index} sx={{ textAlign: 'center', px: 2 }}>
              {stat.icon}
              <Typography variant="h5" sx={{ fontWeight: 700, mt: 1 }}>{stat.value}</Typography>
              <Typography variant="body2" color="textSecondary">{stat.label}</Typography>
            </Box>
          ))}
        </Box>

        {/* Category Filter */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, color: theme.palette.text.secondary }}>
            Browse by category:
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {categories.map(category => (
              <Chip
                key={category}
                label={category}
                onClick={() => setActiveCategory(category)}
                variant={activeCategory === category ? 'filled' : 'outlined'}
                color={activeCategory === category ? 'primary' : 'default'}
                sx={{
                  px: 1,
                  borderRadius: 1,
                  fontWeight: 600,
                  '&:hover': {
                    transform: 'scale(1.05)',
                    backgroundColor: activeCategory === category ? 
                      theme.palette.primary.main : 
                      theme.palette.grey[100]
                  }
                }}
              />
            ))}
          </Box>
        </Box>

        {/* Create Post Section */}
        <Paper elevation={0} sx={{ 
          p: 3, 
          mb: 4, 
          borderRadius: 3, 
          border: `1px solid ${theme.palette.grey[200]}`,
          boxShadow: `0 5px 15px ${theme.palette.grey[100]}`,
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: `0 8px 25px ${theme.palette.grey[200]}`
          }
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar src="/avatars/user.png" sx={{ 
              mr: 2,
              width: 48,
              height: 48,
              border: `2px solid ${theme.palette.primary.light}`
            }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Share your knowledge with the community
            </Typography>
          </Box>
          <CreatePost onCreate={handleCreatePost} categories={categories.filter(cat => cat !== 'All')} />
        </Paper>

        {/* Posts Section */}
        <Box>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            mb: 3,
            backgroundColor: theme.palette.grey[50],
            p: 2,
            borderRadius: 3
          }}>
            <Typography variant="h5" sx={{ fontWeight: 700, display: 'flex', alignItems: 'center' }}>
              <ChatBubble color="primary" sx={{ mr: 1 }} /> Community Discussions
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center',
              backgroundColor: 'white',
              borderRadius: 3,
              px: 2,
              py: 1,
              border: `1px solid ${theme.palette.grey[300]}`
            }}>
              <Search sx={{ mr: 1, color: theme.palette.grey[500] }} />
              <Typography variant="body2" color="textSecondary">
                Search discussions...
              </Typography>
            </Box>
          </Box>
          
          <Divider sx={{ mb: 3 }} />
          
          <PostList 
            posts={activeCategory === 'All' ? 
              posts : 
              posts.filter(post => post.category === activeCategory)} 
          />
        </Box>
      </Box>

      {/* Sidebar */}
      <Box sx={{ flex: 1 }}>
        {/* Quick Actions */}
        <Paper elevation={0} sx={{ 
          p: 3, 
          mb: 4, 
          borderRadius: 3, 
          border: `1px solid ${theme.palette.grey[200]}`,
          background: `linear-gradient(to bottom, ${theme.palette.grey[50]} 0%, white 100%)`
        }}>
          <Typography variant="h6" gutterBottom sx={{ 
            fontWeight: 700, 
            display: 'flex', 
            alignItems: 'center',
            color: theme.palette.primary.dark
          }}>
            <Bolt color="primary" sx={{ mr: 1 }} /> Quick Actions
          </Typography>
          <Button 
            fullWidth 
            variant="contained" 
            sx={{ 
              mb: 2, 
              py: 1.5, 
              justifyContent: 'flex-start',
              borderRadius: 2,
              fontWeight: 600,
              backgroundColor: theme.palette.primary.main,
              '&:hover': {
                backgroundColor: theme.palette.primary.dark
              }
            }}
            startIcon={<School sx={{ fontSize: 24 }} />}
          >
            Start a Course
          </Button>
          <Button 
            fullWidth 
            variant="outlined" 
            sx={{ 
              mb: 2, 
              py: 1.5, 
              justifyContent: 'flex-start',
              borderRadius: 2,
              fontWeight: 600,
              borderColor: theme.palette.grey[300],
              '&:hover': {
                borderColor: theme.palette.primary.main,
                backgroundColor: theme.palette.primary.light + '10'
              }
            }}
            startIcon={<People sx={{ fontSize: 24 }} />}
          >
            Find a Mentor
          </Button>
          <Button 
            fullWidth 
            variant="outlined" 
            sx={{ 
              py: 1.5, 
              justifyContent: 'flex-start',
              borderRadius: 2,
              fontWeight: 600,
              borderColor: theme.palette.grey[300],
              '&:hover': {
                borderColor: theme.palette.primary.main,
                backgroundColor: theme.palette.primary.light + '10'
              }
            }}
            startIcon={<Forum sx={{ fontSize: 24 }} />}
          >
            Join a Discussion
          </Button>
        </Paper>

        {/* Trending Categories */}
        <Paper elevation={0} sx={{ 
          p: 3, 
          mb: 4, 
          borderRadius: 3, 
          border: `1px solid ${theme.palette.grey[200]}`,
          background: `linear-gradient(to bottom, ${theme.palette.grey[50]} 0%, white 100%)`
        }}>
          <Typography variant="h6" gutterBottom sx={{ 
            fontWeight: 700, 
            display: 'flex', 
            alignItems: 'center',
            color: theme.palette.primary.dark
          }}>
            <TrendingUp color="primary" sx={{ mr: 1 }} /> Trending This Week
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {[
              { name: 'Web Development', posts: 142 },
              { name: 'Data Science', posts: 98 },
              { name: 'UX Design', posts: 76 },
              { name: 'Digital Marketing', posts: 65 },
              { name: 'Project Management', posts: 54 }
            ].map((category, index) => (
              <Chip 
                key={index} 
                label={`${category.name} (${category.posts})`}
                clickable
                sx={{
                  borderRadius: 1,
                  fontWeight: 500,
                  backgroundColor: theme.palette.grey[100],
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
        <Paper elevation={0} sx={{ 
          p: 3, 
          mb: 4, 
          borderRadius: 3, 
          border: `1px solid ${theme.palette.grey[200]}`,
          background: `linear-gradient(to bottom, ${theme.palette.grey[50]} 0%, white 100%)`
        }}>
          <Typography variant="h6" gutterBottom sx={{ 
            fontWeight: 700,
            color: theme.palette.primary.dark
          }}>
            Community Growth
          </Typography>
          {[
            { label: 'Total Members', value: '8,742', change: '+12%', positive: true },
            { label: 'Active Discussions', value: '1,328', change: '+24%', positive: true },
            { label: 'Courses Shared', value: '572', change: '+8%', positive: true },
            { label: 'Mentorships Formed', value: '289', change: '+15%', positive: true }
          ].map((stat, index) => (
            <Box key={index} sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              mb: 2,
              p: 1,
              borderRadius: 1,
              '&:hover': {
                backgroundColor: theme.palette.grey[100]
              }
            }}>
              <Typography variant="body2">{stat.label}:</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2" fontWeight="bold" sx={{ mr: 1 }}>{stat.value}</Typography>
                <Typography variant="caption" sx={{ 
                  color: stat.positive ? theme.palette.success.main : theme.palette.error.main,
                  fontWeight: 600
                }}>
                  {stat.change}
                </Typography>
              </Box>
            </Box>
          ))}
          <Divider sx={{ my: 2 }} />
          <Typography variant="body2" color="textSecondary">
            Last updated: Today
          </Typography>
        </Paper>

        {/* Featured Contributors */}
        <Paper elevation={0} sx={{ 
          p: 3, 
          borderRadius: 3, 
          border: `1px solid ${theme.palette.grey[200]}`,
          background: `linear-gradient(to bottom, ${theme.palette.grey[50]} 0%, white 100%)`
        }}>
          <Typography variant="h6" gutterBottom sx={{ 
            fontWeight: 700,
            color: theme.palette.primary.dark
          }}>
            Top Contributors
          </Typography>
          {[
            { name: 'Sarah Chen', role: 'Data Scientist', contributions: 42, avatar: '/avatars/contributor-1.png' },
            { name: 'James Wilson', role: 'UX Lead', contributions: 38, avatar: '/avatars/contributor-2.png' },
            { name: 'Priya Patel', role: 'Full Stack Dev', contributions: 35, avatar: '/avatars/contributor-3.png' },
            { name: 'Michael Brown', role: 'Digital Marketer', contributions: 28, avatar: '/avatars/contributor-4.png' }
          ].map((contributor, index) => (
            <Box 
              key={index} 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                mb: 2,
                p: 1,
                borderRadius: 2,
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: theme.palette.grey[100],
                  transform: 'translateX(5px)'
                }
              }}
            >
              <Avatar 
                src={contributor.avatar} 
                sx={{ 
                  mr: 2,
                  width: 48,
                  height: 48,
                  border: `2px solid ${theme.palette.primary.light}`
                }} 
              />
              <Box>
                <Typography fontWeight="medium">{contributor.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {contributor.role} • {contributor.contributions} contributions
                </Typography>
              </Box>
              <Box sx={{ ml: 'auto' }}>
                <Chip 
                  label="Follow" 
                  size="small" 
                  variant="outlined" 
                  sx={{ 
                    borderColor: theme.palette.primary.main,
                    color: theme.palette.primary.main,
                    '&:hover': {
                      backgroundColor: theme.palette.primary.light + '20'
                    }
                  }}
                />
              </Box>
            </Box>
          ))}
          <Button 
            fullWidth 
            sx={{ 
              mt: 1,
              fontWeight: 600,
              color: theme.palette.primary.main
            }}
          >
            View All Contributors
          </Button>
        </Paper>

        {/* Learning Resources */}
        <Paper elevation={0} sx={{ 
          p: 3, 
          mt: 4, 
          borderRadius: 3, 
          border: `1px solid ${theme.palette.grey[200]}`,
          background: `linear-gradient(135deg, ${theme.palette.secondary.light} 0%, ${theme.palette.primary.light} 100%)`,
          color: 'white'
        }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
            Free Learning Resources
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, opacity: 0.9 }}>
            Access our curated collection of free courses, templates, and guides.
          </Typography>
          <Button 
            variant="contained" 
            fullWidth 
            sx={{ 
              mt: 1,
              fontWeight: 600,
              backgroundColor: 'white',
              color: theme.palette.primary.main,
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.9)'
              }
            }}
          >
            Explore Resources
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default Home;