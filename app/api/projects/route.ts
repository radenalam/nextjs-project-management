import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { createProjectSchema } from "../../validationSchema";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const validation = createProjectSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const newProject = await prisma.projects.create({
    data: validation.data,
  });

  return NextResponse.json(newProject["title"] + " Berhasil di tambah", {
    status: 201,
  });
}

export async function GET(req: NextRequest) {
  try {
    // Retrieve all projects from the database
    const projects = await prisma.projects.findMany();

    // Return the list of projects in the response
    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    // Handle errors and return an appropriate response
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
