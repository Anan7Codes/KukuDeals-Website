import Head from "next/head";

import Sidebar from "@/components/profile/Sidebar";
import Layout from "@/components/Layout";
import PersonalDetails from '@/components/profile/PersonalDetails'

export default function personaldetails() {
    return (
        <div className="bg-[#161616]">
            <Head>
                <title>Kuku Deals</title>
            </Head>
            <Layout>
                <Sidebar>
                    <PersonalDetails/>
                </Sidebar>
            </Layout>
        </div>
    )
}
