var express = require('express');
var app = express();
var app = require("./controller/app.js");

var port = 5000

app.use(express.static(__dirname + "/public"));

var server = app.listen(port, function () {
    console.log("Web App Hosted at ec2-54-145-240-77.compute-1.amazonaws.com", port);
});