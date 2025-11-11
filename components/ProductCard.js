import Link from 'next/link'
import { formatPrice } from '../utils/format'

export default function ProductCard({ product, compact=false }){
  // سازگاری با هر دو مدل داده:
  const id = product.id
  const title = product.title
  const image = product.image || product.image_url
  const priceObj = (product.price && typeof product.price === 'object')
    ? product.price
    : { value: product.price, currency: product.currency || 'AED' }

  return (
    <Link href={`/product/${id}`} legacyBehavior>
      <a className="block bg-white retro-card rounded-lg p-2">
        <div className="aspect-square overflow-hidden rounded-md bg-gray-100">
          <img src={image} alt={title} className="w-full h-full object-cover"/>
        </div>
        <div className="mt-2 text-xs leading-tight h-12 overflow-hidden">{title}</div>
        <div className="mt-1 text-sm font-semibold">{formatPrice(priceObj)}</div>
      </a>
    </Link>
  )
}
