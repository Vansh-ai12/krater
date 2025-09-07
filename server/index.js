const express = require("express");
const PORT = 8000;
const fs = require("fs");
const cors = require("cors");
const { spawn } = require("child_process");
const path = require("path");

let latestCode = null;
let latestOutput = null;

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// 🔧 Run code in Docker
function runCode(filename, lang, callback) {
  let args = [];
  const dockerImage = "my-lang-runner";

  switch (lang.toLowerCase()) {
    case "python":
      args = ["run", "--rm", "-v", `${process.cwd()}:/app`, dockerImage, "python3", `/app/${filename}`];
      break;
    case "javascript":
      args = ["run", "--rm", "-v", `${process.cwd()}:/app`, dockerImage, "node", `/app/${filename}`];
      break;
    case "c++":
      args = [
        "run",
        "--rm",
        "-v",
        `${process.cwd()}:/app`,
        dockerImage,
        "sh",
        "-c",
        `g++ /app/${filename} -o /app/temp && /app/temp`,
      ];
      break;
    case "java":
      args = [
        "run",
        "--rm",
        "-v",
        `${process.cwd()}:/app`,
        dockerImage,
        "sh",
        "-c",
        `javac /app/${filename} && java -cp /app ${path.basename(filename, ".java")}`,
      ];
      break;
    default:
      return callback("Unsupported language", null);
  }

  const child = spawn("docker", args);
  let output = "";

  child.stdout.on("data", (data) => {
    output += data.toString();
  });

  child.stderr.on("data", (data) => {
    output += data.toString();
  });

  child.on("close", () => {
    callback(null, output); // return collected output after container exits
  });

  child.on("error", (err) => {
    callback(err.message, null);
  });
}

// 📝 Submit code
app.post("/code", (req, res) => {
  const { lang, code } = req.body;

  if (!lang || !code) return res.status(400).json({ message: "Language and code are required" });

  latestCode = { lang, code };
  let filename;

  switch (lang.toLowerCase()) {
    case "c++":
      filename = "temp.cpp";
      break;
    case "python":
      filename = "temp.py";
      break;
    case "java":
      filename = "temp.java";
      break;
    case "javascript":
      filename = "temp.js";
      break;
    default:
      return res.status(400).json({ message: "Unknown language" });
  }

  fs.writeFileSync(filename, code);

  runCode(filename, lang, (err, output) => {
    fs.unlinkSync(filename); // delete temp file after execution
    latestOutput = err ? err : output; // store output for /output route
    return res.status(err ? 500 : 201).json({
      success: !err,
      output: latestOutput,
    });
  });
});

// 📦 Get last submitted code
app.get("/code", (req, res) => {
  if (!latestCode) return res.status(404).json({ message: "No code submitted yet." });
  return res.json({ data: latestCode });
});

// 📤 Get last execution output
app.get("/output", (req, res) => {
  if (!latestOutput) return res.status(404).json({ message: "No output available yet." });
  return res.json({ output: latestOutput });
});

// 🚀 Start server
app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));
