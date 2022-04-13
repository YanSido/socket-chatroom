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
  const [typingUserId, setTypingUserId] = useState("");
  const [typingUserName, setTypingUserName] = useState("");
  const [id, setId] = useState("");
  const socketRef = useRef();

  useEffect(() => {
    try {
      socketRef.current = io.connect(URL, { query: `username=${username}` });
      socketRef.current.on("connect", () => {
        setId(socketRef.current.id);
        socketRef.current.emit("setup", { username });
        socketRef.current.emit("lastConnection", username);
        console.log("Connected to Server");
      });
      socketRef.current.on("setup", (history) => {
        setMessages(history);
      });
      socketRef.current.on("usersUpdate", (users) => {
        setUsers(users);
      });
      socketRef.current.on("typingBack", (user) => {
        setTypingUserId(user.id);
        setTypingUserName(user.username);
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
                  <GroupHeader
                    typingUserId={typingUserId}
                    typingUserName={typingUserName}
                    username={username}
                    id={id}
                  />
                </div>
              </div>
              <ChatHistory username={username} id={id} messages={messages} />
              <MessageInput username={username} id={id} connection={socketRef} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
