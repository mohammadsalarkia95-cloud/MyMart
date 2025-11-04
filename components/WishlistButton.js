import { useEffect, useState } from "react"
export default function WishlistButton({id}){
  const [saved,setSaved]=useState(false)
  useEffect(()=>{try{const s=JSON.parse(localStorage.getItem("wishlist")||"[]"); setSaved(s.includes(id))}catch{}},[id])
  function toggle(){const s=JSON.parse(localStorage.getItem("wishlist")||"[]"); if(saved){const next=s.filter(x=>x!==id); localStorage.setItem("wishlist",JSON.stringify(next)); setSaved(false)} else {s.push(id); localStorage.setItem("wishlist",JSON.stringify(s)); setSaved(true)}}
  return (<button onClick={toggle} className="absolute left-3 top-3 bg-white/90 px-3 py-1 rounded-full text-sm">{saved?"♥":"♡"}</button>)
}
