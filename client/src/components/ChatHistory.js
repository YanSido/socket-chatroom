import React from "react";
import Message from "./Message";

export default function ChatHistory() {
  return (
    <div>
      <div class="chat-history">
        <ul class="m-b-0">
          <Message />
          <Message member={true} />
        </ul>
      </div>
    </div>
  );
}
