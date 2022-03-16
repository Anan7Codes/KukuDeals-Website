import React from 'react'
import Head from "next/head";
import Image from 'next/image'
import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from "next-i18next"

function ContactUs() {
  const { t, i18n } = useTranslation()
  const { locale } = useRouter()

  return (
    <div dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <Head>
          <title>Contact Us | Kuku Deals</title>
          <link rel="icon" href={locale === 'ar' ? "../icons/icon.png" : "/icons/icon.png"}/>
      </Head>
      <Layout>
          <div className="my-3 flex flex-col lg:flex-row items-center justify-center rounded-[10px] bg-[#2c2c2c] p-4">
              <div className={`${i18n.language === "ar" ? 'mx-32' : 'flex-1 w-32'} hidden lg:flex items-center justify-center`}>
                  <div className="relative w-44 h-40 mx-8">
                      <Image
                          src="/icons/contactus.png"
                          layout="fill"
                          alt="Contact Us"
                      />
                  </div>
              </div>
              <div className={`${i18n.language === "ar" ? 'flex-1' : null} flex flex-col py-12`}>
                  <p className="text-[#ffd601] font-title font-semibold text-4xl">{t('contact-us')}</p>
                  <p className="text-white font-semibold text-lg lg:w-[50%]">{t('contact-desc')}</p>
                  <input
                    type="text"
                    className={`border placeholder:text-xs text-white placeholder:text-[#d3d3d3] text-xs font-semibold ${i18n.language === 'ar' ? 'pr-3 ml-3' : 'pl-3 mr-3'} w-full lg:w-96 mt-12 outline-none rounded-[5px] h-14 border-[#d3d3d3] bg-[#2c2c2c]`}
                    placeholder="Full Name"
                  />
                  <input
                    type="text"
                    className={`border placeholder:text-xs text-white placeholder:text-[#d3d3d3] text-xs font-semibold ${i18n.language === 'ar' ? 'pr-3 ml-3' : 'pl-3 mr-3'} w-full lg:w-96 mt-4 outline-none rounded-[5px] h-14 border-[#d3d3d3] bg-[#2c2c2c]`}
                    placeholder="Email Address"
                  />
                  <textarea
                    className={`border placeholder:text-xs text-white placeholder:text-[#d3d3d3] text-xs font-semibold ${i18n.language === 'ar' ? 'pr-3 ml-3' : 'pl-3 mr-3'} pt-4 w-full lg:w-96 mt-4 outline-none rounded-[5px] h-28 border-[#d3d3d3] bg-[#2c2c2c]`}
                    placeholder="Message"
                  ></textarea>
              </div>
          </div>
      </Layout>
    </div>
  )
}

export default ContactUs

export async function getStaticProps({ locale }) {
  return {
      props: {
      ...(await serverSideTranslations(locale, ['common']))
      }
  }
}