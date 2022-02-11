import Head from "next/head";
import Layout from "@/components/Layout";
import CartItem from "@/components/cart/CartItem";
import { CartState } from "@/contexts/cart/CartContext";

export default function cart() {
  

    return (
        <div className="bg-gray-100">
            <Head>
                <title>Kuku Deals</title>
            </Head>
            <Layout>
                <CartItem />
            </Layout>
        </div>
    )
}
