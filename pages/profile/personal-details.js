import Head from "next/head";
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Sidebar from "@/components/profile/Sidebar";
import Layout from "@/components/Layout";
import PersonalDetails from '@/components/profile/PersonalDetails'

export default function Personaldetails() {
    const { locale } = useRouter()
    return (
        <div className="bg-[#161616]" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
            <Head>
                <title>Personal Details | Kuku Deals</title>
                <link rel="icon" href={locale === 'ar' ? "../../icons/icon.png" : "../icons/icon.png"}/>
            </Head>
            <Layout>
                <Sidebar>
                    <PersonalDetails/>
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