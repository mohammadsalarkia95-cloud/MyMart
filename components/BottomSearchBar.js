import { useRouter } from "next/router"
export default function BottomSearchBar(){
  const router=useRouter()
  return (<div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-md">
    <button onClick={()=>router.push("/search")} className="w-full bg-white retro-card rounded-xl px-4 py-3 flex items-center gap-3">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      <span className="text-sm">Search products…</span>
    </button>
  </div>)
}