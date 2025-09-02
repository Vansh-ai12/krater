const express = require("express");
const PORT = 8000;

const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'krateruser',
  password:'vansh@123',
  database: 'kraterdb',
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 60000,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

const app = express();


app.get("/", (req, res) => {
  return res.end("HomePAGE");
});

app.get("/data", (req, res) => {
  pool.query("SELECT * FROM users", (err, results) => {
    if (err) {
      return res.status(500).send("❌ DB not connected: " + err.message);
    }
    return res.json(results);
  });
});
app.listen(PORT, () => console.log(`Server started at PORT : ${PORT}`));
