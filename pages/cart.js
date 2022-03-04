import Head from "next/head";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router'
import Layout from "@/components/Layout";
import CartPage from "@/components/cart/CartPage";

export default function cart() {
    const { locale } = useRouter()
    return (
        <div className="bg-[#161616] lg:min-h-screen" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
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
