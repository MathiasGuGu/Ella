import { NextResponse } from "next/server";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import {Pinecone} from "@pinecone-database/pinecone"
import { OpenAIEmbeddings } from "@langchain/openai";
import { PineconeStore } from "@langchain/pinecone";

export async function POST(req: Request) {
  try {
    const body: { fileKey: string } = await req.json()
    const { fileKey } = body;
    console.log("1. Received fileKey:", fileKey);

    const pdfUrl = `https://utfs.io/f/${fileKey}`;
    const response = await fetch(pdfUrl);
    const arrayBuffer = await response.arrayBuffer();


    // Check the file type from the response headers
    const contentType = response.headers.get('content-type');
    console.log("File content type:", contentType);

    if (!contentType?.includes('application/pdf')) {
      return NextResponse.json(
        { error: "Invalid file type. Only PDF files are supported." },
        { status: 400 }
      );
    }


    const blob = new Blob([arrayBuffer], { type: 'application/pdf' });
    console.log("2. PDF fetched and converted to blob");

    const loader = new PDFLoader(blob, {
        splitPages: false,
    });
    const docs = await loader.load();
    console.log("3. PDF loaded:", {
      numDocs: docs.length
    });

    // Rest of Pinecone logic remains the same
    const PINECONE_API_KEY = process.env.PINECONE_API_KEY || "";
    const pinecone = new Pinecone({
      apiKey: PINECONE_API_KEY,
    });
    console.log("4. Pinecone initialized");

    const index = pinecone.Index("ellaai");

    if (!index) {
      return NextResponse.json({ error: "Pinecone index not found" }, { status: 404 });
    }

    console.log("5. Pinecone index accessed");
    const OPENAI_API_KEY = process.env.OPEN_AI_API_KEY || "";

    const embeddings = new OpenAIEmbeddings({
      apiKey: OPENAI_API_KEY,
    });
    console.log("6. OpenAI embeddings initialized");

    const vectors = await embeddings.embedDocuments(docs.map(doc => doc.pageContent));
    console.log("7. Vectors created");

    const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
      pineconeIndex: index as any,
    });
    console.log("8. Vector store created");

    const vectorIds =await vectorStore.addVectors(vectors, docs);
    console.log("9. Vectors added to store");

    return NextResponse.json({ success: true, id: vectorIds });

  } catch (error: any) {
    console.error("Error in POST handler:", error);
    return NextResponse.json(
      { error: "Failed to process document", details: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: "Method not allowed" },
    { status: 405 }
  );
}
