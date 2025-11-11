import './index.css'

import * as React from 'react'
import { Similarity } from '@/modules/similarity.tsx'
import { useEffect } from 'react'
import { SupabaseClient } from '@/db/constants.ts'
import { Input } from '@/components/ui/input.tsx'
import { Button } from '@/components/ui/button.tsx'
import { embed } from '@/gemini/embed.ts'
import { insertEmbeddings } from '@/db/insert-embeddings.ts'
import { getDataByQuery } from '@/db/get-data-by-query.ts'

interface User {
  name: string,
  email: string,
}

interface Users {
  user_id: number;
  users: User;
}

export function App() {
  const [name, setName] = React.useState<string>('')
  const [email, setEmail] = React.useState<string>('')

  const [loading, setLoading] = React.useState<boolean>(false)

  const [id, setId] = React.useState<string>('')
  const [content, setContent] = React.useState<string>('')

  const [availalbleUsers, setAvailalbleUsers] = React.useState<{ id: number, name: string }[]>([])

  const [searchTerm, setSearchTerm] = React.useState<string>('')

  const [searchResults, setSearchResults] = React.useState<Users[]>([])

  useEffect(() => {
    SupabaseClient
      .from('users').select('*').limit(10).then(({ data }) => {
      setAvailalbleUsers(data.map(d => ({ id: d.id, name: d.name })))
    })
  }, [])

  async function submitUser() {
    if (!name || !email) return

    setLoading(true)

    try {
      await SupabaseClient
        .from('users')
        .insert({
          name,
          email
        })
    } catch (e: any) {
      console.log(e)
    }

    setLoading(false)
  }

  async function embedData() {
    if (!content || !id) return

    setLoading(true)

    const { embeddings } = await embed(content)

    await insertEmbeddings(
      content,
      embeddings[0].values,
      Number(id)
    )

    setLoading(false)
  }

  async function search() {
    setLoading(true)

    setSearchResults([])

    const { embeddings } = await embed(searchTerm)

    const res = await getDataByQuery(embeddings[0].values)

    setSearchResults(res as unknown as Users[])

    setLoading(false)
  }


  return (
    <div className="mx-auto p-8 text-center relative z-10 min-w-[1024px] grid grid-cols-2 gap-4 grid-rows-2">
      <Similarity />

      <div className="flex flex-col justify-between h-full gap-4 mb-4">
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold">Let's create a user</h2>
          <Input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          {availalbleUsers.map(u => <div key={u.id}>ID: {u.id} Name:{u.name}</div>)}
        </div>
        <Button disabled={loading} onClick={submitUser}>Submit</Button>
      </div>

      <div className="flex flex-col justify-between h-full gap-4 mb-4">
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold">Let's create embeddings</h2>
          <Input type="text" placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} />
          <Input type="email" placeholder="User ID" value={id} onChange={(e) => setId(e.target.value)} />
        </div>
        <Button disabled={loading} onClick={embedData}>Create embeddings</Button>
      </div>

      <div className="flex flex-col justify-between h-full gap-4 mb-4">
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold">Let's search</h2>
          <Input type="text" placeholder="Search term" value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)} />
          {searchResults.map(r => <div key={r.user_id}>Name: {r.users.name}, Email: {r.users.email}</div>)}
        </div>
        <Button disabled={loading} onClick={search}>Search</Button>
      </div>
    </div>
  )
}

export default App
