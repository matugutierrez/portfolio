import { NextResponse } from "next/server";
import { createProject, getProjects } from "@/lib/db";
import { isAdmin } from "@/lib/auth";
import type { ProjectInput } from "@/lib/types";

export async function GET() {
  const projects = await getProjects();
  return NextResponse.json(projects);
}

export async function POST(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  const project = (await request.json()) as ProjectInput;
  const created = await createProject(project);
  return NextResponse.json(created, { status: 201 });
}
