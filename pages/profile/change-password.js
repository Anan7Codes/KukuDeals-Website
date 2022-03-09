import Head from "next/head";
import { useRouter } from 'next/router'
import Sidebar from "@/components/profile/Sidebar";
import Layout from "@/components/Layout";
import ChangePassword from "@/components/profile/ChangePassword";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function Changepasswordpage() {
    const { locale } = useRouter()
    return (
        <div className="bg-[#161616]" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
            <Head>
                <title>Change Password | Kuku Deals</title>
                <link rel="icon" href={locale === 'ar' ? "../../icons/icon.png" : "../icons/icon.png"}/>
            </Head>
            <Layout>
                <Sidebar>
                    <ChangePassword/>
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
