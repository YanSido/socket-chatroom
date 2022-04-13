import React from "react";
import Message from "./Message";

export default function ChatHistory(props) {
  return (
    <div>
      <div class="chat-history">
        <ul class="m-b-0">
          {props.messages.map((message, index) => {
            if (message.id === props.id) {
              // if message is from me
              if (message.private)
                // if message is private from me
                return (
                  <Message
                    message={message.message}
                    username={message.username}
                    private={true}
                    admin={true}
                  />
                );

              return <Message message={message.message} username={message.username} admin={true} />; // if message is from me for all users
            } else {
              // if message is from other users
              if (message.private && message.toId === props.id)
                // if message is private to me
                return (
                  <Message private={true} message={message.message} username={message.fromName} />
                );
              else if (!message.private)
                // if message is not from me and not private for all users
                return <Message message={message.message} username={message.username} />;
            }
          })}
        </ul>
      </div>
    </div>
  );
}
