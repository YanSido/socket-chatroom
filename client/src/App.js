import { useEffect, useRef, useState } from "react";
import { nanoid } from "nanoid";
import io from "socket.io-client";
import ChatHistory from "./components/ChatHistory";
import Contacts from "./components/Contacts";
import GroupHeader from "./components/GroupHeader";
import MessageInput from "./components/MessageInput";
const URL = "http://localhost:3000";

function App() {
  const [messages, setMessages] = useState([]);
  const [id, setId] = useState("");
  const socketRef = useRef();

  useEffect(() => {
    try {
      socketRef.current = io.connect(URL);
      socketRef.current.on("connect", () => {
        setId(socketRef.current.id);
        socketRef.current.emit("setup");
        console.log("Connected to Server");
      });
      socketRef.current.on("setup", (history) => {
        console.log("23", history);
        setMessages(history);
      });
      socketRef.current.on("messageBack", (history) => {
        setMessages(history);
      });
      socketRef.current.on("serverMessages", (data) => {
        alert(data.servermessage);
      });
    } catch {}
    // socketRef.current.on("messageBack", ({ name, message }) => {
    //   setChat((prevState) => {
    //     return [...prevState, { name, message }];
    //   });
  }, []);

  return (
    <div class="container">
      <div class="row clearfix">
        <div class="col-lg-12">
          <div class="card chat-app">
            <div id="plist" class="people-list">
              <Contacts />
            </div>
            <div class="chat">
              <div class="chat-header clearfix">
                <div class="row">
                  <GroupHeader />
                </div>
              </div>
              <ChatHistory id={id} messages={messages} />
              <MessageInput id={id} connection={socketRef} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
