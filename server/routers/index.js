const express = require("express");

const app = express();
app.use(require("./info"));
app.use(require("./usuario"));
app.use(require("./login"));

module.exports = app;