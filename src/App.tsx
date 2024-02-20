import React, { useState, useEffect } from 'react';
import {Button, Divider, Grid, TextField} from "@mui/material";
import { v4 as uuid4 } from 'uuid';
import { sendMessage, getMessages, subscribeToMessages } from './services/chatService';
import ChatInput from "./Components/ChatInput/ChatInput";
import ChatRoom from "./Components/ChatRoom/ChatRoom";
import { MessageType, SignedUserType } from "./types/common";


const App: React.FC = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [username, setUsername] = useState('');
  const [chatStarted, setChatStarted] = useState(false);
  const [signedUser, setSignedUser] = useState<SignedUserType>({
    id: '',
    username: ''
  })

  useEffect(() => {
    getMessages().then((data) => {
      setMessages(data)
    });

    subscribeToMessages((newMessages) => {
      setMessages(newMessages)
    });

    return () => {
      setUsername('');
      setChatStarted(false);
      setSignedUser({
        id: '',
        username: ''
      })
    };
  }, []);

  const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setUsername(event.target.value);
  };

  const handleStart = () => {
    setChatStarted(true);
    setSignedUser({
      id: uuid4(),
      username,
    })
  }

  const handleSendMessage = (message: string) => {
    sendMessage(signedUser.id, username, message);
  };

  return (
    <div className="app">
      {!chatStarted ?
        <Grid
          container
          direction="column"
          justifyContent="space-between"
          alignItems="center"
          spacing={3}
        >
          <Grid item xs={12}>
            <TextField id="standard-basic" label="Username" variant="standard" value={username} onChange={handleChange} />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" onClick={handleStart}>Enter</Button>
          </Grid>
        </Grid>
        :
        <Grid
          container
          direction="column"
          spacing={2}
        >
          <Grid item xs={12}>
            <ChatRoom messages={messages} signedUser={signedUser} />
          </Grid>
          <Divider />
          <Grid item xs={12}>
            <ChatInput sendMessage={handleSendMessage}/>
          </Grid>
        </Grid>
      }
    </div>
  );
};

export default App;