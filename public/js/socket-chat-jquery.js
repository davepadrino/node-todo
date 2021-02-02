const params = new URLSearchParams(window.location.search);

// jquery references
const divUsers = $("#divUsuarios");
const formSend = $("#formSend");
const txtMessage = $("#txtMessage");
const userName = params.get("name");
const divChatbox = $("#divChatbox");

// render users

const renderUsers = (users) => {
  let html = "";

  html += "<li>";
  html +=
    '    <a href="javascript:void(0)" class="active"> Chat de <span>' +
    params.get("room") +
    "</span></a>";
  html += "</li>";

  for (let i = 0; i < users.length; i++) {
    html += "<li>";
    html +=
      '<a data-id="' +
      users[i].id +
      '" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>' +
      users[i].name +
      ' <small class="text-success">online</small></span></a>';
    html += "</li>";
  }

  divUsers.html(html);
};

const renderMessages = (message, isMe) => {
  const date = new Date(message.date);
  const hour = date.getHours() + ":" + date.getMinutes();
  let html = "";
  let adminClass = "info";

  if (message.name === "Admin") {
    adminClass = "danger";
  }

  if (isMe) {
    html += '<li class="reverse">';
    html += '<div class="chat-content">';
    html += "<h5>" + message.name + "</h5>";
    html += '<div class="box bg-light-inverse">' + message.message + "</div>";
    html += " </div>";
    html += '<div class="chat-img">';
    html += '<img src="assets/images/users/5.jpg" alt="user" />';
    html += " </div>";
    html += '<div class="chat-time">' + hour + "</div>";
    html += " </li>";
  } else {
    html += "<li class='animated fadeIn'>";
    html += '<div class="chat-img">';
    if (message.name !== "Admin") {
      html += '<img src="assets/images/users/1.jpg" alt="user" />';
    }
    html += "</div>";
    html += '<div class="chat-content">';
    html += "<h5>" + message.name + "</h5>";
    html +=
      '<div class="box bg-light-' +
      adminClass +
      '">' +
      message.message +
      "</div>";
    html += "</div>";
    html += '<div class="chat-time">' + hour + "</div>";
    html += "</li>";
  }

  divChatbox.append(html);
};

function scrollBottom() {
  // selectors
  var newMessage = divChatbox.children("li:last-child");

  // heights
  var clientHeight = divChatbox.prop("clientHeight");
  var scrollTop = divChatbox.prop("scrollTop");
  var scrollHeight = divChatbox.prop("scrollHeight");
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight() || 0;

  if (
    clientHeight + scrollTop + newMessageHeight + lastMessageHeight >=
    scrollHeight
  ) {
    divChatbox.scrollTop(scrollHeight);
  }
}

// Listeners
divUsers.on("click", "a", () => {
  const id = $(this).data("id");
  if (id) {
    console.log(id);
  }
});

formSend.on("submit", (event) => {
  event.preventDefault();
  if (txtMessage.val().trim().length === 0) {
    return;
  }

  socket.emit(
    "createMessage",
    {
      name: userName,
      message: txtMessage.val(),
    },
    (message) => {
      txtMessage.val("").focus();
      renderMessages(message, true);
      scrollBottom();
    }
  );
});
