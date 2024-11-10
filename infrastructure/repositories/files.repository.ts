import { db } from "@/db";
import { IFilesRepository } from "../interfaces/files.interface";
import { FilesCreateDto } from "../dtos/files.dto";
import { FileReturnType, files } from "@/db/schema";

export class FilesRepository implements IFilesRepository {
  // Talk to database and only that
  getAllFiles({ userId }: { userId: string }): Promise<FileReturnType[]> {
    return db.query.files.findMany({
      where: (files, { eq }) => eq(files.userId, userId),
    });
  }
  createFile(input: FilesCreateDto): Promise<FileReturnType[]> {
    return db.insert(files).values(input).returning();
  }
}
