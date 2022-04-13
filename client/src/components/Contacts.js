import React, { useState } from "react";
import Contact from "./Contact";

export default function Contacts(props) {
  const [filter, setFilter] = useState("");
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
              if (user.id === props.connection.current.id)
                return (
                  <Contact
                    connection={props.connection}
                    name={`${user.name} (ME)`}
                    active="active"
                  />
                );
              return <Contact connection={props.connection} name={user.name} active="active" />;
            } else
              return (
                <Contact connection={props.connection} name={user.name} lastseen={user.lastseen} />
              );
          })}
      </ul>
    </div>
  );
}
