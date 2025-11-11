import { useEffect, useRef, useState } from "react"
import ProductCard from "../components/ProductCard"
import { supabase } from "../lib/supabase" // اگر هنوز از mock استفاده می‌کنی، این خط و تابع fetch را تغییر بده

async function fetchProducts(q = "", { minPrice, maxPrice } = {}) {
  // اگر هنوز Supabase را فعال نکرده‌ای، می‌توانی به‌جای این تابع از نسخه mock قبلی استفاده کنی.
  let query = supabase.from("products").select("*")
  if (q) query = query.ilike("title", `%${q}%`)
  if (minPrice != null && minPrice !== "") query = query.gte("price", Number(minPrice))
  if (maxPrice != null && maxPrice !== "") query = query.lte("price", Number(maxPrice))
  const { data, error } = await query.limit(60)
  if (error) { console.error(error); return [] }
  return data || []
}

export default function Search(){
  const [q, setQ] = useState("")
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")
  const [items, setItems] = useState([])
  const inputRef = useRef(null)

  useEffect(()=>{ inputRef.current?.focus() },[])
  useEffect(()=>{
    const t = setTimeout(async ()=>{
      const r = await fetchProducts(q, { minPrice, maxPrice })
      setItems(r)
    }, 250)
    return ()=> clearTimeout(t)
  }, [q, minPrice, maxPrice])

  return (
    <main className="pt-16 pb-20 max-w-md mx-auto px-4">
      <div className="bg-white retro-card rounded-xl p-3 sticky top-14 z-10">
        <input
          ref={inputRef}
          value={q}
          onChange={e=>setQ(e.target.value)}
          placeholder="Search beauty products..."
          className="w-full outline-none p-2"
        />
        <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
          <input value={minPrice} onChange={e=>setMinPrice(e.target.value)} placeholder="Min price" className="p-2 rounded border"/>
          <input value={maxPrice} onChange={e=>setMaxPrice(e.target.value)} placeholder="Max price" className="p-2 rounded border"/>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-3">
        {items.map(it => <ProductCard key={it.id} product={{
          id: it.id,
          title: it.title,
          image: it.image_url || it.image,  // پشتیبانی از هر دو
          price: { value: it.price, currency: it.currency || "AED" }
        }} />)}
      </div>
    </main>
  )
}
