const { io } = require("../server");
const { TicketControl } = require("../classes/ticket-control");

const ticketControl = new TicketControl();

io.on("connection", (client) => {
  console.log("Usuario conectado");

  client.on("nextTicket", (_, callback) => {
    const next = ticketControl.nextTicket();
    callback(next);
  });

  client.emit("currentState", {
    currentState: ticketControl.getLastTicket(),
    lastFour: ticketControl.getLastFour(),
  });

  client.on("takeTicket", (data, callback) => {
    if (!data.desktop) {
      return callback({
        err: true,
      });
    }

    const ticketToTake = ticketControl.takeTicket(data.desktop);
    callback(ticketToTake);

    // update notify changes in last 4
    client.broadcast.emit("lastFour", {
      lastFour: ticketControl.getLastFour(),
    });
  });

  client.emit("enviarMensaje", {
    usuario: "Administrador",
    mensaje: "Bienvenido a esta aplicación",
  });

  client.on("disconnect", () => {
    console.log("Usuario desconectado");
  });

  // Escuchar el cliente
  client.on("enviarMensaje", (data, callback) => {
    console.log(data);

    client.broadcast.emit("enviarMensaje", data);
  });
});
