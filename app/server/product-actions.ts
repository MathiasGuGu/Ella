import "server-only";
import { db } from "@/db";
import { project } from "@/db/schema";
import { type Session } from "@/utils/auth";

export async function getAllProjects() {}

export interface ICreateProjectFields {
  projectName: string;
  projectDescription: string;
}

export async function createProject(
  values: ICreateProjectFields,
  session: Session
) {
  await db.insert(project).values({
    userId: session.user.id!,
    name: values.projectName,
    description: values.projectDescription,
    customerId: session.user.id!,
  });
}
