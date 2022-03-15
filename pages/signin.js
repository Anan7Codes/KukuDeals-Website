import Head from "next/head";
import Layout from '@/components/Layout';
import SignIn from '@/components/SignIn';
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function Signin() {
    const { locale } = useRouter()
    return (
        <div className="bg-[#161616]" dir={locale === 'ar' ? 'rtl' : 'ltr'}> 
            <Head>
                <title>Sign In | Kuku Deals</title>
                <link rel="icon" href={locale === 'ar' ? "./icons/icon.png" : "../icons/icon.png"}/>
            </Head>       
            <Layout>
                <SignIn />
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
  
