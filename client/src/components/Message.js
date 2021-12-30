import React from "react";

export default function Message(props) {
  function getTime() {
    let d = new Date();
    let minutes = d.getMinutes();
    let hours = d.getHours();
    if (Number(minutes) < 10) minutes = `0${String(minutes)}`;
    if (Number(hours) < 10) hours = `0${String(hours)}`;
    return `${hours}:${minutes}`;
  }
  if (props.admin) {
    return (
      <li class="clearfix">
        <div class="message other-message float-right">
          {`${props.name}: `}
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
    <div>
      <li class="clearfix">
        <div class="message my-message">
          {props.private ? `${props.name} TO YOU: ` : `${props.name}:`}
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
