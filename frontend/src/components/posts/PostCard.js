import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';

const PostCard = ({ post }) => {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">{post.title}</Typography>
        <Typography variant="body2">{post.content}</Typography>
      </CardContent>
      <CardActions>
        <Button startIcon={<FavoriteIcon />}>Like</Button>
        <Button startIcon={<CommentIcon />}>Comment</Button>
      </CardActions>
    </Card>
  );
};

export default PostCard;
