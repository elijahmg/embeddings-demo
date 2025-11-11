import { GemAI } from './constants.ts'

// 768 dimension
export async function embed(text: string) {
  const response = await GemAI.models.embedContent({
    model: 'text-embedding-004',
    contents: text,
    config: {
      taskType: "SEMANTIC_SIMILARITY",
    }
  });

  return {
    metadata: response.metadata,
    embeddings: response.embeddings
  }
}