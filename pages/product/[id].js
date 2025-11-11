import { formatPrice } from '../../utils/format'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export async function getStaticPaths(){
  // چندتا آیدی اول برای ساخت اولیه صفحه
  const { data } = await supabase.from('products').select('id').limit(50)
  const paths = (data || []).map(p => ({ params: { id: p.id } }))
  return { paths, fallback: 'blocking' }
}

export async function getStaticProps({ params }){
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', params.id)
    .single()

  if(error || !data) return { notFound: true }

  // نرمال‌سازی داده برای UI
  const product = {
    id: data.id,
    title: data.title,
    image: data.image_url,                 // نام فیلد در DB
    bullets: Array.isArray(data.bullets) ? data.bullets : [],
    price: { value: Number(data.price), currency: data.currency || 'AED' }
  }

  return { props: { p: product }, revalidate: 60 }
}

export default function Product({ p }){
  function addToCart(){
    const cart = JSON.parse(localStorage.getItem('cart')||'[]')
    const found = cart.find(x=>x.id===p.id)
    if(found) found.qty += 1
    else cart.push({ id:p.id, title:p.title, price:p.price, image:p.image, qty:1 })
    localStorage.setItem('cart', JSON.stringify(cart))
    alert('Added to cart')
  }

  return (
    <main className="pt-16 pb-28 max-w-md mx-auto px-4">
      <div className="aspect-video rounded-md overflow-hidden bg-gray-100 mt-2">
        <img src={p.image} alt={p.title} className="w-full h-full object-cover"/>
      </div>
      <h1 className="mt-3 text-lg font-semibold">{p.title}</h1>
      <div className="text-xl font-bold mt-1">{formatPrice(p.price)}</div>
      <ul className="mt-3 list-disc pl-5 text-sm space-y-1">
        {p.bullets.map((b,i)=>(<li key={i}>{b}</li>))}
      </ul>
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-md">
        <button onClick={addToCart} className="retro-btn w-full py-3 rounded-xl">Add to cart</button>
      </div>
    </main>
  )
}
