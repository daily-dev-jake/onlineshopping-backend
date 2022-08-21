const customer = require("./models/customer");
const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");

app = express(); // instance of Express app (Web Server)
app.use(cors());
app.use(bodyparser.json());

app.get("/", (req, res, next) => {
  res.send(`<h1>Backend server view</h1>`);
});

app.use(customer.router);



const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:`+port);
}); // Listen to port 5000
