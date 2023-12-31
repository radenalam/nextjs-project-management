"use client";

import Link from "next/link";
import React, { useState } from "react";
import {
  FaDesktop,
  FaBookOpen,
  FaProjectDiagram,
  FaTasks,
  FaCalendarAlt,
  FaUser,
  FaUsers,
} from "react-icons/fa";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import classnames from "classnames";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const currentPath = usePathname();
  const [open, setOpen] = useState(true);
  console.log(currentPath);

  const links = [
    { label: "Dashboard", href: "/", icon: <FaDesktop /> },
    { label: "Project", href: "/projects", icon: <FaProjectDiagram /> },
    { label: "Task", href: "/tasks", icon: <FaTasks /> },
    { label: "Event", href: "/events", icon: <FaCalendarAlt /> },
    { label: "Client", href: "/clients", icon: <FaUser /> },
    { label: "Team Member", href: "/team_members", icon: <FaUsers /> },
  ];
  return (
    <div
      className={`flex flex-col ${
        open ? "w-72" : "w-23"
      } h-screen px-4 py-8 bg-white border-r dark:bg-gray-800 dark:border-gray-600 `}
    >
      <div className="absolute cursor-pointer-right-5 top-9 w-7">
        <FaArrowRightArrowLeft
          onClick={() => {
            setOpen(!open);
          }}
        />
      </div>
      <Link className="flex mx-4 space-x-2 mb-2 items-center" href="/">
        <FaBookOpen />
        {open && <h1 className="text-xl">Project Managament</h1>}
      </Link>

      <nav className="">
        <ul className="flex flex-col pt-3">
          {links.map((link) => (
            <Link
              style={{ marginBottom: "8px" }}
              key={link.href}
              className={classnames({
                "text-zinc-200 bg-slate-400 px-2 py-2 rounded-md":
                  link.href === currentPath, //To change the color of the current page
                "text-zinc-500 px-2 py-2": link.href !== currentPath, //To change the color of the other pages
                "hover:text-zinc-300 hover:bg-slate-600 hover:px-2 hover:py-2 hover:rounded-md transition-colors":
                  true, //To change the color of the other pages when hovered
              })}
              href={link.href}
            >
              <div className="flex items-center text-xl px-2 py-1">
                {link.icon}
                {open && <span className="ml-4">{link.label}</span>}
              </div>
            </Link>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
