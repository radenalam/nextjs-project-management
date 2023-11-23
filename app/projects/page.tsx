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
  Select,
  SelectLabel,
  SelectGroup,
} from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import { title } from "process";
import { describe } from "node:test";

interface Project {
  id: number;
  title: string;
  description: string;
  start_date: Date;
  deadline: Date;
  created_at: Date;
  created_by: number;
  status_id: number;
  assigned_to: number;
  client_id: number;
}

const ProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const { register, handleSubmit } = useForm<Project>();

  useEffect(() => {
    axios
      .get("/api/projects")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setProjects(response.data);
        } else {
          console.error("Invalid response data format:", response.data);
        }
      })
      .catch((error) => console.error("Error fetching projects:", error));
  }, []);

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
          <TextField.Input
            mb="2"
            placeholder="Title"
            {...register("title", { required: "Title is required" })}
          />
          <TextArea
            mb="2"
            placeholder="Description"
            {...register("description")}
          />
          <Select.Root defaultValue="client">
            <Select.Trigger mb="2" max-w-full />
            <Select.Content>
              <Select.Item value="internal">Internal</Select.Item>
              <Select.Item value="client">Client</Select.Item>
            </Select.Content>
          </Select.Root>
          <TextField.Input
            mb="2"
            placeholder="Start Date"
            {...register("start_date")}
          />
          <TextField.Input
            mb="2"
            placeholder="Deadline"
            {...register("deadline")}
          />
          <TextField.Input
            mb="3"
            placeholder="Assign To"
            {...register("assigned_to")}
          />
          <DialogClose>
            <Button className="float-right">Save</Button>
          </DialogClose>
          <DialogClose>
            <Button className="float-right">Close</Button>
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
