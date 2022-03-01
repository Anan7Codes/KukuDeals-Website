import Head from "next/head";

import Sidebar from "@/components/profile/Sidebar";
import Layout from "@/components/Layout";
import ChangePassword from "@/components/profile/ChangePassword";

export default function changepasswordpage() {
    return (
        <div className="bg-[#161616]">
            <Head>
                <title>Change Password | Kuku Deals</title>
                <link rel="icon" href="../icons/icon.png" />
            </Head>
            <Layout>
                <Sidebar>
                    <ChangePassword/>
                </Sidebar>
            </Layout>
        </div>
    )
}
