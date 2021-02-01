const socket = io();
const lblTicket1 = $("#lblTicket1");
const lblTicket2 = $("#lblTicket2");
const lblTicket3 = $("#lblTicket3");
const lblTicket4 = $("#lblTicket4");
const lblEscritorio1 = $("#lblEscritorio1");
const lblEscritorio2 = $("#lblEscritorio2");
const lblEscritorio3 = $("#lblEscritorio3");
const lblEscritorio4 = $("#lblEscritorio4");

const lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
const lblDesktops = [
  lblEscritorio1,
  lblEscritorio2,
  lblEscritorio3,
  lblEscritorio4,
];

socket.on("currentState", (data) => {
  refreshHTML(data.lastFour);
});

socket.on("lastFour", (data) => {
  const audio = new Audio("audio/new-ticket.mp3");
  audio.play();
  refreshHTML(data.lastFour);
});

const refreshHTML = (lastFour) => {
  for (let i = 0; i <= lastFour.length - 1; i++) {
    lblTickets[i].text(`Ticket ${lastFour[i].number}`);
    lblDesktops[i].text(`Desktop ${lastFour[i].table}`);
  }
};
