"use client"
import { Javascript } from "@mui/icons-material";
import { useState } from "react";


function DropC({onSelect}){
    const [selected, setSelected] = useState("JavaScript");
    const handleSelect = (e) => {
    setSelected(e.target.value);
    if(onSelect) onSelect(e.target.value);
    };
    
    return(
        
        <div className="dropdown">
          <select value={selected} onChange={handleSelect} >
            <option>JavaScript</option>
            <option>Python</option>
            <option>C++</option>
            <option>Java</option>
          </select>
        </div>
    )
}

export {DropC};