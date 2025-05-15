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
  Alert,
  Chip,
  Menu,
  MenuItem
} from '@mui/material';
import { 
  ThumbUp, 
  ChatBubbleOutline, 
  Share, 
  MoreVert, 
  Send, 
  Delete, 
  Bookmark, 
  ThumbUpAltOutlined,
  EmojiEmotions,
  InsertPhoto,
  Flag
} from '@mui/icons-material';

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
  const [anchorEl, setAnchorEl] = useState(null);
  const [likedPosts, setLikedPosts] = useState([]);
  const [commentAnchorEl, setCommentAnchorEl] = useState(null);
  const [activeComment, setActiveComment] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch posts
        const postsResponse = await fetch('http://localhost:8085/api/post',{
          headers: {
            'Authorization': `Bearer ${token}`,   // Add the JWT token here
            'Content-Type': 'application/json'
          }
        });
        if (!postsResponse.ok) throw new Error('Failed to fetch posts');
        const postsData = await postsResponse.json();
        setPosts(postsData);

        // Fetch all comments
        const commentsResponse = await fetch('http://localhost:8085/api/comments',{
          headers: {
            'Authorization': `Bearer ${token}`,   // Add the JWT token here
            'Content-Type': 'application/json'
          }
        });
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

  const handleMenuOpen = (event, postId) => {
    setAnchorEl(event.currentTarget);
    setActiveComment(postId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setActiveComment(null);
  };

  const handleCommentMenuOpen = (event, commentId) => {
    setCommentAnchorEl(event.currentTarget);
    setActiveComment(commentId);
  };

  const handleCommentMenuClose = () => {
    setCommentAnchorEl(null);
    setActiveComment(null);
  };

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
      
      const response = await fetch('http://localhost:8085/api/comments', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId: postId.toString(),
          comment: newComment
        })
      });

      if (!response.ok) throw new Error('Failed to add comment');

      const addedComment = await response.json();
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
      const response = await fetch(`http://localhost:8085/api/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,   // Add the JWT token here
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) throw new Error('Failed to delete comment');

      setAllComments(prev => prev.filter(comment => comment.id !== commentId));
      setSnackbarMessage('Comment deleted successfully!');
      setSnackbarOpen(true);
    } catch (err) {
      setError(err.message);
      setSnackbarMessage('Failed to delete comment');
      setSnackbarOpen(true);
    }
  };

  const handleLikePost = (postId) => {
    if (likedPosts.includes(postId)) {
      setLikedPosts(likedPosts.filter(id => id !== postId));
    } else {
      setLikedPosts([...likedPosts, postId]);
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
    <Container maxWidth="md" sx={{ py: 2 }}>
      {/* Create Post Card (Facebook-style) */}
      <Paper elevation={0} sx={{ 
        mb: 3, 
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        p: 2
      }}>
        <Box display="flex" alignItems="center" mb={2}>
          <Avatar sx={{ mr: 2 }}>U</Avatar>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            placeholder="What's on your mind?"
            InputProps={{
              sx: {
                borderRadius: 6,
                backgroundColor: 'background.default',
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: 'action.hover'
                }
              }
            }}
          />
        </Box>
        <Divider sx={{ my: 1 }} />
        <Box display="flex" justifyContent="space-between">
          <Button startIcon={<InsertPhoto color="primary" />} sx={{ borderRadius: 6 }}>
            Photo
          </Button>
          <Button startIcon={<EmojiEmotions color="secondary" />} sx={{ borderRadius: 6 }}>
            Feeling
          </Button>
        </Box>
      </Paper>

      {posts.length === 0 ? (
        <Typography variant="body1" color="textSecondary" align="center">
          No posts available. Be the first to share!
        </Typography>
      ) : (
        posts.map(post => (
          <Paper 
            key={post.id} 
            elevation={0}
            sx={{ 
              mb: 3, 
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider',
              overflow: 'hidden'
            }}
          >
            {/* Post Header */}
            <Box display="flex" alignItems="center" p={2} pb={1}>
              <Avatar sx={{ mr: 2, width: 40, height: 40 }}>
                {post.userName?.charAt(0) || 'U'}
              </Avatar>
              <Box flexGrow={1}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {post.userName || 'Anonymous User'}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {new Date(post.date || Date.now()).toLocaleDateString()} • 
                  <Box component="span" sx={{ ml: 0.5 }}>
                    <Chip 
                      label="Public" 
                      size="small" 
                      sx={{ 
                        height: 18, 
                        fontSize: '0.65rem',
                        '& .MuiChip-label': { px: 0.5 }
                      }} 
                    />
                  </Box>
                </Typography>
              </Box>
              <IconButton onClick={(e) => handleMenuOpen(e, post.id)}>
                <MoreVert />
              </IconButton>
              
              {/* Post Options Menu */}
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl) && activeComment === post.id}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleMenuClose}>
                  <Bookmark sx={{ mr: 1 }} /> Save post
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                  <Flag sx={{ mr: 1 }} /> Report post
                </MenuItem>
              </Menu>
            </Box>
            
            {/* Post Content */}
            <Box p={2} pt={0}>
              <Typography variant="body1" paragraph>
                {post.description}
              </Typography>
              
              {/* Post Image */}
              <Box 
                borderRadius={1}
                mb={2}
                overflow="hidden"
                sx={{
                  height: '400px',
                  backgroundImage: `url(${POST_IMAGE_URL})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  cursor: 'pointer'
                }}
              />
              
              {/* Like/Comment Count */}
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Box display="flex" alignItems="center">
                  <ThumbUp color="primary" sx={{ fontSize: 16 }} />
                  <Typography variant="body2" color="textSecondary" sx={{ ml: 0.5 }}>
                    24
                  </Typography>
                </Box>
                <Typography variant="body2" color="textSecondary">
                  {getCommentsForPost(post.id).length} comments
                </Typography>
              </Box>
            </Box>
            
            {/* Post Actions */}
            <Divider />
            <Box display="flex" justifyContent="space-between" px={2}>
              <Button 
                fullWidth 
                startIcon={
                  likedPosts.includes(post.id) ? (
                    <ThumbUp color="primary" />
                  ) : (
                    <ThumbUpAltOutlined />
                  )
                }
                sx={{ 
                  borderRadius: 0, 
                  py: 1,
                  color: likedPosts.includes(post.id) ? 'primary.main' : 'inherit'
                }}
                onClick={() => handleLikePost(post.id)}
              >
                Like
              </Button>
              <Button 
                fullWidth 
                startIcon={<ChatBubbleOutline />} 
                sx={{ borderRadius: 0, py: 1 }}
                onClick={() => handleCommentClick(post.id)}
              >
                Comment
              </Button>
              <Button 
                fullWidth 
                startIcon={<Share />} 
                sx={{ borderRadius: 0, py: 1 }}
              >
                Share
              </Button>
            </Box>
            <Divider />

            {/* Comments Section */}
            {getCommentsForPost(post.id).length > 0 && (
              <Box p={2}>
                {getCommentsForPost(post.id).slice(0, 2).map(comment => (
                  <Box key={comment.id} display="flex" mb={1}>
                    <Avatar sx={{ width: 32, height: 32, mr: 1 }}>U</Avatar>
                    <Box 
                      sx={{ 
                        backgroundColor: 'background.default',
                        borderRadius: 2,
                        p: 1.5,
                        flexGrow: 1
                      }}
                    >
                      <Typography variant="subtitle2" fontWeight="bold">
                        {comment.userName || 'User'}
                      </Typography>
                      <Typography variant="body2">
                        {comment.comment}
                      </Typography>
                    </Box>
                    <IconButton 
                      size="small" 
                      onClick={(e) => handleCommentMenuOpen(e, comment.id)}
                    >
                      <MoreVert fontSize="small" />
                    </IconButton>
                  </Box>
                ))}
                {getCommentsForPost(post.id).length > 2 && (
                  <Typography 
                    variant="body2" 
                    color="textSecondary" 
                    sx={{ 
                      ml: 6, 
                      cursor: 'pointer',
                      '&:hover': { textDecoration: 'underline' }
                    }}
                    onClick={() => handleCommentClick(post.id)}
                  >
                    View more comments
                  </Typography>
                )}
              </Box>
            )}

            {/* Add Comment */}
            <Box display="flex" p={2} pt={0}>
              <Avatar sx={{ width: 32, height: 32, mr: 1 }}>U</Avatar>
              <Box flexGrow={1} position="relative">
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  placeholder="Write a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  InputProps={{
                    sx: {
                      borderRadius: 6,
                      backgroundColor: 'background.default',
                      pr: 6
                    }
                  }}
                />
                <IconButton
                  size="small"
                  sx={{ 
                    position: 'absolute', 
                    right: 8, 
                    top: '50%', 
                    transform: 'translateY(-50%)' 
                  }}
                  onClick={() => handleAddComment(post.id)}
                  disabled={!newComment.trim()}
                >
                  <Send color={newComment.trim() ? 'primary' : 'disabled'} />
                </IconButton>
              </Box>
            </Box>

            {/* Comments Dialog */}
            <Dialog 
              open={openComments === post.id} 
              onClose={handleCloseComments}
              fullWidth
              maxWidth="sm"
              PaperProps={{ sx: { borderRadius: 2 } }}
            >
              <DialogTitle sx={{ fontWeight: 'bold' }}>
                Comments
              </DialogTitle>
              <DialogContent sx={{ p: 0 }}>
                <List>
                  {getCommentsForPost(post.id).map(comment => (
                    <ListItem key={comment.id} sx={{ alignItems: 'flex-start' }}>
                      <ListItemAvatar>
                        <Avatar>U</Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <>
                            <Typography variant="subtitle2" fontWeight="bold">
                              {comment.userName || 'User'}
                            </Typography>
                            <Typography variant="body2">
                              {comment.comment}
                            </Typography>
                          </>
                        }
                        secondary={
                          <Typography variant="caption" color="textSecondary">
                            {new Date().toLocaleString()}
                          </Typography>
                        }
                        sx={{ my: 0 }}
                      />
                      <ListItemSecondaryAction>
                        <IconButton 
                          size="small"
                          onClick={(e) => handleCommentMenuOpen(e, comment.id)}
                        >
                          <MoreVert fontSize="small" />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </DialogContent>
              <Box p={2}>
                <Box display="flex">
                  <Avatar sx={{ width: 32, height: 32, mr: 1 }}>U</Avatar>
                  <Box flexGrow={1} position="relative">
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      placeholder="Write a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      InputProps={{
                        sx: {
                          borderRadius: 6,
                          backgroundColor: 'background.default',
                          pr: 6
                        }
                      }}
                    />
                    <IconButton
                      size="small"
                      sx={{ 
                        position: 'absolute', 
                        right: 8, 
                        top: '50%', 
                        transform: 'translateY(-50%)' 
                      }}
                      onClick={() => handleAddComment(post.id)}
                      disabled={!newComment.trim() || commentLoading}
                    >
                      {commentLoading ? (
                        <CircularProgress size={20} />
                      ) : (
                        <Send color={newComment.trim() ? 'primary' : 'disabled'} />
                      )}
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            </Dialog>

            {/* Comment Options Menu */}
            <Menu
              anchorEl={commentAnchorEl}
              open={Boolean(commentAnchorEl)}
              onClose={handleCommentMenuClose}
            >
              <MenuItem onClick={() => {
                handleDeleteComment(activeComment);
                handleCommentMenuClose();
              }}>
                <Delete sx={{ mr: 1 }} /> Delete
              </MenuItem>
              <MenuItem onClick={handleCommentMenuClose}>
                <Flag sx={{ mr: 1 }} /> Report
              </MenuItem>
            </Menu>
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