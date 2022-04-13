import React, { useState, useRef } from "react";

export default function Contact(props) {
  const inputEl = useRef();
  const [displaySendPrivateMessageBox, setDisplaySendPrivateMessageBox] = useState("hidden");
  function handleClick() {
    if (displaySendPrivateMessageBox === "hidden") setDisplaySendPrivateMessageBox("visible");
    else setDisplaySendPrivateMessageBox("hidden");
  }

  function handleSend() {
    const message = inputEl.current.value;
    const myId = props.connection.current.id;
    const targetId = props.id;
    const myName = props.name;
    inputEl.current.value = "";
    if (myId !== targetId)
      props.connection.current.emit("privateMessage", {
        fromName: myName,
        fromId: myId,
        to: targetId,
        message,
      });
  }

  if (props.active) {
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
          <div style={{ visibility: displaySendPrivateMessageBox }}>
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
        <div style={{ visibility: displaySendPrivateMessageBox }}>
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
