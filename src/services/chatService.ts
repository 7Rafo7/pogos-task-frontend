import io from 'socket.io-client';
import {MessageType} from "../types/common";


const socket = io('http://localhost:5000', {
  withCredentials: true,
});

export const sendMessage = (senderId: string, sender: string, message: string) => {
  socket.emit('chatMessage', {senderId, sender, message });
};

export const getMessages = () => {
  return new Promise<MessageType[]>((resolve, reject) => {
    socket.emit('getMessages');
    socket.once('getMessages', (messages: MessageType[]) => {
      resolve(messages);
    });
  });
};

export const subscribeToMessages = (callback: (messages:MessageType[]) => void) => {
  socket.on('chatMessage', callback);
};