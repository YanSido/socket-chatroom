import React from "react";
import Contact from "./Contact";

export default function Contacts(props) {
  return (
    <div>
      <div class="input-group">
        <div class="input-group-prepend"></div>
        <input type="text" class="form-control" placeholder="Search..." />
      </div>
      <ul class="list-unstyled chat-list mt-2">
        {props.users.map((user, index) => {
          if (user.status === "online") return <Contact name={user.name} active="active" />;
          return <Contact name={user.name} lastseen={user.lastseen} />;
        })}
      </ul>
    </div>
  );
}
