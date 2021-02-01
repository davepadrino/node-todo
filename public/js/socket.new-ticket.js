// Stablish connection

const socket = io();
const label = $("#lblNuevoTicket");

socket.on("connect", () => {
  console.log("** Connected to server **");
});

socket.on("disconnect", () => {
  console.log("** Disonnected from server **");
});

socket.on("currentState", (res) => {
  label.text(res.currentState);
});

$("button").on("click", (client) => {
  socket.emit("nextTicket", null, (nextTicket) => {
    label.text(nextTicket);
  });
});
