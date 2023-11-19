"use client";

interface Project {
  id: number;
  title: string;
  description: string;
  start_date: Date;
  deadline: Date;
  createdAt: Date;
  createdBy: number;
  status_id: number;
  assignedTo: number;
}

import axios from "axios";
import React, { useEffect, useState } from "react";

const ProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    // Fetch projects data when the component mounts
    axios
      .get("/api/projects")
      .then((response) => {
        // Check if the response data is an array before setting the state
        if (Array.isArray(response.data)) {
          setProjects(response.data);
        } else {
          console.error("Invalid response data format:", response.data);
        }
      })
      .catch((error) => console.error("Error fetching projects:", error));
  }, []);

  return (
    <main className="mx-60 border">
      {/* <button
        className="btn"
        onClick={() => document.getElementById("add_project").showModal()}
      >
        Add Project
      </button>
      <dialog id="add_project" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add Project</h3>
          <input
            type="text"
            placeholder="Title"
            className="input input-bordered w-full max-w-xs mt-5"
          />
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog> */}

      {/* TABEL */}
      <div className="overflow-x-auto ">
        <table className="table ">
          {/* head */}
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Start Date</th>
              <th>Deadline</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {projects?.map((project, i) => (
              <tr key={project.id}>
                <th>{project.id}</th>
                <td>{project.title}</td>
                <td>{project.description}</td>
                <td>{project.start_date}</td>
                <td>{project.deadline}</td>
                <td>{project.status_id}</td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default ProjectsPage;
