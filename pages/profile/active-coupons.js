import Head from "next/head";

import Sidebar from "@/components/profile/Sidebar";
import Layout from "@/components/Layout";
import ActiveCoupons from "@/components/profile/ActiveCoupons";

export default function activecoupons() {
    return (
        <div className="bg-[#161616]">
            <Head>
                <title>Active Coupons | Kuku Deals</title>
                <link rel="icon" href="../icons/icon.png" />
            </Head>
            <Layout>
                <Sidebar>
                    <ActiveCoupons/>
                </Sidebar>
            </Layout>
        </div>
    )
}
