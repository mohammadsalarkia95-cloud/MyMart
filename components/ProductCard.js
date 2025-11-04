import Link from "next/link"; import { formatPrice } from "../utils/format"
export default function ProductCard({product}){
  return (<Link href={`/product/${product.id}`} legacyBehavior>
    <a className="block bg-white retro-card rounded-lg p-2">
      <div className="aspect-square overflow-hidden rounded-md bg-gray-100"><img src={product.image} alt={product.title} className="w-full h-full object-cover"/></div>
      <div className="mt-2 text-xs leading-tight h-12 overflow-hidden">{product.title}</div>
      <div className="mt-1 text-sm font-semibold">{formatPrice(product.price)}</div>
    </a>
  </Link>)
}