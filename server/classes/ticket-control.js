const fs = require("fs");
class TicketControl {
  constructor() {
    this.last = 0;
    this.currentDate = new Date().getDate();
    const data = require("../data/data.json");

    if (data.currentDate === this.currentDate) {
      this.last = data.last;
    } else {
      this.restartCounter();
    }
  }

  restartCounter() {
    this.last = 0;
    this.saveFile();
  }

  nextTicket() {
    this.last += 1;
    this.saveFile();

    return `Ticket ${this.last}`;
  }

  saveFile() {
    const jsonData = {
      last: this.last,
      currentDate: this.currentDate,
    };

    const jsonString = JSON.stringify(jsonData);
    fs.writeFileSync("./server/data/data.json", jsonString);
  }
}

module.exports = { TicketControl };
