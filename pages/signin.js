import Head from "next/head";
import Layout from '@/components/Layout';
import SignIn from '@/components/SignIn';

export default function signin() {
    return (
        <div className="bg-[#161616]"> 
            <Head>
                <title>Sign In | Kuku Deals</title>
            </Head>       
            <Layout>
                <SignIn />
            </Layout>
        </div>
    )

}
