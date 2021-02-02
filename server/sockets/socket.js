const { io } = require("../server");
const { Users } = require("../classes/users");
const { createMessage } = require("../utils/utils");
const users = new Users();

io.on("connection", (client) => {
  client.on("getInChat", (data, callback) => {
    if (!data.name || !data.room) {
      return callback({
        err: true,
      });
    }
    client.join(data.room);
    const usersResult = users.addUser(client.id, data.name, data.room);
    // let people know new connection
    client.broadcast
      .to(data.room)
      .emit("userList", users.getUsersPerRooms(data.room));
    callback(users.getUsersPerRooms(data.room));
    // notify when user joins
    client.broadcast
      .to(data.room)
      .emit(
        "createMessage",
        createMessage("Admin", `${data.name} joined chat`)
      );
  });

  // test in browser: socket.emit('createMessage', { message: "hello"})
  client.on("createMessage", (data, callback) => {
    const user = users.getUser(client.id);
    console.log("user", user);
    const message = createMessage(user.name, data.message);
    client.broadcast.to(user.room).emit("createMessage", message);

    callback(message);
  });

  client.on("disconnect", () => {
    const userRemoved = users.removeUser(client.id);
    client.broadcast
      .to(userRemoved.room)
      .emit(
        "createMessage",
        createMessage("Admin", `${userRemoved.name} left chat`)
      );
    client.broadcast
      .to(userRemoved.room)
      .emit("userList", users.getUsersPerRooms(userRemoved.room));
  });

  // private messages: socket.emit('privateMessage', { message: "hello", to: "_fQv_MIjxm2XEC4vAAAD"})
  client.on("privateMessage", (data) => {
    const user = users.getUser(client.id);
    client.broadcast
      .to(data.to)
      .emit("privateMessage", createMessage(user.name, data.message));
  });
});
