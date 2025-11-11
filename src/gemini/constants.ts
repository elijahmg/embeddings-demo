import { GoogleGenAI } from '@google/genai'

export const GemAI = new GoogleGenAI({ apiKey: process.env.BUN_PUBLIC_AI_TOKEN });