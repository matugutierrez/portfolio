import { Pool } from "pg";
import type { Project, ProjectInput } from "./types";
import { sampleProjects } from "./sample-data";

let pool: Pool | null = null;
let schemaReady = false;

function getPool() {
  if (!process.env.DATABASE_URL) return null;
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : undefined,
    });
  }
  return pool;
}

async function ensureSchema() {
  const client = getPool();
  if (!client || schemaReady) return;

  await client.query(`
    CREATE TABLE IF NOT EXISTS projects (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      description TEXT NOT NULL,
      category TEXT NOT NULL,
      cover_image TEXT NOT NULL,
      site_url TEXT NOT NULL,
      repo_url TEXT,
      status TEXT NOT NULL,
      date_label TEXT NOT NULL,
      complexity TEXT NOT NULL,
      technologies JSONB NOT NULL DEFAULT '[]'::jsonb,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  schemaReady = true;
}

function rowToProject(row: Record<string, unknown>): Project {
  return {
    id: Number(row.id),
    title: String(row.title),
    slug: String(row.slug),
    description: String(row.description),
    category: String(row.category),
    coverImage: String(row.cover_image),
    siteUrl: String(row.site_url),
    repoUrl: row.repo_url ? String(row.repo_url) : null,
    status: String(row.status),
    dateLabel: String(row.date_label),
    complexity: String(row.complexity),
    technologies: Array.isArray(row.technologies) ? (row.technologies as string[]) : [],
    createdAt: row.created_at ? String(row.created_at) : undefined,
  };
}

export async function getProjects(): Promise<Project[]> {
  const client = getPool();
  if (!client) return sampleProjects;
  await ensureSchema();
  const result = await client.query("SELECT * FROM projects ORDER BY created_at DESC, id DESC");
  return result.rows.map(rowToProject);
}

export async function createProject(project: ProjectInput): Promise<Project> {
  const client = getPool();
  if (!client) throw new Error("DATABASE_URL no configurada");
  await ensureSchema();
  const result = await client.query(
    `INSERT INTO projects
      (title, slug, description, category, cover_image, site_url, repo_url, status, date_label, complexity, technologies)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
     RETURNING *`,
    [
      project.title,
      project.slug,
      project.description,
      project.category,
      project.coverImage,
      project.siteUrl,
      project.repoUrl || null,
      project.status,
      project.dateLabel,
      project.complexity,
      JSON.stringify(project.technologies),
    ],
  );
  return rowToProject(result.rows[0]);
}

export async function updateProject(id: number, project: ProjectInput): Promise<Project> {
  const client = getPool();
  if (!client) throw new Error("DATABASE_URL no configurada");
  await ensureSchema();
  const result = await client.query(
    `UPDATE projects SET
      title=$1, slug=$2, description=$3, category=$4, cover_image=$5, site_url=$6,
      repo_url=$7, status=$8, date_label=$9, complexity=$10, technologies=$11
     WHERE id=$12 RETURNING *`,
    [
      project.title,
      project.slug,
      project.description,
      project.category,
      project.coverImage,
      project.siteUrl,
      project.repoUrl || null,
      project.status,
      project.dateLabel,
      project.complexity,
      JSON.stringify(project.technologies),
      id,
    ],
  );
  if (!result.rows[0]) throw new Error("Proyecto no encontrado");
  return rowToProject(result.rows[0]);
}

export async function deleteProject(id: number) {
  const client = getPool();
  if (!client) throw new Error("DATABASE_URL no configurada");
  await ensureSchema();
  await client.query("DELETE FROM projects WHERE id=$1", [id]);
}
