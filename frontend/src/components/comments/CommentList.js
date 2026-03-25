import CommentCard from './CommentCard';
import { Box } from '@mui/material';

const CommentList = ({ comments }) => {
  return (
    <Box>
      {comments.map(comment => (
        <CommentCard key={comment.id} comment={comment} />
      ))}
    </Box>
  );
};

export default CommentList;
