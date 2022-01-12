import Banner from '@/components/Banner'
import Footer from '@/components/Footer'
import Head from 'next/head'
import Image from 'next/image'
import Navbar from '@/components/Navbar'

export default function Home() {
  return (
    <div>
    <Head>
      <title>Kuku Deals The most rewarding shopping experience</title>
      <link rel='icon' href='icons/black-logo-small.png' />
   </Head>
    <Navbar />
    <Banner />
    <Footer />  
  </div>
  
  )
}
