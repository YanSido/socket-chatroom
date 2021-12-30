import React, { useRef } from "react";

export default function MessageInput(props) {
  const inputEl = useRef();
  function handleSend() {
    const message = inputEl.current.value;
    const name = props.id;
    props.connection.current.emit("message", { name, message });
    inputEl.current.value = "";
  }
  function handleChange() {
    const name = props.id;
    props.connection.current.emit("typing", { name });
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
