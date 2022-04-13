require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const PORT = process.env.PORT || 8080;
let HISTORY = [{ name: "SERVER", message: "Welcome to students chat" }];
let USERS = [];

function getTime() {
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
  USERS.push({ id: socket.id, name: socket.handshake.query.username, status: "online" });
  console.log(socket.handshake.query.username, "is connected");

  socket.on("setup", () => {
    io.emit("setup", HISTORY);
    io.emit("usersUpdate", USERS);
  });

  socket.on("message", ({ username, message }) => {
    console.log("Recieved new message from:", username, "-", message);
    HISTORY.push({ id: socket.id, username, message });

    io.emit("messageBack", HISTORY);
  });
  socket.on("typing", (user) => {
    io.emit("typingBack", user);
    const timer = setTimeout(() => {
      io.emit("typingBack", { user: null });
    }, 2000);
    return () => clearTimeout(timer);
  });

  socket.on("privateMessage", (data) => {
    console.log(`from: ${data.from} \n to: ${data.to} \n message: ${data.message}`);
    socket.to(data.to).emit("privateMessageBack", { from: data.from, message: data.message });
  });

  socket.on("disconnect", () => {
    console.log(socket.handshake.query.username, "is disconnected");
    USERS.forEach((user) => {
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
