import Head from "next/head";

import Sidebar from "@/components/profile/Sidebar";
import Layout from "@/components/Layout";
import Settings from "@/components/profile/Settings";

export default function settings() {
    return (
        <div className="bg-[#161616]">
            <Head>
                <title>Change Password | Kuku Deals</title>
                <link rel="icon" href="../icons/icon.png" />
            </Head>
            <Layout>
                <Sidebar>
                    <Settings/>
                </Sidebar>
            </Layout>
        </div>
    )
}
