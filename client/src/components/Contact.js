import React from "react";

export default function Contact(props) {
  if (props.active) {
    return (
      <div>
        <li class={`clearfix active mb-2`}>
          <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="avatar" />
          <div class="about">
            <div class="name">{props.name}</div>
            <div class="status">
              {" "}
              <i class="fa fa-circle online"></i> online{" "}
            </div>
          </div>
        </li>
      </div>
    );
  }
  return (
    <div>
      <li class={`clearfix mb-3`}>
        <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="avatar" />
        <div class="about">
          <div class="name">{props.name}</div>
          <div class="status">
            {" "}
            <i class="fa fa-circle offline"></i> {`last seen at ${props.lastseen}`}{" "}
          </div>
        </div>
      </li>
    </div>
  );
}
