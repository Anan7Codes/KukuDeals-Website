import Head from "next/head";

import Sidebar from "@/components/profile/Sidebar";
import Layout from "@/components/Layout";
import ActiveCoupons from "@/components/profile/ActiveCoupons";

export default function activecoupons() {
    return (
        <div className="bg-gray-100">
            <Head>
                <title>Kuku Deals</title>
            </Head>
            <Layout>
                <Sidebar>
                    <ActiveCoupons/>
                </Sidebar>
            </Layout>
        </div>
    )
}
