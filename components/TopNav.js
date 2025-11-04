import Link from "next/link"
export default function TopNav(){
  return (<header className="fixed top-0 left-0 right-0 z-30 backdrop-blur bg-white/70 border-b border-white/20">
    <nav className="max-w-md mx-auto px-4 py-2 flex items-center justify-between">
      <Link href="/" legacyBehavior><a className="flex items-center gap-3"><div className="w-9 h-9 rounded-lg bg-[color:var(--accent)] text-white flex items-center justify-center font-bold">M</div><span className="text-sm font-semibold">MyMart</span></a></Link>
      <div className="flex items-center gap-3">
        <Link href="/cart" legacyBehavior><a className="px-3 py-1 rounded-md hover:bg-white/30">Cart</a></Link>
        <Link href="/profile" legacyBehavior><a className="px-3 py-1 rounded-md hover:bg-white/30">Account</a></Link>
      </div>
    </nav>
  </header>)
}