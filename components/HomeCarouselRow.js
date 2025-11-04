import ProductCard from "./ProductCard"
export default function HomeCarouselRow({title,items=[]}){
  return (<section className="mt-4">
    <h3 className="text-sm font-medium mb-2">{title}</h3>
    <div className="grid grid-cols-3 gap-3">{items.map(it=>(<ProductCard key={it.id} product={it}/>))}</div>
  </section>)
}