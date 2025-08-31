import './index.css'

import { GoogleGenAI } from '@google/genai'
import cosineSimilarity from 'compute-cosine-similarity'

import * as React from 'react'
import { Label } from '@/components/ui/label.tsx'
import { Button } from '@/components/ui/button.tsx'
import { Textarea } from '@/components/ui/textarea.tsx'

export function App() {
  const [fstText, setFstText] = React.useState<string>('')
  const [sndText, setSndText] = React.useState<string>('')
  const [similarity, setSimilarity] = React.useState<string>()

  async function getSimilarity() {
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
  }

  return (
    <div className="mx-auto p-8 text-center relative z-10 min-w-[720px]">
      <div className="flex flex-col gap-4 text-left">
        <div>
          <Label htmlFor="fst" className="">First sentence/word</Label>
          <Textarea id="fst" value={fstText} onChange={(e) => setFstText(e.target.value)} />
        </div>

        <div>
          <Label htmlFor="snd">First sentence/word </Label>
          <Textarea id="snd" value={sndText} onChange={(e) => setSndText(e.target.value)} />
        </div>
        <Button disabled={!fstText || !sndText} onClick={getSimilarity}>How similar?</Button>
        <div>
          <h2 className="text-2xl font-semibold">Result</h2>
          <p>
            Your input is similar by {similarity}
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
