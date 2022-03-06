import Head from "next/head";
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Sidebar from "@/components/profile/Sidebar";
import Layout from "@/components/Layout";
import ShippingAddress from "@/components/profile/ShippingAddress";

export default function settings() {
    const { locale } = useRouter()

    return (
        <div className="bg-[#161616]" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
            <Head>
                <title>Shipping Address | Kuku Deals</title>
                <link rel="icon" href={locale === 'ar' ? "../../icons/icon.png" : "../icons/icon.png"}/>
            </Head>
            <Layout>
                <Sidebar>
                    <ShippingAddress/>
                </Sidebar>
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
