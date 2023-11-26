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
} from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import Link from "next/link";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Project {
  id: number;
  title: string;
  description: string;
  start_date: string | null;
  deadline: string | null;
  created_at: Date;
  created_by: number;
  status_id: number;
  assigned_to: number | null;
  client_id: number;
}

const ProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const { register, handleSubmit, setValue } = useForm<Project>({});
  const [selectedValue, setSelectedValue] = useState<string>("client");
  const onSubmit = (data: Project) => {
    data.status_id = 1; // Default status_id to 1
    data.created_by = 1; // Default created_by to 1
    if (selectedValue === "internal") {
      data.client_id = 0;
    } else if (selectedValue === "client") {
      data.client_id = Number(data.client_id);
    }

    if (!data.start_date) {
      data.start_date = null; // Assign current date if start_date is not provided
    }
    if (!data.deadline) {
      data.deadline = null; // Assign current date if deadline is not provided
    }
    if (!data.assigned_to) {
      data.assigned_to = null; // Assign null if assigned_to is not provided
    } else {
      data.assigned_to = Number(data.assigned_to);
    }

    console.log("Form data submitted:", data);
    axios
      .post("/api/projects", data)
      .then((response) => {
        console.log("Response:", response);
        if (response.status === 201) {
          setProjects([...projects, response.data]);
        }
      })
      .catch((error) => console.error("Error creating project:", error));
  };

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
          <div className="flex flex-row max-w-fit">
            <Select.Root
              defaultValue="client"
              onValueChange={(value: string) => setSelectedValue(value)}
            >
              <Select.Trigger mb="2" />
              <Select.Content>
                <Select.Item value="internal">Internal</Select.Item>
                <Select.Item value="client">Client</Select.Item>
              </Select.Content>
            </Select.Root>
            {selectedValue === "client" && (
              <TextField.Input
                mb="2"
                ml="2"
                placeholder="Client ID"
                {...register("client_id", {
                  required: "Client ID is required",
                })}
              />
            )}
          </div>

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
          <TextField.Input
            mb="3"
            placeholder="Status"
            {...register("status_id")}
          />
          <DialogClose>
            <Button onClick={handleSubmit(onSubmit)} className="float-right">
              Save
            </Button>
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
              <Table.RowHeaderCell>
                <Link href={`/projects/${project.id}`}>{project.id}</Link>
              </Table.RowHeaderCell>
              <Table.Cell>
                <Link href={`/projects/${project.id}`}>{project.title}</Link>
              </Table.Cell>
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
