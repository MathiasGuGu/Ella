import { FileReturnType } from "@/db/schema";
import { z } from "zod";

export interface FilesReturnDto {
  id: string;
  name: string;
  type: string;
  size: number;
  description: string;
  tags: string;
  binaryRef: string;
  vectorRef: string;
  projectId: string;
  userId: string;
}

export interface FilesCreateDto {
  name: string;
  type: string;
  size: number;
  description: string;
  tags: string;
  binaryRef: string;
  vectorRef: string;
  projectId: string;
  userId: string;
}

export const FilesCreateInput = z.object({
  name: z.string().min(2).max(50),
  type: z.string().min(2).max(50),
  size: z.number().min(1).max(1000),
  description: z.string().min(2).max(50),
  tags: z.string().min(2).max(255),
  projectId: z.string().min(1),
  binaryRef: z.string().min(2),
  vectorRef: z.string().min(2),
  userId: z.string().min(1),
});

export function mapToFilesReturnDto(files: FileReturnType[]): FilesReturnDto[] {
  return files.map((file) => {
    const f: FilesReturnDto = {
      id: file.id,
      name: file.name,
      type: file.type,
      size: file.size,
      description: file.description || "",
      tags: file.tags || "",
      binaryRef: file.binaryRef,
      vectorRef: file.vectorRef || "",
      projectId: file.projectId,
      userId: file.userId,
    };
    return f;
  });
}
