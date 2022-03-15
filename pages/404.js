import Head from "next/head";
import { useRouter } from 'next/router'
import React from 'react'
import Layout from '@/components/Layout'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from "next-i18next"

function Success() {
    const { t } = useTranslation()
    const { locale } = useRouter()
    
    return (
        <div className={`bg-[#161616] overflow-x-hidden`} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
          <Head>
              <title>404 | Kuku Deals</title>
              <link rel="icon" href={locale === 'ar' ? "../../icons/icon.png" : "../icons/icon.png"}/>
          </Head>
          <Layout>
            <div className='bg-[#2c2c2c] min-h-42 my-3 py-12 rounded-[15px] flex flex-col items-center justify-center'>
              <p className='font-title text-[#ffd601] text-5xl font-semibold'>{t('how-are-you-here')}</p>
              <p className='text-[#fff] text-2xl'>{t('sorry-page')}</p>
            </div>
          </Layout>
        </div> 
    )
}  

export default Success

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common']))
    }
  }
}