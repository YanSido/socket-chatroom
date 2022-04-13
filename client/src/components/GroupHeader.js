import React from "react";

export default function GroupHeader(props) {
  if (props.id !== props.typingUserId) {
    // if the typing user is not me
    return (
      <div>
        <div class="chat-header clearfix">
          <div class="row">
            <div class="col-lg-6">
              <div class="chat-about">
                <h6 class="m-b-0">Students</h6>
                {props.typingUserId ? <small>{props.typingUserName} is typing ...</small> : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    // if the typing user is me
    <div>
      <div class="chat-header clearfix">
        <div class="row">
          <div class="col-lg-6">
            <div class="chat-about">
              <h6 class="m-b-0">Students</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
