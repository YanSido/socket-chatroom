require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const PORT = process.env.PORT || 8080;
let HISTORY = [{ name: "yan", message: "hello" }];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/public", express.static(`./client/public`));

io.on("connection", (socket) => {
  console.log(socket.id, "is connected");
  socket.on("setup", () => {
    io.emit("setup", HISTORY);
  });
  socket.on("message", ({ name, message }) => {
    console.log("Recieved new message from:", name, "-", message);
    HISTORY.push({ name, message });

    io.emit("messageBack", HISTORY);
  });

  socket.on("disconnect", () => {
    console.log(socket.id, "is disconnected");
    io.emit("serverMessages", { name: "wow", message: "render", servermessage: true });
  });
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

http.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
