import { useEffect, useRef, useState } from "react"
import { searchProducts } from "../services/api"
import ProductCard from "../components/ProductCard"
export default function Search(){
  const [q,setQ]=useState(""),[minPrice,setMin]=useState(""),[maxPrice,setMax]=useState(""),[items,setItems]=useState([])
  const inputRef=useRef(null)
  useEffect(()=>{inputRef.current?.focus()},[])
  useEffect(()=>{const t=setTimeout(()=>{searchProducts(q,{minPrice:minPrice||undefined,maxPrice:maxPrice||undefined}).then(r=>setItems(r.items))},250); return()=>clearTimeout(t)},[q,minPrice,maxPrice])
  return (<main className="pt-16 pb-20 max-w-md mx-auto px-4">
    <div className="bg-white retro-card rounded-xl p-3 sticky top-14 z-10">
      <input ref={inputRef} value={q} onChange={e=>setQ(e.target.value)} placeholder="Search beauty products..." className="w-full outline-none p-2"/>
      <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
        <input value={minPrice} onChange={e=>setMin(e.target.value)} placeholder="Min price" className="p-2 rounded border"/>
        <input value={maxPrice} onChange={e=>setMax(e.target.value)} placeholder="Max price" className="p-2 rounded border"/>
      </div>
    </div>
    <div className="mt-4 grid grid-cols-3 gap-3">{items.map(it=><ProductCard key={it.id} product={it}/>)}</div>
  </main>)
}