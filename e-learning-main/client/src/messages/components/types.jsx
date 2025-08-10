import React from "react";

const UserProps = ({ name, username, avatar, online }) => {
  return (
    <div>
      <h2>Name: {name}</h2>
      <p>Username: {username}</p>
      <img src={avatar} alt="Avatar" />
      <p>Online: {online ? "Yes" : "No"}</p>
    </div>
  );
};

const MessageProps = ({
  id,
  content,
  timestamp,
  unread,
  sender,
  attachment,
}) => {
  return (
    <div>
      <p>ID: {id}</p>
      <p>Content: {content}</p>
      <p>Timestamp: {timestamp}</p>
      {unread && <p>Unread</p>}
      <p>Sender: {sender === "You" ? "You" : sender.name}</p>
      {attachment && (
        <div>
          <p>Attachment:</p>
          <p>FileName: {attachment.fileName}</p>
          <p>Type: {attachment.type}</p>
          <p>Size: {attachment.size}</p>
        </div>
      )}
    </div>
  );
};

const ChatProps = ({ id, sender, messages }) => {
  return (
    <div>
      <h2>Chat ID: {id}</h2>
      <h3>Sender:</h3>
      <UserProps {...sender} />
      <h3>Messages:</h3>
      {messages.map((message, index) => (
        <div key={index}>
          <MessageProps {...message} />
        </div>
      ))}
    </div>
  );
};

export { UserProps, MessageProps, ChatProps };
