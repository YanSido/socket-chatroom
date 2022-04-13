import React from "react";
import Message from "./Message";

export default function ChatHistory(props) {
  return (
    <div>
      <div class="chat-history">
        <ul class="m-b-0">
          {props.messages.map((message, index) => {
            if (message.id === props.id) {
              if (message.private)
                return (
                  <Message
                    message={message.message}
                    username={message.username}
                    private={true}
                    admin={true}
                  />
                );

              return <Message message={message.message} username={message.username} admin={true} />;
            } else {
              if (message.private && message.toId === props.id)
                return (
                  <Message private={true} message={message.message} username={message.fromName} />
                );
              else if (!message.private)
                return <Message message={message.message} username={message.username} />;
            }
          })}
        </ul>
      </div>
    </div>
  );
}
