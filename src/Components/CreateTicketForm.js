import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

const CreateTicketForm = ({ isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    // Validate and submit the form
    if (title && description) {
      onSubmit({ title, description });
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Create New Ticket</DialogTitle>
      <DialogContent>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ marginTop: '1rem' }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateTicketForm;
