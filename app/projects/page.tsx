"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  DialogClose,
  DialogContent,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
  Table,
  TextArea,
  TextField,
} from "@radix-ui/themes";

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

const ProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [newProjectTitle, setNewProjectTitle] = useState("");

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

  const handleAddProject = () => {
    console.log("Opening modal. Current isModalOpen:", isModalOpen); // Log sebelum setModalOpen

    // Handle logic for adding a new project
    // ...

    // Close the modal
    setModalOpen(false);
  };

  return (
    <Container>
      <DialogRoot>
        <DialogTrigger>
          <Button className="float-right" mx="3" my="3">
            Add Project
          </Button>
        </DialogTrigger>

        <DialogContent style={{ maxWidth: 500 }}>
          <DialogTitle>Add Project</DialogTitle>
          <TextField.Input id="title" mb="2" placeholder="Title" />
          <TextArea id="description" mb="2" placeholder="Description" />
          <TextField.Input id="start_date" mb="2" placeholder="Start Date" />
          <TextField.Input id="deadline" mb="2" placeholder="Deadline" />
          <TextField.Input id="assign_to" mb="3" placeholder="Assgin To" />
          <DialogClose>
            <Button onClick={handleAddProject} className="float-right">
              Save
            </Button>
          </DialogClose>
        </DialogContent>
      </DialogRoot>

      {/* TABLE */}
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>ID</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Start Date</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Deadline</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Action</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {projects.map((project, i) => (
            <Table.Row key={i}>
              <Table.RowHeaderCell>{project.id}</Table.RowHeaderCell>
              <Table.Cell>{project.title}</Table.Cell>
              <Table.Cell>{project.description}</Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell>{project.status_id}</Table.Cell>
              <Table.Cell>ICON</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Container>
  );
};

export default ProjectsPage;
