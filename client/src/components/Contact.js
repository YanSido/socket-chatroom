import React from "react";

export default function Contact(props) {
  return (
    <div>
      <li class={`clearfix ${props.active}`}>
        <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="avatar" />
        <div class="about">
          <div class="name">Aiden Chavez</div>
          <div class="status">
            {" "}
            <i class="fa fa-circle online"></i> online{" "}
          </div>
        </div>
      </li>
    </div>
  );
}
