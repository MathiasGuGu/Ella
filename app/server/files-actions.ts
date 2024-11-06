"use server"
import { db } from "@/db";
import { files } from "@/db/schema";
import { UUID } from "crypto";

export async function getAllFiles() {
    try {
        const f = await db.select().from(files);
        return f;
    } catch (error) {
        console.log(error);
    }
}

export async function getFileById() {}


export interface ICreateFileInput {
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
export async function createFile(input: ICreateFileInput) {
    try {
        const file = await db.insert(files).values(input).returning();
        return file;
    } catch (error) {
        console.log(error);
    }
}

export async function updateFile() {}

export async function deleteFile() {}
