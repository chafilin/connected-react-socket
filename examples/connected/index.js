// Setup basic express server
var express = require("express");
var app = express();
var path = require("path");
var server = require("http").createServer(app);
var io = require("socket.io")(server);
var port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log("Server listening at port %d", port);
});

// Routing
app.use(express.static(path.join(__dirname, "build")));
app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "build/index.html"), function(err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});
// Chatroom

const broadcast = (userList, action, data) => {
  userList.forEach(user => {
    user.emit(action, data);
  });
};

let users = [];
io.on("connection", socket => {
  var addedUser = false;
  // when the client emits 'new message', this listens and executes
  socket.on("new message", data => {
    // we tell the client to execute 'new message'
    broadcast(users, "new message", {
      username: socket.username,
      message: data
    });
  });

  // when the client emits 'add user', this listens and executes
  socket.on("add user", username => {
    if (addedUser) return;

    // we store the username in the socket session for this client
    socket.username = username;
    users.push(socket);
    addedUser = true;
    socket.emit("login");
    // echo globally (all clients) that a person has connected
    broadcast(users, "add user", { username, amountOfUsers: users.length });
  });

  // when the user disconnects.. perform this
  socket.on("disconnect", () => {
    if (addedUser) {
      users = users.filter(user => {
        return user.client.id !== socket.id;
      });
      // echo globally that this client has left
      broadcast(users, "remove user", {
        username: socket.username,
        amountOfUsers: users.length
      });
    }
  });
});
