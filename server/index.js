const http = require("http");
const express = require("express");
const cors = require("cors");
const socketIO = require("socket.io");
const app = express();
app.use(cors());
const port = process.env.PORT || 4500;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const users = [{}];

const server = http.createServer(app);

const io = socketIO(server);
io.on("connection", (socket) => {
  socket.on("joined", ({ user }) => {
    users[socket.id] = user;
    console.log(`User Connected - ${user}`);
    socket.broadcast.emit("userJoined", {
      user: "Admin",
      message: `${users[socket.id]} has Joined`,
    });
    socket.emit("welcome", {
      user: "Admin",
      message: `Welcome to the chat, ${users[socket.id]}`,
    });
  });

  socket.on("message", ({ message, id }) => {
    io.emit("sendMessage", { user: users[id], message, id });
  });

  socket.on("disconnect", () => {
    socket.broadcast.emit("leave", {
      user: "Admin",
      message: `${users[socket.id]} has Left The Chat`,
    });
  });
});

server.listen(port, () => {
  console.log(`Server Listening On http://localhost:${port}`);
});
