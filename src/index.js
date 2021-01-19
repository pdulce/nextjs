const express = require("express");
const path = require("path");
const bodyparser = require("body-parser");

//settings
var app = express();
app.set("port", 9080);
app.set("view engine", "ejs");
app.engine('html', require('ejs').renderFile);
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}))
//const PORT = 5000

//server port definition
app.listen(app.get("port"), (req, res) => {
  console.log("...Server started, listening at port " + app.get("port"));
});

// routes
app.use(require('./routes/router'));
