const mysql = require("mysql2");

const db = mysql.createConnection({
  // Use environment variables provided by Docker, with fallbacks for local non-Docker testing
  host: process.env.DB_HOST || "db",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "arshadquresh",
  database: process.env.DB_NAME || "carrental"
});

db.connect(err => {
  if (err) throw err;
  console.log("Connected to MySQL");
});

module.exports = db;