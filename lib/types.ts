export type Project = {
  id: number;
  title: string;
  slug: string;
  description: string;
  category: string;
  coverImage: string;
  siteUrl: string;
  repoUrl: string | null;
  status: string;
  dateLabel: string;
  complexity: string;
  technologies: string[];
  createdAt?: string;
};

export type ProjectInput = Omit<Project, "id" | "createdAt">;
