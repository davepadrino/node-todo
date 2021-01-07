var socket = io();
socket.on("connect", () => {
  console.log("welcome my friend");
});

socket.on("disconnect", () => {
  console.log("byeweeeee my friend");
});

socket.emit(
  "FirstContact",
  {
    hello: "dear",
  },
  (hello) => {
    console.log("triggered!", hello);
  }
);

socket.on("FirstContact", (user) => {
  console.log("serverrrrr", user);
});

socket.on("connectedUser", (user) => {
  console.log(user);
});
