import Head from "next/head"
import BottomSearchBar from "../components/BottomSearchBar"
import HomeCarouselRow from "../components/HomeCarouselRow"
import { supabase } from "../lib/supabase"

export async function getStaticProps(){
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .limit(30)

  // ساب‌ست‌ها (مثل پیشنهادات، hot picks)
  const suggestions = products?.slice(0, 9) || []
  const hotPicks   = products?.slice(3, 12) || []
  const related    = products?.slice(1, 10) || []

  return { props: { rows: { suggestions, hotPicks, related } }, revalidate: 60 }
}

export default function Home({ rows }){
  return (
    <main className="pt-16 pb-32 max-w-md mx-auto px-4">
      <Head><title>MyMart — Beauty & Personal Care</title></Head>
      <HomeCarouselRow title="Amazon Suggestions" items={rows.suggestions}/>
      <HomeCarouselRow title="Hot Picks" items={rows.hotPicks}/>
      <HomeCarouselRow title="Related to you" items={rows.related}/>
      <BottomSearchBar/>
    </main>
  )
}