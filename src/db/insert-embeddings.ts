import { SupabaseClient } from './constants.ts'

export async function insertEmbeddings(text: string, embeddings: number[], id: number) {
  try {
    await SupabaseClient
      .from('users_embeddings')
      .insert({
        user_id: id,
        content: text,
        embedding: embeddings
      })
  } catch (e: any) {
    console.log(e.message)
  }
}