require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const PORT = process.env.PORT || 8080;
let HISTORY = [{ username: "SERVER", message: "Welcome to students chat" }];
let USERS = [];

function getTime() {
  // current time
  let d = new Date();
  let minutes = d.getMinutes();
  let hours = d.getHours();
  if (Number(minutes) < 10) minutes = `0${String(minutes)}`;
  if (Number(hours) < 10) hours = `0${String(hours)}`;
  return `${hours}:${minutes}`;
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

io.on("connection", (socket) => {
  // when user connects to server
  USERS.push({ id: socket.id, name: socket.handshake.query.username, status: "online" }); // add user to users list
  console.log(socket.handshake.query.username, "is connected", "|", socket.id);

  socket.on("setup", () => {
    // sends chat history and users to user
    io.emit("setup", HISTORY);
    io.emit("usersUpdate", USERS);
  });

  socket.on("message", ({ username, message }) => {
    // when user sends message
    console.log("Recieved new message from:", username, "-", message, "|", socket.id);
    HISTORY.push({ id: socket.id, username, message }); // add message to history
    io.emit("setup", HISTORY);
  });

  socket.on("typing", (user) => {
    // when user is typing
    io.emit("typingBack", user);
    const timer = setTimeout(() => {
      // display typing user for 2 seconds
      io.emit("typingBack", { user: null });
    }, 2000);
    return () => clearTimeout(timer);
  });

  socket.on("privateMessage", (data) => {
    // when user sends private message
    let fromName = "",
      fromId = "",
      toName = "",
      toId = "";
    USERS.forEach((user) => {
      // find user's details
      if (data.id === user.id) {
        fromName = user.name;
        fromId = user.id;
      }
      if (data.toId === user.id) {
        toName = user.name;
        toId = user.id;
      }
    });
    HISTORY.push({
      // add private message to history
      fromName: fromName,
      id: fromId,
      toId,
      username: toName,
      message: data.message,
      private: true,
    });
    console.log(
      `from: ${fromName} (${fromId}) \n to: ${toName} (${toId}) \n message: ${data.message}`
    );
    io.emit("setup", HISTORY);
  });

  socket.on("disconnect", () => {
    // when user disconnects
    console.log(socket.handshake.query.username, "is disconnected", "|", socket.id);
    USERS.forEach((user) => {
      // update user's status (offline and last seen time)
      if (user.id === socket.id) {
        user.status = "offline";
        user.lastseen = getTime();
      }
    });
    io.emit("usersUpdate", USERS);
  });
});

app.use("/", express.static(`./client/build`));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

http.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
