import { supabase } from "../../lib/supabase"
import { formatPrice } from "../../utils/format"

export async function getStaticPaths(){
  const { data } = await supabase.from('products').select('id').limit(100)
  const paths = (data||[]).map(p => ({ params: { id: p.id } }))
  return { paths, fallback: 'blocking' }
}

export async function getStaticProps({ params }){
  const { data } = await supabase.from('products').select('*').eq('id', params.id).single()
  if(!data) return { notFound: true }
  return { props: { p: data }, revalidate: 60 }
}

export default function Product({ p }){
  // همان JSX فعلی — فقط فیلدها از p می‌آیند (title, price, image_url, bullets, ...)
  // قیمت: {formatPrice({ value: p.price, currency: p.currency })}
}
