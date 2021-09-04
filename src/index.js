const express = require("express");
const cors = require("cors");
const customCors = require("./config/customCors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const routes = require("./routes/routes");

//connecting to database
mongoose
  .connect("mongodb://localhost:27017/lab1")
  .then(() => console.log("connected to mongodb"))
  .catch(() => console.log("could not connect to mongodb"));

// configure app to use bodyParser() and cors() -------------------------------
const app = express();

app.use(customCors())
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// More routes for your API will happen here -------------------------------
app.get("/", (req, res) => {
  res.send("Hello");
});
app.get("/health-check", (req, res) => {
  res.send("server is working");
});

// REGISTER YOUR ROUTES -------------------------------
app.use("/api", routes);

// START THE SERVER, SET your port to 8080 -------------------------------
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log("Magic happens on port " + port);
});

//
module.exports = { app };
