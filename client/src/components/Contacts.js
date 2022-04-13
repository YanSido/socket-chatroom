import React, { useState } from "react";
import Contact from "./Contact";

export default function Contacts(props) {
  const [filter, setFilter] = useState(""); // filter contacts by name
  const handleChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div>
      <div class="input-group">
        <div class="input-group-prepend"></div>
        <input
          onChange={(e) => {
            handleChange(e);
          }}
          type="text"
          class="form-control"
          placeholder="Search..."
        />
      </div>
      <ul class="list-unstyled chat-list mt-2">
        {props.users
          .filter((user) => {
            return user.name.toLowerCase().includes(filter.toLowerCase());
          })
          .map((user, index) => {
            if (user.status === "online") {
              // if user is online
              if (user.id === props.connection.current.id)
                // if contact is me
                return (
                  <Contact
                    connection={props.connection}
                    name={`${user.name} (ME)`}
                    active="active"
                    id={user.id}
                  />
                );
              return (
                // if contact is not me
                <Contact
                  connection={props.connection}
                  name={user.name}
                  id={user.id}
                  active="active"
                />
              );
            } // if user is offline
            else
              return (
                <Contact
                  connection={props.connection}
                  name={user.name}
                  id={user.id}
                  lastseen={user.lastseen}
                />
              );
          })}
      </ul>
    </div>
  );
}
