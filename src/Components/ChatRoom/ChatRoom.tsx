import React, {useEffect, useRef} from 'react';
import {
  Avatar,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography
} from '@mui/material';
import styles from './ChatRoom.module.css';
import {MessageType, SignedUserType} from "../../types/common";

interface IProps {
  messages: MessageType[];
  signedUser: SignedUserType;
}

const ChatRoom: React.FC<IProps> = ({ messages, signedUser }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const messageComponent = (message: MessageType) => {

    return (
      <Grid
        container
        direction="column"
        justifyContent={message.senderId === signedUser.id ? "flex-end" : "flex-start"}
        alignItems={message.senderId === signedUser.id ? "flex-end" : "flex-start"}
      >
        <Grid item xs={12}>
          <ListItemIcon>
            <Avatar alt="Remy Sharp" />
          </ListItemIcon>
          <ListItemText primary={message.sender}></ListItemText>
          <ListItemText primary={message.message}></ListItemText>
        </Grid>
        <Grid item xs={12}>
          <ListItemText secondary={message.timestamp}></ListItemText>
        </Grid>
      </Grid>
    )
  }

  return (
    <div>
      <Grid container>
        <Grid item xs={12} >
          <Typography variant="h5" align="center">Local Group Chat</Typography>
        </Grid>
      </Grid>
      <Divider />

      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="baseline"
      >
        <List className={styles.messageList}>
          {messages.map((message, index) => (
            <ListItem key={index}>
              {messageComponent(message)}
            </ListItem>
          ))}
          <div ref={messagesEndRef}/>

        </List>
      </Grid>
    </div>
  );
};

export default ChatRoom;