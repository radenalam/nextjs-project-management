import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export const GET = async (req: NextRequest) => {
  const projects = await prisma.projects.findMany({});
  return NextResponse.json({ projects });
};

// export const POST = async (req: NextRequest) => {
//   const { title, description } = await req.json();

//   const projects = await prisma.projects.create({
//     data: {
//       title,
//       description,
//     },
//   });

//   return NextResponse
// };
