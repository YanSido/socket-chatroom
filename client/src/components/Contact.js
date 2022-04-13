import React, { useState, useRef } from "react";

export default function Contact(props) {
  const inputEl = useRef(); // message box refference
  const [displaySendPrivateMessageBox, setDisplaySendPrivateMessageBox] = useState("hidden"); // private message box is hidden by default

  function handleClick() {
    // when user clicks on the contact
    if (displaySendPrivateMessageBox === "hidden") setDisplaySendPrivateMessageBox("visible");
    else setDisplaySendPrivateMessageBox("hidden");
  }

  function handleSend() {
    // send private message
    const message = inputEl.current.value;
    const myId = props.connection.current.id;
    const targetId = props.id;
    const targetName = props.name;
    inputEl.current.value = "";
    if (myId !== targetId)
      // if not sending to myself
      props.connection.current.emit("privateMessage", {
        username: targetName,
        id: myId,
        toId: targetId,
        message,
      });
  }

  if (props.active) {
    // if user is online
    return (
      <div>
        <li
          class={`clearfix active mb-2`}
          onClick={(e) => {
            if (e.target.id !== "message-input") handleClick();
          }}
        >
          <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="avatar" />
          <div class="about">
            <div class="name">{props.name}</div>
            <div class="status">
              {" "}
              <i class="fa fa-circle online"></i> online{" "}
            </div>
          </div>
          <div id="private-message-box" style={{ visibility: displaySendPrivateMessageBox }}>
            <input ref={inputEl} id="message-input" placeholder="Enter private message" />
            <button
              onClick={() => {
                handleSend();
              }}
            >
              Send
            </button>
            <button>Cancel</button>
          </div>
        </li>
      </div>
    );
  }
  return (
    // if user is offline
    <div>
      <li
        class={`clearfix mb-3`}
        onClick={(e) => {
          if (e.target.id !== "message-input") handleClick();
        }}
      >
        <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="avatar" />
        <div class="about">
          <div class="name">{props.name}</div>
          <div class="status">
            {" "}
            <i class="fa fa-circle offline"></i> {`last seen at ${props.lastseen}`}{" "}
          </div>
        </div>
        <div id="private-message-box" style={{ visibility: displaySendPrivateMessageBox }}>
          <input ref={inputEl} id="message-input" placeholder="Enter private message" />
          <button
            onClick={() => {
              handleSend();
            }}
          >
            Send
          </button>
          <button>Cancel</button>
        </div>
      </li>
    </div>
  );
}
