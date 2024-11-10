import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { FilesCreateDto, mapToFilesReturnDto } from "../dtos/files.dto";
import { ValidationError } from "../entities/errors/common";
import { FilesRepository } from "../repositories/files.repository";
import { storeVectorInIndex } from "./pinecone.service";

export const saveVectors = async ({
  fileKey,
  userId,
}: {
  fileKey: string;
  userId: string;
}): Promise<string> => {
  console.log(userId);

  console.log("1. Received fileKey:", fileKey);

  const pdfUrl = `https://utfs.io/f/${fileKey}`;
  const response = await fetch(pdfUrl);

  if (!response.ok) {
    throw new ValidationError("Invalid file key");
  }

  const arrayBuffer = await response.arrayBuffer();

  const blob = new Blob([arrayBuffer], { type: "application/pdf" });

  if (!blob) {
    throw new ValidationError(
      "Invalid file type. Only PDF files are supported."
    );
  }

  const loader = new PDFLoader(blob, {
    splitPages: false,
  });
  const docs = await loader.load();

  if (!docs) {
    throw new ValidationError(
      "Invalid file type. Only PDF files are supported."
    );
  }

  return storeVectorInIndex({ docs });
};

export async function getAllFiles({ userId }: { userId: string }) {
  // Authorize the user request
  // Make sure response is valid and correct
  const repo = new FilesRepository();
  const freshFiles = await repo.getAllFiles({ userId });
  const files = mapToFilesReturnDto(freshFiles);
  return files;
}

export async function createFile({
  input,
  userId,
  vectorRef,
}: {
  input: FilesCreateDto;
  userId: string;
  vectorRef: string;
}) {
  // Authorize the user request
  // make sure object is valid

  // Transform object to make sure it is valid
  const fileSaveDto: FilesCreateDto = {
    binaryRef: input.binaryRef,
    description: input.description,
    name: input.name,
    projectId: input.projectId,
    size: input.size,
    tags: input.tags,
    type: input.type,
    userId: userId,
    vectorRef: vectorRef,
  };

  const repo = new FilesRepository();
  const files = await repo.createFile(fileSaveDto);

  return files;
}
