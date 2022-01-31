import Head from "next/head";

import Layout from "@/components/Layout";
import Banner from "@/components/home/Banner";
import Section1 from "@/components/home/Section1";
import Section2 from "@/components/home/Section2";
import Section3 from "@/components/home/Section3";
import Section4 from "@/components/home/Section4";
import Section5 from "@/components/home/Section5";
import CartButton from "@/components/cart/CartButton";

export default function Home() {
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Kuku Deals</title>
      </Head>
      <Layout>
        <Banner />
        {/* <Section1 /> */}
        <Section2 />
        <Section3 />
        <Section4 />
        <Section5 />
        <CartButton />
      </Layout>
    </div>
  );
}
