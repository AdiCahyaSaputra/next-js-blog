import Link from "next/link";
import Head from "next/head";
import Script from "next/script";
import Layout from "../../components/layout";

export default function FirstPost() {
  return (
    <Layout>
      
      {
        // Tag head tapi pake Next Js
      }
      
      <Head>
        <title>First Post</title>
      </Head>
      
      <Script // connect script menggunakan next js
      src="https://connect.facebook.net/en_US/sdk.js"
      strategy="lazyOnLoad" // Lazy loading ketika browser lagi gabut aja
      onLoad={ // Ketika berhasil di Load
        () => console.log("Script Berhasil di Load")
      } />
      
      <h1>First Post</h1>
      <h2>
      
        {
          // Routing di Next Js
        }
        
        <Link href="/">
          <a>Back To Home</a>
        </Link>
      </h2>
      
    </Layout>
  )
}