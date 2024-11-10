import { Document } from "@langchain/core/documents";
import { OpenAIEmbeddings } from "@langchain/openai";
import { PineconeStore } from "@langchain/pinecone";
import { Pinecone } from "@pinecone-database/pinecone";

const OPENAI_API_KEY = process.env.OPEN_AI_API_KEY || "";

export const storeVectorInIndex = async ({
  docs,
}: {
  docs: Document<Record<string, unknown>>[];
}): Promise<string> => {
  const PINECONE_API_KEY = process.env.PINECONE_API_KEY || "";

  if (!PINECONE_API_KEY) {
    throw new Error("Something went wrong! Developers has been notified");
  }

  const pinecone = new Pinecone({
    apiKey: PINECONE_API_KEY,
  });

  const index = pinecone.Index("ellaai");

  if (!index) {
    throw new Error("Pinecone index not found");
  }

  const embeddings = new OpenAIEmbeddings({
    apiKey: OPENAI_API_KEY,
  });

  const vectors = await embeddings.embedDocuments(
    docs.map((doc) => doc.pageContent)
  );

  const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
    // @ts-expect-error,weird error dont understand
    pineconeIndex: index,
  });

  const vectorIds = await vectorStore.addVectors(vectors, docs);

  return vectorIds[0];
};
