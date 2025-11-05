import { supabase } from "../lib/supabase"

async function searchProducts(q, {minPrice, maxPrice}={}){
  let query = supabase.from('products').select('*')
  if(q) query = query.ilike('title', `%${q}%`)
  if(minPrice != null) query = query.gte('price', Number(minPrice))
  if(maxPrice != null) query = query.lte('price', Number(maxPrice))
  const { data } = await query.limit(60)
  return data||[]
}
