import Head from "next/head";
import Layout from "@/components/Layout";
import CartItem from "@/components/cart/CartItem";
import { CartState } from "@/contexts/cart/CartContext";
import CartPage from "@/components/cart/CartPage";

export default function cart() {

    const { state: { cart } } = CartState();
    const { dispatch } = CartState();
    return (
        <div className="bg-gray-100">
            <Head>
                <title>Kuku Deals</title>
            </Head>
            <Layout>
                <CartPage />
            </Layout>
        </div>
    )
}
