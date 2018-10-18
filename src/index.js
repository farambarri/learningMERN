"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var morgan = require("morgan");
var path = require("path");
var mongoose = require("./database").mongoose;
var app = express();
//setting
app.set("port", 3000);
//middleware
app.use(morgan("dev"));
app.use(express.json());
app.use("/api/v1/task/", require("./routes/task.route"));
//routes
//static files
app.use(express.static(path.join(__dirname, "public")));
//stating services
app.listen(app.get("port"), function () {
    console.log("server on port " + app.get("port"));
});
//# sourceMappingURL=index.js.map