"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import classnames from "classnames";
import {
  FaDesktop,
  FaBookOpen,
  FaProjectDiagram,
  FaTasks,
  FaCalendarAlt,
  FaUser,
  FaUsers,
} from "react-icons/fa";

const NavBar = () => {
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
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href="/">
        <FaBookOpen />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <Link
            key={link.href}
            className={classnames({
              "text-zinc-200": link.href === currentPath,
              "text-zinc-600": link.href !== currentPath,
              "hover:text-zinc-500 transition-colors": true,
            })}
            href={link.href}
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

const getIcon = (label: string) => {
  switch (label) {
    case "Dashboard":
      return <FaDesktop className="text-xl" />;
    case "Project":
      return <FaProjectDiagram className="text-xl" />;
    case "Task":
      return <FaTasks className="text-xl" />;
    case "Event":
      return <FaCalendarAlt className="text-xl" />;
    case "Client":
      return <FaUser className="text-xl" />;
    case "Team Member":
      return <FaUsers className="text-xl" />;
    default:
      return null;
  }
};

export default NavBar;
