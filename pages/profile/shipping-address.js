import Head from "next/head";

import Sidebar from "@/components/profile/Sidebar";
import Layout from "@/components/Layout";
import ShippingAddress from "@/components/profile/ShippingAddress";

export default function settings() {
    return (
        <div className="bg-[#161616]">
            <Head>
                <title>Shipping Address | Kuku Deals</title>
                <link rel="icon" href="../icons/icon.png" />
            </Head>
            <Layout>
                <Sidebar>
                    <ShippingAddress/>
                </Sidebar>
            </Layout>
        </div>
    )
}
