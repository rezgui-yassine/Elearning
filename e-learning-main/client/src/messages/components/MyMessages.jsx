import React, { useEffect, useRef, useState } from 'react';
import Sheet from '@mui/joy/Sheet';
import MessagesPane from './MessagesPane';
import ChatsPane from './ChatsPane'; // Corrected the capitalization
import axios from 'axios';
import { io } from "socket.io-client";

const MyProfile = ({categoryId}) => {
  const [userId, setUserId] = useState(null);
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [update,setUpdate]=useState(false);
  const socket = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:8800", { transports: ['websocket'] });

    socket.current.emit("new-user-add", userId);

   

    socket.current.on("receive-message", (data) => {
      console.log(data,"received ")
      // setMessages(data)
      // setNewMessages(data)
      // setReceivedMessage(data)
    });

    return () => {
      socket.current.disconnect();
    };
  }, [userId]);

  useEffect(() => {
    if (messages) {
      socket.current.emit("send-message", messages);
    }
  }, [messages]);



  const fetchUserInfo = async () => {
    try {
      const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
      if (!token) throw new Error('No token found');

      const response = await axios.get('http://localhost:3000/api/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const user = response.data;
      setUserId(user.user._id); // Corrected to user.user._id
      console.log(response.data, "this is the user info"); // Log the complete user info
    } catch (error) {
      console.error('Error fetching user info', error);
    }
  };

 
  const fetchMessages = async (categoryId) => {
    try {
      console.log(`Fetching messages for categoryId: ${categoryId}`);
      const response = await axios.get(`http://localhost:3000/api/messages/${categoryId}`);
      console.log(response.data, "raw messages data");

      if (response.data) {
        setMessages(response.data);
        console.log(response.data, "these are the messages");
      } else {
        console.log('No messages found for this category.');
      }
    } catch (error) {
      console.error('Error fetching messages', error);
    }
  };

  useEffect(() => {
      fetchMessages(categoryId);
  }, [categoryId,update]);

  useEffect(() => {
    fetchUserInfo();
  }, []);

 

  return (
    <Sheet
      sx={{
        flex: 1,
        width: '100%',
        mx: 'auto',
        pt: { xs: 'var(--Header-height)', sm: 0 },
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'minmax(min-content, min(30%, 400px)) 1fr',
        },
      }}
    >
      <Sheet
        sx={{
         
         
          transition: 'transform 0.4s, width 0.4s',
          zIndex: 100,
          width: '100%',
          top: 52,
        }}
      >
        {/* <ChatsPane
          chats={chats}
          selectedChatId={selectedChat?._id}
          setSelectedChat={setSelectedChat}
        /> */}
      </Sheet>
      <MessagesPane messages={messages} userId={userId} update={update} setUpdate={setUpdate} 
categoryId={
  categoryId}/>
    </Sheet>
  );
};

export default MyProfile;
