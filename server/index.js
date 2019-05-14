const express = require("express");
const next = require("next");
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const bodyParser = require("body-parser");
const port = process.env.PORT;

app.prepare().then(() => {
  const server = express();
  require("./conn");
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use("/", require("./routes"));
  server.get("*", (req, res) => {
    return handle(req, res);
  });
  server.listen(port, err => {
    if (err) throw err;
    console.log(`Server ready on port ${port}`);
  });
});
