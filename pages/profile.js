import Head from "next/head";

import Profile from '@/components/profile/Profile'
import Layout from "@/components/Layout";

export default function profile() {
    return (
        <div className="bg-gray-100">
            <Head>
                <title>Kuku Deals</title>
            </Head>
            <Layout>
                <Profile/>
            </Layout>
        </div>
    )
}
