import { TextField, Button, Box } from '@mui/material';
import { useState } from 'react';

const AddComment = ({ onAdd }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(text);
    setText('');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        fullWidth
        label="Add a comment"
        value={text}
        onChange={(e) => setText(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button variant="contained" type="submit">Comment</Button>
    </Box>
  );
};

export default AddComment;
