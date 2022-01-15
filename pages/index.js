import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import Section1 from "@/components/Section1";
import Section2 from "@/components/Section2";
import Section3 from "@/components/Section3";
import Section4 from "@/components/Section4";
import Section5 from "@/components/Section5";


export default function Home() {
  return (
    <div>
      <Head>
        <title>Kuku Deals The most rewarding shopping experience</title>
        <link rel="icon" href="icons/black-logo-small.png" />
      </Head>
      <body className="bg-gray-100 px-8 mt-4 overflow-x-hidden">
        <Navbar />
        <Banner />
        <Section1 />
        <Section2 />
        <Section3 />
        <Section4 />
        <Section5 />
        <Footer />
    
      </body>
    </div>
  );
}
