import React from "react";
import Message from "./Message";

export default function ChatHistory(props) {
  return (
    <div>
      <div class="chat-history">
        <ul class="m-b-0">
          {console.log("9", props.messages)}
          {props.messages.map((message, index) => {
            console.log(message, props);
            if (message.name === props.id)
              return <Message message={message.message} name={message.name} admin={true} />;
            return <Message message={message.message} name={message.name} />;
          })}
        </ul>
      </div>
    </div>
  );
}
