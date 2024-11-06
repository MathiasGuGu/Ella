import { NextResponse } from "next/server";
import { Pinecone } from "@pinecone-database/pinecone";
import { OpenAIEmbeddings } from "@langchain/openai";
import { PineconeStore } from "@langchain/pinecone";
import { OpenAI } from "openai";
import { Document } from "@langchain/core/documents";

export async function POST(req: Request) {
  try {
    const body: {
      query: string,
      filters?: {
        fileType?: string,
        fileName?: string,
      }
    } = await req.json();
    const { query, filters } = body;

    const PINECONE_API_KEY = process.env.PINECONE_API_KEY || "";
    const pinecone = new Pinecone({
      apiKey: PINECONE_API_KEY,
    });

    const index = pinecone.Index("ellaai");

    if (!index) {
      return NextResponse.json({ error: "Pinecone index not found" }, { status: 404 });
    }

    const OPENAI_API_KEY = process.env.OPEN_AI_API_KEY || "";
    const embeddings = new OpenAIEmbeddings({
      apiKey: OPENAI_API_KEY,
    });

    const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
      pineconeIndex: index as any,
    });

    const results = await vectorStore.similaritySearch(query, 5, filters);

    const context = results
      .map((doc: Document) => {
        const metadata = doc.metadata;
        return `[File: ${metadata.fileName}]\n${doc.pageContent}`;
      })
      .join('\n\n');

    const openai = new OpenAI({
      apiKey: OPENAI_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant. Use the following context to answer the user's question. Include file references in your answer when relevant. If the context doesn't contain relevant information, say so.",
        },
        {
          role: "user",
          content: `Context: ${context}\n\nQuestion: ${query}`,
        },
      ],
      model: "gpt-4o-mini",
    });

    const aiResponse = completion.choices[0].message.content;

    return NextResponse.json({
      aiResponse
    });

  } catch (error: any) {
    console.error("Error in POST handler:", error);
    return NextResponse.json(
      { error: "Failed to process query", details: error.message },
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
