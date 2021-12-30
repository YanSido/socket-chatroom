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
app.use("/public", express.static(`./client/public`));

io.on("connection", (socket) => {
  USERS.push({ name: socket.id, status: "online" });
  console.log(socket.id, "is connected");
  socket.on("setup", () => {
    io.emit("setup", HISTORY);
    io.emit("usersUpdate", USERS);
  });
  socket.on("message", ({ name, message }) => {
    console.log("Recieved new message from:", name, "-", message);
    HISTORY.push({ name, message });

    io.emit("messageBack", HISTORY);
  });

  socket.on("typing", (name) => {
    io.emit("typingBack", name);
    const timer = setTimeout(() => {
      io.emit("typingBack", { name: null });
    }, 2000);
    return () => clearTimeout(timer);
  });

  socket.on("disconnect", () => {
    console.log(socket.id, "is disconnected");
    USERS.forEach((user) => {
      if (user.name === socket.id) {
        user.status = "offline";
        user.lastseen = getTime();
      }
    });
    io.emit("usersUpdate", USERS);
  });
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

http.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
