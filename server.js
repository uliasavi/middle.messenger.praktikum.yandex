/* eslint-disable @typescript-eslint/no-var-requires */
// server.js
const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("dist"));
// sendFile will go here
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "/dist/index.html"));
});
app.listen(PORT, function () {
  console.log("Server started at http://localhost:" + PORT);
});
