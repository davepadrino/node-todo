const { io } = require("../server");

io.on("connection", (client) => {
  console.log("Socket connected");

  client.emit("connectedUser", {
    user: "message from server",
  });

  client.on("disconnect", () => {
    console.log("Disconnected!");
  });

  client.on("FirstContact", (hello, callback) => {
    console.log(hello);

    client.broadcast.emit("FirstContact", hello);
    // callback({ hello });
  });
});
