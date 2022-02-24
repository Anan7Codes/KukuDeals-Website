import Head from "next/head";

import Sidebar from "@/components/profile/Sidebar";
import Layout from "@/components/Layout";
import Settings from "@/components/profile/Settings";

export default function settings() {
    return (
        <div className="bg-[#161616]">
            <Head>
                <title>Kuku Deals</title>
            </Head>
            <Layout>
                <Sidebar>
                    <Settings/>
                </Sidebar>
            </Layout>
        </div>
    )
}
