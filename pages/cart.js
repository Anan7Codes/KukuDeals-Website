import Head from "next/head";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from "@/components/Layout";
import CartPage from "@/components/cart/CartPage";

export default function cart() {

    return (
        <div className="bg-[#161616] lg:min-h-screen">
            <Head>
                <title>Cart | Kuku Deals</title>
            </Head>
            <Layout>
                <CartPage />
            </Layout>
        </div>
    )
}

export async function getStaticProps({ locale }) {
    return {
      props: {
        ...(await serverSideTranslations(locale, ['common']))
      }
    }
}
