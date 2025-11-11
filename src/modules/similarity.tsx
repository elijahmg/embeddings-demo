import { Button } from '@/components/ui/button.tsx'
import { Input } from '@/components/ui/input.tsx'
import * as React from 'react'
import { GoogleGenAI } from '@google/genai'
import cosineSimilarity from 'compute-cosine-similarity'

export function Similarity() {
  const [fstText, setFstText] = React.useState<string>('')
  const [sndText, setSndText] = React.useState<string>('')
  const [similarity, setSimilarity] = React.useState<string>()

  const [loading, setLoading] = React.useState(false)

  async function getSimilarity() {
    setLoading(true)
    const ai = new GoogleGenAI({
      apiKey: process.env.BUN_PUBLIC_AI_TOKEN
    })

    const texts = [fstText, sndText]

    const response = await ai.models.embedContent({
      model: 'gemini-embedding-001',
      contents: texts
    })

    const embeddings = response.embeddings.map(e => e.values)

    const similarity = cosineSimilarity(embeddings[0], embeddings[1])

    setSimilarity(similarity.toFixed(4))
    setLoading(false)
  }

  return (
    <div className="flex flex-col justify-between h-full gap-4 mb-4">
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold">Find out how similar text is</h2>
        <Input
          id="fst"
          value={fstText}
          onChange={(e) => setFstText(e.target.value)}
          placeholder="First sentence/word"
        />

        <Input
          id="snd"
          value={sndText}
          onChange={(e) => setSndText(e.target.value)}
          placeholder="Second sentence/word"
        />
        <div>
          <h2 className="text-2xl font-semibold">Result</h2>
          <p>
            Your input is similar by {similarity}
          </p>
        </div>
      </div>
      <Button disabled={!fstText || !sndText || loading} onClick={getSimilarity}>How similar?</Button>
    </div>
  )
}