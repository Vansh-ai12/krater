"use client";
import "../../../styles/App.css";
import { fetchA, genOutput } from "../../../API/FetchAPI";
import { useState } from "react";
import { DropC } from "../../../Components/TopControls";

export default function CodePage() {
  const [language, setLanguage] = useState("Javascript");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);

  const handleRun = async () => {
    setIsRunning(true);
    setOutput("Running...");

    try {
      
      await fetchA(language, code);

     
      await new Promise((r) => setTimeout(r, 500));

    
      const result = await genOutput();
      setOutput(result || "No output available.");
    } catch (err) {
      setOutput("Error: " + err.message);
    } finally {
      setIsRunning(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const value = e.target.value;
      e.target.value = value.substring(0, start) + "\t" + value.substring(end);
      e.target.selectionStart = e.target.selectionEnd = start + 1;
    }
  };

  const handleKeyPress = (e) => {
    const pairs = { "{": "}", "(": ")", "[": "]", '"': '"', "'": "'" };
    if (pairs[e.key]) {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const value = e.target.value;
      e.target.value =
        value.substring(0, start) + e.key + pairs[e.key] + value.substring(end);
      e.target.selectionStart = e.target.selectionEnd = start + 1;
    }
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const start = e.target.selectionStart;
      const value = e.target.value;
      const lines = value.substring(0, start).split("\n");
      const prevLine = lines[lines.length - 1];
      const indent = prevLine.match(/^\s*/)[0];
      e.target.value =
        value.substring(0, start) + "\n" + indent + value.substring(start);
      e.target.selectionStart = e.target.selectionEnd = start + 1 + indent.length;
    }
  };

  const handleChange = (e) => setCode(e.target.value);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
        padding: 0,
        margin: 0,
        backgroundColor:"#fff8e7",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      <div style={{ display: "flex", gap: "10px", padding: "10px" }}>
        <DropC onSelect={(val) => setLanguage(val)} />
        <button className="vs-run-circle" onClick={handleRun} disabled={isRunning}>
          {isRunning ? (
            <div className="spinner"></div>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
      </div>

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <textarea
          style={{
            flex: 1,
            backgroundColor: "#1e1e1e",
            color: "#d4d4d4",
            border: "none",
            fontFamily: "monospace",
            fontSize: "14px",
            padding: "10px",
            boxSizing: "border-box",
            resize: "none",
            overflowY: "auto",
          }}
          onKeyDown={(e) => {
            handleKeyDown(e);
            handleEnter(e);
          }}
          onKeyPress={handleKeyPress}
          onChange={handleChange}
          value={code}
          placeholder="Write your code here..."
        />
        <div
          style={{
            flex: 1,
            backgroundColor: "#2b2b2b",
            color: "#d4d4d4",
            padding: "10px",
            fontFamily: "monospace",
            fontSize: "14px",
            overflowY: "auto",
            boxSizing: "border-box",
            whiteSpace: "pre-wrap",
          }}
        >
          {output || "Output will appear here..."}
        </div>
      </div>


      <style jsx>{`
        .spinner {
          border: 3px solid #333;
          border-top: 3px solid #fff;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg);}
          100% { transform: rotate(360deg);}
        }
      `}</style>
    </div>
  );
}