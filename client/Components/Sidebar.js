"use client";
import React, { useEffect, useState } from "react";

import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs";
import "../styles/App.css";
import { SideBarData } from "./SideBarData";
import { usePathname, useRouter } from "next/navigation";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Add } from "@mui/icons-material";
export default function sideBar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useKindeBrowserClient();
  return (
    <div className="Sidebar">
      <ul className="SidebarList">
        <li className="row1">
            
            <div  id="title">{user?.given_name ? `${user.given_name} ${user.family_name}` : "Guest"}</div>
            <div title="iconS"><AccountCircleIcon/></div>
        </li>
        {SideBarData.map((val, key) => {
          return (
            <li
              key={key}
              onClick={() => router.push(val.link)}
              className="row"
              id={pathname === val.link ? "active" : ""}
            >
              <div id="icon">{val.icon}</div>
              <div id="title">{val.title}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
