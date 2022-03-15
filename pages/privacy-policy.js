import Layout from '@/components/Layout'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from "next-i18next"

export default function PrivacyPolicy() {
    const { t } = useTranslation()
    const { locale } = useRouter()

    return (
        <div className="bg-[#161616]" dir={locale === 'ar' ? 'rtl' : 'ltr'}> 
        <Head>
          <title>Privacy Policy | Kuku Deals</title>
          <link rel="icon" href={locale === 'ar' ? "../../icons/icon.png" : "../icons/icon.png"}/>
        </Head>
        <Layout>
            <div className="text-white">
              <p className="text-[2.5rem] text-[#ffd601] my-3 font-bold font-title">{t('privacy-policy')}</p>
              <div className="lg:pl-8 tracking-wide">
                <p className="text-3xl text-[#ffd601] pt-5 font-bold pb-5 font-title">{t('your-information')}</p>
                <li className="text-base pb-4  leading-loose text-justify">{t('your-information-1')}</li>
                <li className="text-base pb-4 leading-loose	text-justify">{t('your-information-2')}</li>
                <li className="text-base pb-4 leading-loose text-justify">{t('your-information-3')}</li>
              
                <p className="text-3xl text-[#ffd601] pt-5 font-bold pb-5 font-title">{t('collect-information')}</p>
                <li className="leading-loose text-justify text-base pb-4">{t('collect-information-1')}</li>
                <li className="leading-loose text-justify text-base pb-4">{t('collect-information-2')}</li>
                <li className="leading-loose text-justify text-base pb-4">{t('collect-information-3')}</li>
                <li className="leading-loose text-justify text-base pb-4">{t('collect-information-4')}</li>
              
                <p className="text-3xl text-[#ffd601] pt-5 font-bold pb-5 font-title">{t('security')}</p>
                <li className="leading-loose text-justify text-base pb-4">{t('security-1')}</li>
                
                <p className="text-3xl text-[#ffd601] pt-5 font-bold pb-5 font-title">{t('use-google-analytics')}</p>
                <li className="leading-loose text-justify text-base pb-4">{t('use-google-analytics-1')}</li>
                <li className="leading-loose text-justify text-base pb-4">{t('use-google-analytics-2')}</li>          
              </div>
          </div>
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
