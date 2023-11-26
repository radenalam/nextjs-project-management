"use client";

import Link from "next/link";
import React from "react";
import {
  FaDesktop,
  FaBookOpen,
  FaProjectDiagram,
  FaTasks,
  FaCalendarAlt,
  FaUser,
  FaUsers,
} from "react-icons/fa";
import classnames from "classnames";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const currentPath = usePathname();
  console.log(currentPath);

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Project", href: "/projects" },
    { label: "Task", href: "/tasks" },
    { label: "Event", href: "/events" },
    { label: "Client", href: "/clients" },
    { label: "Team Member", href: "/team_members" },
  ];
  return (
    <div className="flex flex-col w-64 h-screen px-4 py-8 bg-white border-r dark:bg-gray-800 dark:border-gray-600">
      <div className="flex space-x-2 mb-2 items-center">
        <Link href="/">
          <FaBookOpen />
          {/* <h1>Project</h1> */}
        </Link>
        <h1 className="text-xl">Project Managament</h1>
      </div>
      <nav className="">
        <ul className="flex flex-col pt-3">
          {links.map((link) => (
            <Link
              style={{ marginBottom: "8px" }}
              key={link.href}
              className={classnames({
                "text-zinc-200 bg-slate-400 px-2 py-1 rounded-sm":
                  link.href === currentPath, //To change the color of the current page
                "text-zinc-500 px-2 py-1": link.href !== currentPath, //To change the color of the other pages
                "hover:text-zinc-300 hover:bg-slate-600 hover:px-2 hover:py-1 hover:rounded-sm transition-colors":
                  true, //To change the color of the other pages when hovered
              })}
              href={link.href}
            >
              {link.label}
            </Link>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
