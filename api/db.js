// api/db.js
const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "hotel_user",
  password: "hotel_pass",
  database: "hotel_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool.promise();
