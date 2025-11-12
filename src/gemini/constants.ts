import { GoogleGenAI } from '@google/genai'

const apiKey = process.env.BUN_PUBLIC_AI_TOKEN;

if (!apiKey) {
  throw new Error('Missing required environment variable: BUN_PUBLIC_AI_TOKEN');
}

export const GemAI = new GoogleGenAI({ apiKey });
