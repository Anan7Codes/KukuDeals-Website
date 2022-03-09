import Head from "next/head";
import { useRouter } from 'next/router'
import React from 'react'
import Layout from '@/components/Layout'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from "next-i18next"

function Cancel() {
  const { t } = useTranslation()
  const { locale } = useRouter()

  return (
    <div className='bg-[#161616]' dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <Head>
          <title>How It Works | Kuku Deals</title>
          <link rel="icon" href={locale === 'ar' ? "../../icons/icon.png" : "../icons/icon.png"}/>
      </Head>
      <Layout>
        <div className='bg-[#2c2c2c] min-h-42 my-3 py-12 px-4 rounded-[10px] flex flex-col items-start justify-center'>
          <p className='font-title text-[#ffd601] text-5xl font-semibold'>{t('how-it-works')}</p>
          <p className='text-[#fff] text-lg'>{t('point-1')}</p>
          <p className='text-[#fff] text-lg'>{t('point-2')}</p>
          <p className='text-[#fff] text-lg'>{t('point-3')}</p>
          <p className='text-[#fff] text-lg'>{t('point-4')}</p>
          <iframe className="mt-8 rounded-[10px]" src="https://www.youtube.com/embed/DbjQ6gC_FjY?controls=1&hd=1" height="500" width="100%"></iframe>
        </div>
      </Layout>
    </div>
  )
}

export default Cancel

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common']))
    }
  }
}