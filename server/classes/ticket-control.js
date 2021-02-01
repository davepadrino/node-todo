const fs = require("fs");

class Ticket {
  constructor(number, table) {
    this.number = number;
    this.table = table;
  }
}

class TicketControl {
  constructor() {
    this.last = 0;
    this.currentDate = new Date().getDate();
    const data = require("../data/data.json");
    this.tickets = [];
    this.lastFour = [];

    if (data.currentDate === this.currentDate) {
      this.last = data.last;
      this.tickets = data.tickets;
      this.lastFour = data.lastFour;
    } else {
      this.restartCounter();
    }
  }

  restartCounter() {
    this.last = 0;
    this.tickets = [];
    this.lastFour = [];
    this.saveFile();
  }

  nextTicket() {
    this.last += 1;
    const ticket = new Ticket(this.last, null);
    this.tickets.push(ticket);
    this.saveFile();

    return `Ticket ${this.last}`;
  }

  takeTicket(desktopNumber) {
    if (this.tickets.length === 0) {
      return "no tickets";
    }
    const ticketNumber = this.tickets[0].number;
    this.tickets.shift();
    const takeTicket = new Ticket(ticketNumber, desktopNumber);
    this.lastFour.unshift(takeTicket);

    if (this.lastFour.length > 4) {
      this.lastFour.splice(-1, 1);
    }

    this.saveFile();
    return takeTicket;
  }

  getLastTicket() {
    return `Ticket ${this.last}`;
  }

  getLastFour() {
    return this.lastFour;
  }

  saveFile() {
    const jsonData = {
      last: this.last,
      currentDate: this.currentDate,
      tickets: this.tickets,
      lastFour: this.lastFour,
    };

    const jsonString = JSON.stringify(jsonData);
    fs.writeFileSync("./server/data/data.json", jsonString);
  }
}

module.exports = { TicketControl };
