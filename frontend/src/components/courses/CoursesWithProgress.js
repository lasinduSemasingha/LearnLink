import { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  LinearProgress,
  Box,
  Button,
  Avatar,
  Chip,
} from '@mui/material';

const dummyCourses = [
    {
      id: 1,
      title: 'React for Beginners',
      description: 'Learn the basics of React and build your first app.',
      instructor: 'John Doe',
      image: 'https://picsum.photos/seed/react/600/400',
      price: 49,
      completion: 70,
      category: 'Web Development',
    },
    {
      id: 2,
      title: 'Mastering Python',
      description: 'From basics to advanced topics in Python.',
      instructor: 'Jane Smith',
      image: 'https://picsum.photos/seed/python/600/400',
      price: 59,
      completion: 30,
      category: 'Programming',
    },
    {
      id: 3,
      title: 'Full Stack with Node.js',
      description: 'Become a full stack developer using Node.js and React.',
      instructor: 'Alex Johnson',
      image: 'https://picsum.photos/seed/nodejs/600/400',
      price: 69,
      completion: 85,
      category: 'Full Stack',
    },
  ];

const CoursesWithProgress = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setCourses(dummyCourses);
    }, 500);
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight={700} mb={3}>
        My Learning
      </Typography>
      <Grid container spacing={4}>
        {courses.map((course) => (
          <Grid item xs={12} sm={6} md={4} key={course.id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                '&:hover': { boxShadow: 6 },
              }}
            >
              <CardMedia
                component="img"
                height="160"
                image={course.image}
                alt={course.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Chip
                  label={course.category}
                  size="small"
                  color="primary"
                  sx={{ mb: 1 }}
                />
                <Typography gutterBottom variant="h6" component="h2" fontWeight={600}>
                  {course.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {course.description}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Avatar sx={{ width: 24, height: 24, mr: 1 }}>
                    {course.instructor
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </Avatar>
                  <Typography variant="caption">{course.instructor}</Typography>
                </Box>

                <Typography variant="body2" fontWeight={500} sx={{ mb: 0.5 }}>
                  Completion: {course.completion}%
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={course.completion}
                  sx={{ height: 8, borderRadius: 5, mb: 2 }}
                />

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography variant="h6" fontWeight={700}>
                    ${course.price}
                  </Typography>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{ textTransform: 'none', borderRadius: 1 }}
                  >
                    Continue
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CoursesWithProgress;
