const express = require("express");
const PORT = 8000;
const fs = require("fs");
const cors = require('cors');
const mysql = require('mysql2');
let latestCode ={};
const Code = null;
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
app.use(express.json()); 
app.use(
  cors(
    {
      origin:"http://localhost:3000",
      credentials: true
    }
  )
)
app.get("/", (req, res) => {
  return res.end("HomePAGE");
});
app.post("/code", (req, res) => {
  const { lang, code } = req.body;


  latestCode = { lang, code };
  switch (latestCode.lang.toLowerCase()) {
  case "c++":
    fs.writeFileSync("temp.cpp", latestCode.code);
    console.log("Compiling C++ code...");
    break;

  case "python":
    fs.writeFileSync("temp.py", latestCode.code);
    console.log("Running Python code...");
    break;

  case "java":
    fs.writeFileSync("temp.java", latestCode.code);
    console.log("Compiling Java code...");
    break;
  case "javascript":
    fs.writeFileSync("temp.js", latestCode.code);
    console.log("Compiling Java code...");
    break;

  default:
    console.log("Unknown language!");
}

  return res.status(201).json({
    success: true,
    data: latestCode
  });
});

app.get("/code", (req, res) => {
  if (!latestCode) {
    return res.status(404).json({ message: "No code has been submitted yet" });
  }

  return res.json({
    data: latestCode
  });
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

