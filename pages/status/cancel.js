import Head from "next/head";
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import Layout from '@/components/Layout'
import { useUser } from '@/contexts/user/UserContext';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from "next-i18next"
import Lottie from "lottie-react";
import FailedAnimation from '@/public/failed-animation.json'

function Cancel() {
  const { t } = useTranslation()
  const { locale } = useRouter()
  const { user } = useUser()

  useEffect(() => {
    if(!user) {
      router.push('/signin')
    }
  }, [user])

  return (
    <div className='bg-[#161616]' dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <Head>
          <title>Payment Cancelled | Kuku Deals</title>
          <link rel="icon" href={locale === 'ar' ? "../../icons/icon.png" : "../icons/icon.png"}/>
      </Head>
      <Layout>
        <div className='bg-[#2c2c2c] min-h-42 my-3 py-12 rounded-[15px] flex flex-col items-center justify-center'>
          <Lottie
            animationData={FailedAnimation}
            speed={1}
            loop
            style={{
              height: 200,
              width: 200
            }}
          />
          <p className='font-title text-[#ffd601] text-5xl font-semibold'>{t('cancelled')}</p>
          <p className='text-[#fff] text-2xl'>{t('order-cancel')}</p>
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