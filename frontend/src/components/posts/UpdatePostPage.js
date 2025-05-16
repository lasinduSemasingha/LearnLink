import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  CircularProgress,
  Alert,
  Avatar,
  IconButton,
  Divider,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CancelIcon from '@mui/icons-material/Cancel';
import ImageIcon from '@mui/icons-material/Image';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import PublicIcon from '@mui/icons-material/Public';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: '12px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  marginTop: theme.spacing(3),
}));

const UpdatePostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [post, setPost] = useState({
    title: '',
    description: '',
    image: null,
    imagePreview: null
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [privacyDialogOpen, setPrivacyDialogOpen] = useState(false);
  const [privacy, setPrivacy] = useState('Public');
  const [currentUser, setCurrentUser] = useState({
    name: 'John Doe',
    avatar: '/static/images/avatar/1.jpg'
  });

  // Fetch the current post data
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:8085/api/post/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch post');
        }
        const data = await response.json();
        setPost({
          title: data.title,
          description: data.description,
          image: null,
          imagePreview: data.imageUrl || null
        });
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPost(prev => ({
          ...prev,
          image: file,
          imagePreview: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setPost(prev => ({
      ...prev,
      image: null,
      imagePreview: null
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('title', post.title);
      formData.append('description', post.description);
      if (post.image) {
        formData.append('image', post.image);
      }

      const response = await fetch(`http://localhost:8085/api/post/${id}`, {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to update post');
      }

      setSuccess(true);
      setTimeout(() => {
        navigate(`/post/${id}`); // Redirect to post detail after success
      }, 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading && !post.title) {
    return (
      <Container maxWidth="md">
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 3 }}>
      <Typography variant="h5" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
        Update Post
      </Typography>

      <StyledPaper elevation={0}>
        <Box display="flex" alignItems="center" mb={2}>
          <Avatar src={currentUser.avatar} sx={{ width: 40, height: 40 }} />
          <Box ml={2}>
            <Typography variant="subtitle2" fontWeight="bold">
              {currentUser.name}
            </Typography>
            <Button
              size="small"
              startIcon={<PublicIcon />}
              endIcon={<ArrowDropDownIcon />}
              sx={{ textTransform: 'none', color: 'text.secondary' }}
              onClick={() => setPrivacyDialogOpen(true)}
            >
              {privacy}
            </Button>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            placeholder="What skill are you sharing?"
            name="title"
            value={post.title}
            onChange={handleChange}
            margin="normal"
            required
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                '& fieldset': {
                  border: 'none',
                },
              },
              '& .MuiInputBase-input': {
                fontSize: '1.25rem',
              },
            }}
          />

          <TextField
            fullWidth
            placeholder="Describe your skill in detail..."
            name="description"
            value={post.description}
            onChange={handleChange}
            margin="normal"
            required
            variant="outlined"
            multiline
            rows={4}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                '& fieldset': {
                  border: 'none',
                },
              },
            }}
          />

          {post.imagePreview && (
            <Box position="relative" mt={2} mb={2}>
              <Box
                component="img"
                src={post.imagePreview}
                alt="Preview"
                sx={{
                  width: '100%',
                  maxHeight: '400px',
                  objectFit: 'contain',
                  borderRadius: '8px',
                }}
              />
              <IconButton
                onClick={removeImage}
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'rgba(0,0,0,0.7)',
                  },
                }}
              >
                <CancelIcon />
              </IconButton>
            </Box>
          )}

          <Paper
            elevation={0}
            sx={{
              p: 2,
              mt: 2,
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: '8px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Add to your post
            </Typography>
            <Box>
              <IconButton
                color="primary"
                onClick={() => fileInputRef.current.click()}
              >
                <AddPhotoAlternateIcon />
              </IconButton>
              <IconButton color="secondary">
                <EmojiEmotionsIcon />
              </IconButton>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                style={{ display: 'none' }}
              />
            </Box>
          </Paper>

          <Box mt={3}>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              disabled={submitting}
              sx={{
                py: 1.5,
                borderRadius: '8px',
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 'bold',
              }}
            >
              {submitting ? <CircularProgress size={24} color="inherit" /> : 'Update'}
            </Button>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ mt: 2 }}>
              Post updated successfully! Redirecting...
            </Alert>
          )}
        </Box>
      </StyledPaper>

      {/* Privacy Dialog */}
      <Dialog
        open={privacyDialogOpen}
        onClose={() => setPrivacyDialogOpen(false)}
      >
        <DialogTitle>Select Privacy</DialogTitle>
        <DialogContent>
          <Box>
            <Chip
              icon={<PublicIcon />}
              label="Public"
              onClick={() => setPrivacy('Public')}
              color={privacy === 'Public' ? 'primary' : 'default'}
              sx={{ m: 1 }}
            />
            <Chip
              icon={<ImageIcon />}
              label="Friends"
              onClick={() => setPrivacy('Friends')}
              color={privacy === 'Friends' ? 'primary' : 'default'}
              sx={{ m: 1 }}
            />
            <Chip
              icon={<ImageIcon />}
              label="Only Me"
              onClick={() => setPrivacy('Only Me')}
              color={privacy === 'Only Me' ? 'primary' : 'default'}
              sx={{ m: 1 }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPrivacyDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default UpdatePostPage;