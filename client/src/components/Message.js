import React from "react";

export default function Message(props) {
  if (props.admin) {
    return (
      <li class="clearfix">
        <div class="message other-message float-right">
          {`${props.name}: `}
          <br />
          {props.message}
          <br />
          <div class="message-data">
            <small class="message-data-time">10:12</small>
          </div>
        </div>
      </li>
    );
  }
  return (
    <div>
      <li class="clearfix">
        <div class="message my-message">
          {`${props.name}: `}
          <br />
          {props.message}
          <br />
          <div class="message-data">
            <small class="message-data-time">10:12</small>
          </div>
        </div>
      </li>
    </div>
  );
}
