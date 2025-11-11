import { SupabaseClient } from './constants.ts'

export async function getDataByQuery(embedding: number[]) {
  const {data, error} = await SupabaseClient
    .rpc('match_users_embeddings', {
      embedding,
      match_threshold: 0.7,
    })
    .select('user_id, users (name, email)')
    .limit(10);

  const uniqMap = new Map<number, any>();

  for (const all of data) {
    uniqMap.set(all.user_id, all)
  }

  if (error) {
    throw new Error(error.message)
  }

  return Array.from(uniqMap.values());
}