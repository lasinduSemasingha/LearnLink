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
  ListItemSecondaryAction,
  Snackbar,
  Alert
} from '@mui/material';
import { Favorite, Comment, Share, MoreVert, Send, Delete } from '@mui/icons-material';

const POST_IMAGE_URL = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allComments, setAllComments] = useState([]);
  const [openComments, setOpenComments] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [commentLoading, setCommentLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

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
      
      // Make API call to add comment
      const response = await fetch('http://localhost:8085/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId: postId.toString(),
          comment: newComment
        })
      });

      if (!response.ok) {
        throw new Error('Failed to add comment');
      }

      const addedComment = await response.json();
      
      // Update local state with the new comment from the server
      setAllComments(prev => [...prev, addedComment]);
      setNewComment('');
      setSnackbarMessage('Comment added successfully!');
      setSnackbarOpen(true);
    } catch (err) {
      setError(err.message);
      setSnackbarMessage('Failed to add comment');
      setSnackbarOpen(true);
    } finally {
      setCommentLoading(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      // Make API call to delete comment
      const response = await fetch(`http://localhost:8085/api/comments/${commentId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete comment');
      }

      // Update local state
      setAllComments(prev => prev.filter(comment => comment.id !== commentId));
      setSnackbarMessage('Comment deleted successfully!');
      setSnackbarOpen(true);
    } catch (err) {
      setError(err.message);
      setSnackbarMessage('Failed to delete comment');
      setSnackbarOpen(true);
    }
  };

  const getCommentsForPost = (postId) => {
    return allComments.filter(comment => comment.postId === postId.toString());
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
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
      <Typography variant="h4" component="h1" gutterBottom sx={{ 
        fontWeight: 'bold', 
        mb: 3,
        color: 'primary.main',
        textAlign: 'center'
      }}>
        Community Feed
      </Typography>
      
      {posts.length === 0 ? (
        <Typography variant="body1" color="textSecondary" align="center">
          No posts available. Be the first to share your skills!
        </Typography>
      ) : (
        posts.map(post => (
          <Paper 
            key={post.id} 
            elevation={3} 
            sx={{ 
              mb: 3, 
              borderRadius: 2,
              overflow: 'hidden',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: 6
              }
            }}
          >
            {/* Post Header */}
            <Box display="flex" alignItems="center" p={2}>
              <Avatar sx={{ mr: 2, bgcolor: 'secondary.main' }}>
                {post.userName?.charAt(0) || 'U'}
              </Avatar>
              <Box flexGrow={1}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {post.userName || 'Anonymous User'}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {new Date(post.date || Date.now()).toLocaleDateString()}
                </Typography>
              </Box>
              <IconButton>
                <MoreVert />
              </IconButton>
            </Box>
            
            {/* Post Content */}
            <Box p={2} pt={0}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                {post.title}
              </Typography>
              <Typography variant="body1" paragraph>
                {post.description}
              </Typography>
              
              {/* Post Image */}
              <Box 
                borderRadius={1}
                mb={2}
                overflow="hidden"
                sx={{
                  height: '300px',
                  backgroundImage: `url(${POST_IMAGE_URL})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  position: 'relative',
                  '&:before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    backgroundColor: 'rgba(0,0,0,0.1)'
                  }
                }}
              >
                <Typography 
                  variant="caption" 
                  color="white" 
                  sx={{ 
                    position: 'relative',
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 1,
                    mb: 1
                  }}
                >
                  Skill Sharing Community
                </Typography>
              </Box>
            </Box>
            
            {/* Post Actions */}
            <Box px={2}>
              <Divider />
              <Box display="flex" justifyContent="space-between" py={1}>
                <IconButton aria-label="like" color="error">
                  <Favorite />
                  <Typography variant="body2" sx={{ ml: 1 }}>24</Typography>
                </IconButton>
                <IconButton 
                  aria-label="comment"
                  onClick={() => handleCommentClick(post.id)}
                  color="primary"
                >
                  <Comment />
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    {getCommentsForPost(post.id).length}
                  </Typography>
                </IconButton>
                <IconButton aria-label="share" color="primary">
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
              PaperProps={{ sx: { borderRadius: 3 } }}
            >
              <DialogTitle sx={{ 
                bgcolor: 'primary.main', 
                color: 'white',
                fontWeight: 'bold'
              }}>
                Comments ({getCommentsForPost(post.id).length})
              </DialogTitle>
              <DialogContent sx={{ pt: 3 }}>
                <List>
                  {getCommentsForPost(post.id).map(comment => (
                    <ListItem key={comment.id}>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'secondary.main' }}>U</Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={comment.comment}
                        secondary={`${comment.userName || 'User'} • ${new Date().toLocaleString()}`}
                      />
                      <ListItemSecondaryAction>
                        <IconButton 
                          edge="end" 
                          aria-label="delete"
                          onClick={() => handleDeleteComment(comment.id)}
                          color="error"
                        >
                          <Delete />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
                <Box display="flex" alignItems="center" mt={2} mb={1}>
                <TextField
  fullWidth
  variant="outlined"
  size="small"
  placeholder="Add a comment..."
  value={newComment}
  onChange={(e) => setNewComment(e.target.value)}
  disabled={commentLoading}
  sx={{ mr: 1 }}
/>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleAddComment(post.id)}
                    disabled={!newComment.trim() || commentLoading}
                    startIcon={commentLoading ? <CircularProgress size={20} /> : <Send />}
                    sx={{ borderRadius: 2 }}
                  >
                    Post
                  </Button>
                </Box>
              </DialogContent>
              <DialogActions>
                <Button 
                  onClick={handleCloseComments}
                  sx={{ borderRadius: 2 }}
                >
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          </Paper>
        ))
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={error ? 'error' : 'success'}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default PostList;
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