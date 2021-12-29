import React from "react";

export default function Message() {
  return (
    <div>
      <li class="clearfix">
        <div class="message-data">
          <span class="message-data-time">10:12 AM, Today</span>
        </div>
        <div class="message my-message">Are we meeting today?</div>
      </li>
    </div>
  );
}
