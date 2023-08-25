const { Client } = require("pg");

const client = new Client({
  host: "192.168.120.227",
  port: 5432,
  database: "hrm",
  user: "hieuph",
  password: "hieuphm",
});

module.exports = client;
