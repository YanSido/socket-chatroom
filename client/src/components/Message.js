import React from "react";

export default function Message(props) {
  if (!props.member) {
    return (
      <li class="clearfix">
        <div class="message other-message float-right">
          {"SIDO: "}
          <br />
          Hi Aiden, how are you? How is the project coming along?
          <br />
          <hr />
          <div class="message-data">
            <span class="message-data-time">10:12</span>
          </div>
        </div>
      </li>
    );
  }
  return (
    <div>
      <li class="clearfix">
        <div class="message my-message">
          {"SIDO: "}
          <br />
          Are we meeting today?
          <br />
          <hr />
          <div class="message-data">
            <span class="message-data-time">10:12</span>
          </div>
        </div>
      </li>
    </div>
  );
}
