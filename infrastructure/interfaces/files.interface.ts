import { FileReturnType } from "@/db/schema";
import { FilesCreateDto } from "../dtos/files.dto";

export interface IFilesRepository {
  getAllFiles({ userId }: { userId: string }): Promise<FileReturnType[]>;
  createFile(input: FilesCreateDto): Promise<FileReturnType[]>;
}
