import Head from "next/head";
import Layout from '@/components/Layout';
import SignUp from '@/components/SignUp';

export default function signup() {
    return (
        <div className="bg-[#161616]">
            <Head>
                <title>Sign Up | Kuku Deals</title>
            </Head>        
            <Layout>
                <SignUp />
            </Layout>
        </div>
    )

}
