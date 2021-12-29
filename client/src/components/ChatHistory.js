import React from "react";

export default function ChatHistory() {
  return (
    <div>
      <div class="chat-history">
        <ul class="m-b-0">
          <li class="clearfix">
            <div class="message-data text-right">
              <span class="message-data-time">10:10 AM, Today</span>
              <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="avatar" />
            </div>
            <div class="message other-message float-right">
              {" "}
              Hi Aiden, how are you? How is the project coming along?{" "}
            </div>
          </li>

          <li class="clearfix">
            <div class="message-data">
              <span class="message-data-time">10:15 AM, Today</span>
            </div>
            <div class="message my-message">
              Project has been already finished and I have results to show you.
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
