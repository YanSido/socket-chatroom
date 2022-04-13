import React, { useRef } from "react";

export default function MessageInput(props) {
  // message box
  const inputEl = useRef(); // message box input refference
  function handleSend() {
    const message = inputEl.current.value;
    const name = props.username;
    const id = props.id;
    props.connection.current.emit("message", { id, username: name, message }); // send message to server
    inputEl.current.value = "";
  }
  function handleChange() {
    const id = props.id;
    const name = props.username;
    props.connection.current.emit("typing", { id, username: name }); // send current typing user to server
  }
  return (
    <div>
      <div class="chat-message clearfix">
        <div class="input-group mb-0">
          <div class="input-group-prepend">
            <span class="input-group-text">
              <i
                onClick={() => {
                  handleSend();
                }}
                class="fa fa-send"
                id="send-button"
              ></i>
            </span>
          </div>
          <input
            ref={inputEl}
            onChange={() => {
              handleChange();
            }}
            onKeyUp={(e) => {
              if (e.key === "Enter" && !e.shiftKey) handleSend();
            }}
            type="text"
            class="form-control"
            placeholder="Enter text here..."
          />
        </div>
      </div>
    </div>
  );
}
