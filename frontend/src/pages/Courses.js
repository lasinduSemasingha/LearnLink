import { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardMedia, 
  CardContent,
  Grid,
  CircularProgress,
  Alert,
  Chip,
  Rating,
  Button,
  Container,
  Divider,
  Avatar
} from '@mui/material';
import { 
  StarBorder, 
  People, 
  AccessTime, 
  Videocam,
} from '@mui/icons-material';

// Consistent technical development image URL
const TECH_IMAGE_URL = 'https://picsum.photos/600/400?random=1'; // example static coding image

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:8085/api/courses');
        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }
        const data = await response.json();
        const enhancedCourses = data.map(course => ({
          ...course,
          rating: (Math.random() * 1 + 4).toFixed(1),
          students: Math.floor(Math.random() * 1000) + 50,
          duration: `${Math.floor(Math.random() * 5) + 1} hours`,
          lectures: Math.floor(Math.random() * 30) + 5,
          price: Math.floor(Math.random() * 50) + 20,
          discountPrice: Math.floor(Math.random() * 20) + 10,
          category: ['Programming', 'Development', 'IT & Software'][Math.floor(Math.random() * 3)],
          image: TECH_IMAGE_URL // Using the same image for all courses
        }));
        setCourses(enhancedCourses);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
        <CircularProgress size={60} thickness={4} />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
          Expand your career opportunities with our courses
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Choose from many courses taught by industry experts
        </Typography>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h5" component="h2" sx={{ fontWeight: 600, mb: 3 }}>
        Featured Courses
      </Typography>

      {courses.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          No courses available at the moment.
        </Typography>
      ) : (
        <Grid container spacing={4}>
          {courses.map((course) => (
            <Grid item key={course.id} xs={12} sm={6} md={4} lg={3}>
              <Card sx={{ 
                display: 'flex',
                flexDirection: 'column',
                height: '460px',
                width: '100%',
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 6
                }
              }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={course.image}
                  alt={course.title}
                  sx={{
                    height: '140px',
                    width: '100%',
                    objectFit: 'cover'
                  }}
                />

                <CardContent sx={{ 
                  flex: '1 1 auto',
                  overflow: 'hidden',
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <Box sx={{ mb: 1 }}>
                    <Chip 
                      label={course.category} 
                      size="small" 
                      color="primary" 
                    />
                  </Box>

                  <Typography 
                    variant="h6" 
                    component="h3" 
                    sx={{ 
                      fontWeight: 600,
                      mb: 1,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      minHeight: '3em',
                      lineHeight: '1.5em'
                    }}
                  >
                    {course.title}
                  </Typography>

                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    sx={{ 
                      mb: 2,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      minHeight: '2.8em',
                      lineHeight: '1.4em'
                    }}
                  >
                    {course.description}
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Rating 
                      value={parseFloat(course.rating)} 
                      precision={0.5} 
                      readOnly 
                      emptyIcon={<StarBorder fontSize="inherit" />}
                      size="small"
                    />
                    <Typography variant="caption" sx={{ ml: 0.5 }}>
                      {course.rating} ({course.students})
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <Avatar sx={{ width: 24, height: 24, fontSize: '0.75rem' }}>
                      {course.instructor.split(' ').map(n => n[0]).join('')}
                    </Avatar>
                    <Typography variant="caption">{course.instructor}</Typography>
                  </Box>

                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 1.5, 
                    mb: 2,
                    flexWrap: 'wrap',
                    rowGap: 0.5
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <People fontSize="small" sx={{ mr: 0.5, fontSize: '1rem' }} />
                      <Typography variant="caption">{course.students}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <AccessTime fontSize="small" sx={{ mr: 0.5, fontSize: '1rem' }} />
                      <Typography variant="caption">{course.duration}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Videocam fontSize="small" sx={{ mr: 0.5, fontSize: '1rem' }} />
                      <Typography variant="caption">{course.lectures} lectures</Typography>
                    </Box>
                  </Box>
                </CardContent>

                <Box sx={{ 
                  p: 2, 
                  borderTop: '1px solid rgba(0,0,0,0.12)',
                  mt: 'auto'
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography variant="h6" component="span" sx={{ fontWeight: 700 }}>
                        ${course.discountPrice}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        component="span" 
                        sx={{ 
                          textDecoration: 'line-through', 
                          color: 'text.secondary',
                          ml: 1
                        }}
                      >
                        ${course.price}
                      </Typography>
                    </Box>
                    <Button 
                      variant="contained" 
                      size="small" 
                      sx={{ 
                        textTransform: 'none',
                        fontWeight: 600,
                        borderRadius: 1
                      }}
                    >
                      Enroll Now
                    </Button>
                  </Box>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Courses;