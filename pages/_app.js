import "../styles/globals.css"
import TopNav from "../components/TopNav"
export default function App({Component,pageProps}){ return (<div className="min-h-screen"><TopNav/><Component {...pageProps}/></div>) }