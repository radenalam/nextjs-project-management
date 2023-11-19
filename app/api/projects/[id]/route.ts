import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { createProjectSchema } from "@/app/validationSchema";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: Number } }
) {
  try {
    const project = await prisma.projects.findUnique({
      where: { id: Number(params.id) },
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ project });
  } catch (error) {
    console.error("Error fetching project details:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: Number } }
) {
  const body = await req.json();
  try {
    // Validate the request body
    const validation = createProjectSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(validation.error.format(), { status: 400 });
    }

    // Update the project based on the ID
    const updatedProject = await prisma.projects.update({
      where: { id: Number(params.id) },
      data: validation.data,
    });

    return NextResponse.json(updatedProject, { status: 201 });
  } catch (error) {}
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: Number } }
) {
  try {
    const deletedProject = await prisma.projects.delete({
      where: { id: Number(params.id) },
    });

    if (!deletedProject) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(deletedProject, { status: 200 });
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
