import React from "react";

export default function MessageInput() {
  return (
    <div>
      <div class="chat-message clearfix">
        <div class="input-group mb-0">
          <div class="input-group-prepend">
            <span class="input-group-text">
              <i class="fa fa-send"></i>
            </span>
          </div>
          <input type="text" class="form-control" placeholder="Enter text here..." />
        </div>
      </div>
    </div>
  );
}
