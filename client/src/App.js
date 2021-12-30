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
  const [users, setUsers] = useState([]);
  const [typingUser, setTypingUser] = useState("");
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
        setMessages(history);
      });
      socketRef.current.on("messageBack", (history) => {
        setMessages(history);
      });
      socketRef.current.on("usersUpdate", (users) => {
        setUsers(users);
      });
      socketRef.current.on("typingBack", (user) => {
        setTypingUser(user.name);
      });
    } catch {}
  }, []);

  return (
    <div class="container">
      <div class="row clearfix">
        <div class="col-lg-12">
          <div class="card chat-app">
            <div id="plist" class="people-list mb-3">
              <Contacts users={users} />
            </div>
            <div class="chat">
              <div class="chat-header clearfix">
                <div class="row">
                  <GroupHeader typingUser={typingUser} id={id} />
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
