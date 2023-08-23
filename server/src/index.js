const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const routes = require("./routes/index");

const db = require("./database/db");

const port = 5000;
require("dotenv").config();

const app = express();

app.use(cookieParser());
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", routes);

db.connect()
  .then(() => {
    console.log("PostgreSQL connected");
    app.listen(port, () => {
      console.log("Server is listening on http://localhost:" + port);
    });
  })
  .catch((err) => {
    console.log(err, "Can't connect to SQL server");
  });
