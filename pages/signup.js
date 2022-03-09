import Head from "next/head";
import Layout from '@/components/Layout';
import SignUp from '@/components/SignUp';
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function Signup() {
    const { locale } = useRouter()
    return (
        <div className="bg-[#161616]" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
            <Head>
                <title>Sign Up | Kuku Deals</title>
                <link rel="icon" href={locale === 'ar' ? "./icons/icon.png" : "../icons/icon.png"}/>
            </Head>        
            <Layout>
                <SignUp />
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
