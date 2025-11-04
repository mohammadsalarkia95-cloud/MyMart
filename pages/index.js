import Head from "next/head"
import BottomSearchBar from "../components/BottomSearchBar"
import HomeCarouselRow from "../components/HomeCarouselRow"
import { fetchHomeSections } from "../services/api"
export async function getStaticProps(){ const rows=await fetchHomeSections(); return { props:{ rows } } }
export default function Home({rows}){
  return (<main className="pt-16 pb-32 max-w-md mx-auto px-4">
    <Head><title>MyMart — Beauty & Personal Care</title></Head>
    <HomeCarouselRow title="Amazon Suggestions" items={rows.suggestions}/>
    <HomeCarouselRow title="Hot Picks" items={rows.hotPicks}/>
    <HomeCarouselRow title="Related to you" items={rows.related}/>
    <BottomSearchBar/>
  </main>)
}