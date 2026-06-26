import { NextResponse } from "next/server";
import { deleteProject, updateProject } from "@/lib/db";
import { isAdmin } from "@/lib/auth";
import type { ProjectInput } from "@/lib/types";

type Context = { params: Promise<{ id: string }> };

export async function PUT(request: Request, context: Context) {
  if (!(await isAdmin())) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  const { id } = await context.params;
  const project = (await request.json()) as ProjectInput;
  const updated = await updateProject(Number(id), project);
  return NextResponse.json(updated);
}

export async function DELETE(_request: Request, context: Context) {
  if (!(await isAdmin())) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  const { id } = await context.params;
  await deleteProject(Number(id));
  return NextResponse.json({ ok: true });
}
