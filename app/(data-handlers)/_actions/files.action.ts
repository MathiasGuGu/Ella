"use server";
import { headers } from "next/headers";

import { auth } from "@/utils/auth";
import { AuthenticationError } from "@/infrastructure/entities/errors/auth";
import {
  getAllFiles as filesServiceGetFiles,
  createFile as filesServiceCreateFile,
  saveVectors as filesServiceSaveVectors,
} from "@/infrastructure/services/files.service";
import { FilesCreateInput } from "@/infrastructure/dtos/files.dto";
import { z } from "zod";
import { ValidationError } from "@/infrastructure/entities/errors/common";

export async function getAllFiles() {
  try {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session) {
      throw new AuthenticationError("User not logged in.");
    }

    const files = await filesServiceGetFiles({ userId: session.user.id });

    return files;
  } catch (error) {
    if (error instanceof AuthenticationError) {
      return { error: error.message };
    }
    return { error: "Something went wrong" };
  }
}

export async function createFile(
  input: Partial<z.infer<typeof FilesCreateInput>>
) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session) {
      throw new AuthenticationError("User not logged in.");
    }

    const { data, error: inputError } = FilesCreateInput.safeParse(input);

    if (inputError) {
      throw new ValidationError("Invalid input");
    }

    // Save the file in the vector database and get vector reference key
    const vectorKey = await filesServiceSaveVectors({
      fileKey: data.binaryRef,
      userId: session.user.id,
    });

    if (!vectorKey) {
      throw new ValidationError("Failed to save vectors");
    }

    // Save the file in the database and get the file in return [file]
    const files = await filesServiceCreateFile({
      input: data,
      userId: session.user.id,
      vectorRef: vectorKey,
    });

    if (!files) {
      throw new ValidationError("Failed to create file");
    }

    return files;
  } catch (error) {
    if (error instanceof AuthenticationError) {
      return { error: error.message };
    }

    if (error instanceof ValidationError) {
      return { error: error.message };
    }

    return { error: "Something went wrong" };
  }
}
