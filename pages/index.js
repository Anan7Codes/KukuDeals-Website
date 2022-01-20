import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import Section1 from "@/components/Section1";
import Section2 from "@/components/Section2";
import Section3 from "@/components/Section3";
import Section4 from "@/components/Section4";
import Section5 from "@/components/Section5";
import CartButton from "@/components/CartButton";

export default function Home() {
  return (
    <div>
      <Head></Head>
      <body className="bg-gray-100 px-5 mt-4 overflow-x-hidden">
        <Navbar />
        <CartButton />
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
