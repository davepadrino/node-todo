// Stablish connection

const socket = io();
const label = $("#lblNuevoTicket");

socket.on("connect", () => {
  console.log("** Connected to server **");
});

socket.on("disconnect", () => {
  console.log("** Disonnected from server **");
});

$("button").on("click", (client) => {
  socket.emit("nextTicket", null, (nextTicket) => {
    label.text(nextTicket);
  });
});
