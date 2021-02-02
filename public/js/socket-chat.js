var socket = io();
// const { renderUsers}

if (!params.has("name") || !params.has("room")) {
  window.location = "index.html";
  throw new Error("Mandatory name and room");
}

const user = {
  name: params.get("name"),
  room: params.get("room"),
};

socket.on("connect", function () {
  console.log("Conectado al servidor");
  socket.emit("getInChat", user, (res) => {
    renderUsers(res);
  });
});

// escuchar
socket.on("disconnect", function () {
  console.log("Perdimos conexión con el servidor");
});

socket.on("createMessage", (message) => {
  renderMessages(message, false);
  scrollBottom();
});

// listen when user in/out the chat
socket.on("userList", (users) => {
  console.log("curent users", users);
});

socket.on("privateMessage", (message) => {
  console.log("Private: ", message);
});
