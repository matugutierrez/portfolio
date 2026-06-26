import { NextResponse } from "next/server";
import { credentialsAreValid, setAdminSession } from "@/lib/auth";

export async function POST(request: Request) {
  const { username, password } = (await request.json()) as { username?: string; password?: string };

  if (!username || !password || !credentialsAreValid(username, password)) {
    return NextResponse.json({ error: "Credenciales invalidas" }, { status: 401 });
  }

  await setAdminSession(username);
  return NextResponse.json({ ok: true });
}
