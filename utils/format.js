export function formatPrice(price){
  if(!price || typeof price!=="object") return "-"
  const v=Number(price.value)
  return `${price.currency?price.currency+" ":""}${Number.isNaN(v)?price.value:String(v.toFixed(2))}`
}