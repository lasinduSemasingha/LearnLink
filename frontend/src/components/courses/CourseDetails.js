import { Typography, Box, Button } from '@mui/material';

const CourseDetails = ({ course }) => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>{course.name}</Typography>
      <Typography variant="body1" paragraph>{course.description}</Typography>
      <Button variant="contained">Enroll Now</Button>
    </Box>
  );
};

export default CourseDetails;
