import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

const CourseDetails = () => {
  const { id } = useParams();

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Course Details - ID: {id}
      </Typography>
    </Box>
  );
};

export default CourseDetails;
