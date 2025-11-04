import { BEAUTY } from '../../data/beauty'
import { formatPrice } from '../../utils/format'

export async function getStaticPaths() {
  return {
    paths: BEAUTY.map(p => ({ params: { id: p.id } })), // b1, b2, ...
    fallback: 'blocking', // اگر محصول جدید اضافه شد، همزمان ساخته می‌شود
  }
}

export async function getStaticProps({ params }) {
  const p = BEAUTY.find(x => x.id === params.id) || null
  if (!p) return { notFound: true }
  return { props: { p } }
}

export default function Product({ p }) {
  function addToCart() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    const f = cart.find(x => x.id === p.id)
    if (f) f.qty += 1
    else cart.push({ id: p.id, title: p.title, price: p.price, image: p.image, qty: 1 })
    localStorage.setItem('cart', JSON.stringify(cart))
    alert('Added to cart')
  }

  return (
    <main className="pt-16 pb-28 max-w-md mx-auto px-4">
      <div className="aspect-video rounded-md overflow-hidden bg-gray-100 mt-2">
        <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
      </div>
      <h1 className="mt-3 text-lg font-semibold">{p.title}</h1>
      <div className="text-xl font-bold mt-1">{formatPrice(p.price)}</div>
      <ul className="mt-3 list-disc pl-5 text-sm space-y-1">
        {p.bullets?.map((b, i) => <li key={i}>{b}</li>)}
      </ul>
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-md">
        <button onClick={addToCart} className="retro-btn w-full py-3 rounded-xl">Add to cart</button>
      </div>
    </main>
  )
}
