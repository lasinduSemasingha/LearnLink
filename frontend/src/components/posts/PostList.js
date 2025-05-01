import { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  CircularProgress,
  Paper,
  Avatar,
  IconButton,
  Divider,
  TextField,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  ListItemSecondaryAction
} from '@mui/material';
import { Favorite, Comment, Share, MoreVert, Send, Delete } from '@mui/icons-material';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allComments, setAllComments] = useState([]);
  const [openComments, setOpenComments] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [commentLoading, setCommentLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch posts
        const postsResponse = await fetch('http://localhost:8085/api/post');
        if (!postsResponse.ok) throw new Error('Failed to fetch posts');
        const postsData = await postsResponse.json();
        setPosts(postsData);

        // Fetch all comments
        const commentsResponse = await fetch('http://localhost:8085/api/comments');
        if (!commentsResponse.ok) throw new Error('Failed to fetch comments');
        const commentsData = await commentsResponse.json();
        setAllComments(commentsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCommentClick = (postId) => {
    setOpenComments(postId);
  };

  const handleCloseComments = () => {
    setOpenComments(null);
  };

  const handleAddComment = async (postId) => {
    if (!newComment.trim()) return;

    try {
      setCommentLoading(true);
      // In a real app, you would POST to your backend
      // const response = await fetch('http://localhost:8085/api/comments', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     postId: postId.toString(),
      //     comment: newComment
      //   })
      // });
      // const addedComment = await response.json();

      // For demo purposes, we'll simulate adding a comment
      const tempComment = {
        id: Date.now(), // temporary ID
        postId: postId.toString(),
        comment: newComment
      };

      setAllComments(prev => [...prev, tempComment]);
      setNewComment('');
    } catch (err) {
      setError(err.message);
    } finally {
      setCommentLoading(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      // In a real app, you would DELETE to your backend
      // await fetch(`http://localhost:8085/api/comments/${commentId}`, {
      //   method: 'DELETE'
      // });

      // For demo purposes, we'll simulate deleting a comment
      setAllComments(prev => prev.filter(comment => comment.id !== commentId));
    } catch (err) {
      setError(err.message);
    }
  };

  const getCommentsForPost = (postId) => {
    return allComments.filter(comment => comment.postId === postId.toString());
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ py: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
        Social Feed
      </Typography>
      
      {posts.length === 0 ? (
        <Typography variant="body1" color="textSecondary" align="center">
          No posts available. Be the first to post something!
        </Typography>
      ) : (
        posts.map(post => (
          <Paper 
            key={post.id} 
            elevation={3} 
            sx={{ 
              mb: 3, 
              borderRadius: 2,
              overflow: 'hidden'
            }}
          >
            {/* Post Header */}
            <Box display="flex" alignItems="center" p={2}>
              <Avatar sx={{ mr: 2 }}>U</Avatar>
              <Box flexGrow={1}>
                <Typography variant="subtitle1" fontWeight="bold">
                  User Name
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {new Date().toLocaleDateString()}
                </Typography>
              </Box>
              <IconButton>
                <MoreVert />
              </IconButton>
            </Box>
            
            {/* Post Content */}
            <Box p={2} pt={0}>
              <Typography variant="h6" gutterBottom>
                {post.title}
              </Typography>
              <Typography variant="body1" paragraph>
                {post.description}
              </Typography>
              
              {/* Placeholder for post image */}
              <Box 
                bgcolor="#f5f5f5" 
                height="300px" 
                display="flex" 
                alignItems="center" 
                justifyContent="center"
                borderRadius={1}
                mb={2}
              >
                <Typography color="textSecondary">Post Image</Typography>
              </Box>
            </Box>
            
            {/* Post Actions */}
            <Box px={2}>
              <Divider />
              <Box display="flex" justifyContent="space-between" py={1}>
                <IconButton aria-label="like">
                  <Favorite />
                  <Typography variant="body2" sx={{ ml: 1 }}>24</Typography>
                </IconButton>
                <IconButton 
                  aria-label="comment"
                  onClick={() => handleCommentClick(post.id)}
                >
                  <Comment />
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    {getCommentsForPost(post.id).length}
                  </Typography>
                </IconButton>
                <IconButton aria-label="share">
                  <Share />
                </IconButton>
              </Box>
            </Box>

            {/* Comments Dialog */}
            <Dialog 
              open={openComments === post.id} 
              onClose={handleCloseComments}
              fullWidth
              maxWidth="sm"
            >
              <DialogTitle>Comments ({getCommentsForPost(post.id).length})</DialogTitle>
              <DialogContent>
                <List>
                  {getCommentsForPost(post.id).map(comment => (
                    <ListItem key={comment.id}>
                      <ListItemAvatar>
                        <Avatar>U</Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={comment.comment}
                        secondary={`Comment ID: ${comment.id}`}
                      />
                      <ListItemSecondaryAction>
                        <IconButton 
                          edge="end" 
                          aria-label="delete"
                          onClick={() => handleDeleteComment(comment.id)}
                        >
                          <Delete />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
                <Box display="flex" alignItems="center" mt={2}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    disabled={commentLoading}
                  />
                  <IconButton 
                    color="primary" 
                    onClick={() => handleAddComment(post.id)}
                    disabled={!newComment.trim() || commentLoading}
                  >
                    {commentLoading ? <CircularProgress size={24} /> : <Send />}
                  </IconButton>
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseComments}>Close</Button>
              </DialogActions>
            </Dialog>
          </Paper>
        ))
      )}
    </Container>
  );
};

export default PostList;