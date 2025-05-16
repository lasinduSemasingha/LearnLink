import { TextField, Button, Box } from '@mui/material';
import { useState } from 'react';

const CreatePost = ({ onCreate }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate({ title, content });
    setTitle('');
    setContent('');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 2 }}>
      <TextField
        fullWidth
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Content"
        multiline
        rows={4}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button variant="contained" type="submit">Post</Button>
    </Box>
  );
};

export default CreatePost;
