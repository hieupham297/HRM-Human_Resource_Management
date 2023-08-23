const { Client } = require("pg");

const client = new Client({
  host: "192.168.120.219",
  port: 5432,
  database: "hrm",
  user: "hieuph",
  password: "hieuphm",
});

module.exports = client;
