"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var URI = "mongodb://localhost/mern-tasks";
mongoose
    .connect(URI, { useNewUrlParser: true })
    .then(function (db) { return console.log("connected db"); })
    .catch(function (err) { return console.log(err); });
module.exports = mongoose;
//# sourceMappingURL=database.js.map