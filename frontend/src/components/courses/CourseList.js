import CourseCard from './CourseCard';
import { Box } from '@mui/material';

const CourseList = ({ courses }) => {
  return (
    <Box>
      {courses.map(course => (
        <CourseCard key={course.id} course={course} />
      ))}
    </Box>
  );
};

export default CourseList;
