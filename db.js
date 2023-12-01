require("dotenv").config();
const mysql = require("mysql2");

// var db = mysql.createPool({
//   host: process.env.host,
//   user: process.env.user,
//   password: process.env.password,
//   database: process.env.database,
//   port: process.env.port,
// });

var db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "freedb_4357461_mbrdb",
  port: "3306",
});

db.getConnection((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Database Connected");
  }
});

module.exports = db;
