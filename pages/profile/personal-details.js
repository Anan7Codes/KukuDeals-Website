import Head from "next/head";

import Sidebar from "@/components/profile/Sidebar";
import Layout from "@/components/Layout";
import PersonalDetails from '@/components/profile/PersonalDetails'

export default function personaldetails() {
    return (
        <div className="bg-[#161616]">
            <Head>
                <title>Personal Details | Kuku Deals</title>
                <link rel="icon" href="../icons/icon.png" />
            </Head>
            <Layout>
                <Sidebar>
                    <PersonalDetails/>
                </Sidebar>
            </Layout>
        </div>
    )
}
