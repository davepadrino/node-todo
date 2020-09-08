const http = require("http");

http
  .createServer((req, res) => {
    res.write("Hrello");
    res.end();
  })
  .listen(8080);

console.log("istening");
