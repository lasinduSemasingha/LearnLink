import { Card, CardContent, Typography } from '@mui/material';

const CommentCard = ({ comment }) => {
  return (
    <Card sx={{ mb: 1 }}>
      <CardContent>
        <Typography variant="subtitle2">{comment.user}</Typography>
        <Typography variant="body2">{comment.text}</Typography>
      </CardContent>
    </Card>
  );
};

export default CommentCard;
