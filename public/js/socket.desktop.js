const socket = io();

const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has("escritorio")) {
  window.location = "index.html";
  throw new Error("Desktop is mandatory");
}
const label = $("small");
const desktop = searchParams.get("escritorio");
$("h1").text(`Desktop ${desktop}`);
$("button").on("click", () => {
  socket.emit("takeTicket", { desktop }, (res) => {
    if (res === "no tickets") {
      label.text(res);
      return alert(res);
    }
    label.text(`Ticket ${res.number}`);
  });
});
