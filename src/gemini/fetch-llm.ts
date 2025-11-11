import { GemAI } from './constants.ts'

export async function fetchLLM(prompt: string, extender?: string) {
  const response = await GemAI.models.generateContent({
    model: 'gemini-2.0-flash',
    contents: prompt,
    config: {
      systemInstruction: {
        parts: [
          {
            text: `
        You're an AI assistant who answers questions about services.

        You're a chat bot, so keep your replies succinct.

        You're only allowed to use the provided information below to answer the question.

        If the question isn't related to these provided information, say:
        "Sorry, I couldn't find any information on that."

        Do not go off topic.

        Information to use in the answer: ${extender}
            `
          }
        ]
      }
    }
  })


  return response.text
}