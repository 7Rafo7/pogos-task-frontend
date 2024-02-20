import React, { useState } from 'react';
import {Fab, Grid, TextField} from "@mui/material";
import {Send} from "@mui/icons-material";

interface IProps {
  sendMessage: (message: string) => void;
}

const ChatInput: React.FC<IProps> = ({ sendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() !== '') {
      sendMessage(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <Grid item xs={11}>
          <TextField id="outlined-basic-email" label="Type Something" fullWidth value={message} onChange={(e) => setMessage(e.target.value)} />
        </Grid>
        <Grid item xs={1}>
          <Fab type="submit" size="small" color="primary" aria-label="add"><Send /></Fab>
        </Grid>
      </Grid>
    </form>

  );
};

export default ChatInput;