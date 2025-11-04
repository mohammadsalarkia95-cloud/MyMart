import '../styles/globals.css'
import TopNav from '../components/TopNav'
import Head from 'next/head'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* PWA */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2B7A78" />

        {/* Icon (PNG هم قبول است) */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" href="/logo.png" />

        {/* Meta پایه */}
        <meta name="application-name" content="MyMart" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </Head>

      <div className="min-h-screen">
        <TopNav />
        <Component {...pageProps} />
      </div>
    </>
  )
}
