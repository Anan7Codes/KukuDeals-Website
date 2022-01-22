import Head from "next/head";
import Layout from "@/components/Layout";
import Cart from "@/components/cart/Cart";

export default function cart() {
    return (
        <div className="bg-gray-100">
            <Head>
                <title>Kuku Deals</title>
            </Head>
            <Layout>
                <Cart/>
            </Layout>
        </div>
    )
}
