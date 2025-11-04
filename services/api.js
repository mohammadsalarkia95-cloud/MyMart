import { BEAUTY } from "../data/beauty"
export async function fetchHomeSections(){return {suggestions:BEAUTY.slice(0,9),hotPicks:BEAUTY.slice(3,9),related:BEAUTY.slice(1,7)}}
export async function searchProducts(q="",{minPrice,maxPrice}={}){const t=q.toLowerCase();let items=BEAUTY.filter(p=>p.title.toLowerCase().includes(t)); if(minPrice!=null) items=items.filter(p=>p.price.value>=Number(minPrice)); if(maxPrice!=null) items=items.filter(p=>p.price.value<=Number(maxPrice)); return {items,total:items.length}}
export async function getProduct(id){return BEAUTY.find(p=>p.id===id)}