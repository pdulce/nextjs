const express = require("express");
const path = require("path");

//settings
var app = express();
app.set("port", 9080);
app.set("view engine", "ejs");
app.engine('html', require('ejs').renderFile);
app.set("views", path.join(__dirname, "views"));

//server port definition
app.listen(app.get("port"), (req, res) => {
  console.log("...Server works, folk!! Listening at port " + app.get("port"));
});


console.log("Server starting ...");

// routes
app.use(require('./routes/router'));
