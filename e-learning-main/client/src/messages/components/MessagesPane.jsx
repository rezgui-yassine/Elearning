import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/joy/Box";
import Sheet from "@mui/joy/Sheet";
import Stack from "@mui/joy/Stack";
import AvatarWithStatus from "./AvatarWithStatus";
import ChatBubble from "./ChatBubble";
import MessageInput from "./MessageInput";
import MessagesPaneHeader from "./MessagesPaneHeader";
import { ChatProps, MessageProps } from "./types";
import axios from "axios";
import { io } from "socket.io-client";


const MessagesPane = ({ messages, userId, update, setUpdate,
  categoryId }) => {
  const [chatMessages, setChatMessages] = useState([]);
  const [textAreaValue, setTextAreaValue] = useState("");
  const socket = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:8800", { transports: ['websocket'] });

    socket.current.emit("new-user-add", userId);

   

    socket.current.on("receive-message", (data) => {
      console.log(data,"received ")
      setChatMessages(data)
      // setMessages(data)
      // setNewMessages(data)
      // setReceivedMessage(data)
    });

    return () => {
      socket.current.disconnect();
    };
  }, [userId]);

  const addMessage = async (body) => {
    try {
      const rep = await axios.post(
        "http://localhost:3000/api/messages/crateMessage",
        body
      );
      setUpdate(!update);
      console.log(rep.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setChatMessages(messages);
  }, [messages.length]);

  return (
    <Sheet
      sx={{
        height: { xs: "calc(100dvh - var(--Header-height))", lg: "100dvh" },
        display: "flex",
        flexDirection: "column",
        backgroundColor: "background.level1",
      }}
    >
      {/* <MessagesPaneHeader sender={chat.sender} /> */}
      <Box
        sx={{
          display: "flex",
          flex: 1,
          minHeight: 0,
          px: 2,
          py: 3,
          overflowY: "scroll",
          flexDirection: "column-reverse",
        }}
      >
        <Stack spacing={2} justifyContent="flex-end">
          {chatMessages?.map((message, index) => {
            const isYou = message.senderId._id === userId;
            return (
              <Stack
                key={index}
                direction="row"
                spacing={2}
                flexDirection={isYou ? "row-reverse" : "row"}
              >
                {!isYou && (
                  <AvatarWithStatus
                    online={true}
                    src={message?.senderId?.avatar}
                  />
                )}
                <ChatBubble
                  variant={isYou ? "sent" : "received"}
                  userId={userId}
                  {...message}
                />
              </Stack>
            );
          })}
        </Stack>
      </Box>
      <MessageInput
        textAreaValue={textAreaValue}
        setTextAreaValue={setTextAreaValue}
        onSubmit={() => {
          // setChatMessages([
          //   ...chatMessages,
          //   {
          //     senderId: userId,
          //     text: textAreaValue,
          //     createdAt : new Date(),
          //   },
          // ]);
          addMessage({
            senderId: userId,
            text: textAreaValue,
            createdAt: new Date(),

            categoryId: categoryId,
          });
          socket.current.emit("send-message", chatMessages);
        }}
      />
    </Sheet>
  );
};

export default MessagesPane;
