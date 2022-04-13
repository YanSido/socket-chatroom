import React from "react";
import Message from "./Message";

export default function ChatHistory(props) {
  return (
    <div>
      <div class="chat-history">
        <ul class="m-b-0">
          {props.messages.map((message, index) => {
            if (message.id === props.id)
              return <Message message={message.message} name={message.username} admin={true} />;
            else {
              if (message.private)
                return <Message private={true} message={message.message} name={message.username} />;
              return <Message message={message.message} name={message.username} />;
            }
          })}
        </ul>
      </div>
    </div>
  );
}
