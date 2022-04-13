import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import ChatHistory from "./components/ChatHistory";
import Contacts from "./components/Contacts";
import GroupHeader from "./components/GroupHeader";
import MessageInput from "./components/MessageInput";
const URL = "/";

function App() {
  let { username } = useParams();
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [lastConnection, setLastConnection] = "";
  const [typingUser, setTypingUser] = useState("");
  const [id, setId] = useState("");
  const socketRef = useRef();

  useEffect(() => {
    try {
      socketRef.current = io.connect(URL, { query: `username=${username}` });
      socketRef.current.on("connect", () => {
        setId(username);
        socketRef.current.emit("setup", { username });
        socketRef.current.emit("lastConnection", username);
        console.log("Connected to Server");
      });
      socketRef.current.on("setup", (history) => {
        setMessages(history);
      });
      socketRef.current.on("messageBack", (history) => {
        setMessages(history);
      });
      socketRef.current.on("lastConnectionBack", (name) => {
        setLastConnection(name);
      });
      socketRef.current.on("usersUpdate", (users) => {
        setUsers(users);
      });
      socketRef.current.on("typingBack", (user) => {
        setTypingUser(user.name);
      });
      socketRef.current.on("privateMessageBack", (data) => {
        setMessages((prevState) => {
          return [...prevState, { name: data.from, message: data.message, private: true }];
        });
        console.log("41", messages);
      });
    } catch {}
  }, []);

  return (
    <div class="container">
      <div class="row clearfix">
        <div class="col-lg-12">
          <div class="card chat-app">
            <div id="plist" class="people-list mb-3">
              <Contacts connection={socketRef} users={users} />
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
