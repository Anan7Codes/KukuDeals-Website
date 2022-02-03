import Head from "next/head";

import Sidebar from "@/components/profile/Sidebar";
import Layout from "@/components/Layout";
import ShippingAddress from "@/components/profile/ShippingAddress";

export default function settings() {
    return (
        <div className="bg-gray-100">
            <Head>
                <title>Kuku Deals</title>
            </Head>
            <Layout>
                <Sidebar>
                    <ShippingAddress/>
                </Sidebar>
            </Layout>
        </div>
    )
}
