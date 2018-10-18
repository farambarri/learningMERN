import express = require("express");
import morgan = require("morgan");
import path = require("path");
const { mongoose } = require("./database");
const app = express();

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

app.listen(app.get("port"), () => {
  console.log(`server on port ${app.get("port")}`);
});
