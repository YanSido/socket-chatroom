import React from "react";
import Contact from "./Contact";

export default function Contacts() {
  return (
    <div>
      <div class="input-group">
        <div class="input-group-prepend"></div>
        <input type="text" class="form-control" placeholder="Search..." />
      </div>
      <ul class="list-unstyled chat-list mt-2 mb-0">
        <Contact active="active" />
        <Contact />
      </ul>
    </div>
  );
}
