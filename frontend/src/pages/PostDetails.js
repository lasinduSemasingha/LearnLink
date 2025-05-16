import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

const PostDetails = () => {
  const { id } = useParams();

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Post Details - ID: {id}
      </Typography>
    </Box>
  );
};

export default PostDetails;
