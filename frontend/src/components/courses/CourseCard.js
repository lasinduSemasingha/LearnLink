import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';

const CourseCard = ({ course }) => {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">{course.name}</Typography>
        <Typography variant="body2">{course.description}</Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained">Enroll</Button>
      </CardActions>
    </Card>
  );
};

export default CourseCard;
