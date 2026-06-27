const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "arshadquresh",
  database: "carrental"
});

db.connect(err => {
  if (err) throw err;
  console.log("Connected to MySQL");
});

module.exports = db;