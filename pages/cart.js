import { useEffect, useState } from "react"
import { formatPrice } from "../utils/format"
export default function Cart(){
  const [cart,setCart]=useState([]),[profile,setProfile]=useState(null)
  useEffect(()=>{ setCart(JSON.parse(localStorage.getItem("cart")||"[]")); setProfile(JSON.parse(localStorage.getItem("profile")||"null")) },[])
  function placeOrder(){ if(!profile||!profile.firstName||!profile.phone){ alert("Please complete your details before placing the order."); return } alert("Order placed (mock)."); localStorage.removeItem("cart"); setCart([]) }
  return (<main className="pt-16 pb-28 max-w-md mx-auto px-4">
    <div className="bg-white retro-card p-4 rounded-lg">
      {profile ? (<div className="flex items-center justify-between"><div><div className="font-medium">{profile.firstName} {profile.lastName}</div><div className="text-xs">{profile.phone}</div></div><button onClick={()=>location.href="/profile"} className="text-sm underline">Edit</button></div>)
               : (<div><div className="font-medium">Not logged in</div><button onClick={()=>location.href="/profile"} className="mt-2 text-sm underline">Register / Login</button></div>)}
    </div>
    <div className="mt-4 space-y-3">
      {cart.map((it,idx)=>(
        <div key={idx} className="flex items-center gap-3 bg-white retro-card p-2 rounded-lg">
          <div className="w-14 h-14 bg-gray-100 rounded overflow-hidden"><img src={it.image} className="w-full h-full object-cover"/></div>
          <div className="flex-1"><div className="text-sm font-medium overflow-hidden" style={{display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical"}}>{it.title}</div><div className="text-xs">Qty: {it.qty}</div></div>
          <div className="font-semibold">{formatPrice(it.price)}</div>
        </div>
      ))}
      {cart.length===0 && <div className="text-sm opacity-70">Your cart is empty.</div>}
    </div>
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-md"><button onClick={placeOrder} className="retro-btn w-full py-3 rounded-xl">Place Order</button></div>
  </main>)
}