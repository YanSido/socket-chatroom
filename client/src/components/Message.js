import React from "react";

export default function Message(props) {
  function getTime() {
    // current time
    let d = new Date();
    let minutes = d.getMinutes();
    let hours = d.getHours();
    if (Number(minutes) < 10) minutes = `0${String(minutes)}`;
    if (Number(hours) < 10) hours = `0${String(hours)}`;
    return `${hours}:${minutes}`;
  }
  if (props.admin) {
    // if message is from me
    return (
      <li class="clearfix">
        <div class="message other-message float-right">
          {props.private ? `TO ${props.username}: ` : `${props.username}:`}
          <br />
          {props.message}
          <br />
          <div class="message-data">
            <small class="message-data-time">{getTime()}</small>
          </div>
        </div>
      </li>
    );
  }
  return (
    // if message is from other users
    <div>
      <li class="clearfix">
        <div class="message my-message">
          {props.private ? `${props.username} TO YOU: ` : `${props.username}:`}
          <br />
          {props.message}
          <br />
          <div class="message-data">
            <small class="message-data-time">{getTime()}</small>
          </div>
        </div>
      </li>
    </div>
  );
}
