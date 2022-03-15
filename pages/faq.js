import Layout from "@/components/Layout";
import Head from "next/head";
import { useRouter } from 'next/router'
import React from "react";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from "next-i18next"


export default function Faq() {
  const { t } = useTranslation()
  const { locale } = useRouter()

  return (
    <div className="bg-[#161616]" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <Head>
        <title>FAQs | Kuku Deals</title>
        <link rel="icon" href={locale === 'ar' ? "../../icons/icon.png" : "../icons/icon.png"}/>
      </Head>
      <Layout>
        <p className="text-[2.5rem] text-[#ffd601] my-3 font-bold font-title">{t('frequently-asked-questions')}</p>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 text-white">
          <div>
            <p className ="text-xl font-bold pb-2 text-[#ffd601]">{t('what-is-kuku-deals')}</p>
            <p className="leading-loose text-justify">
              {t('what-is-kuku-deals-ans')}
            </p>
          </div>
          <div>
            <p className ="text-xl font-bold pb-2 text-[#ffd601]">{t('how-does-kuku-work')}</p>
            <p className="leading-loose text-justify">
              {t('how-does-kuku-work-ans')}
            </p>
            <p className="leading-loose text-justify">{t('kuku-access-global')}</p>
          </div>

          <div>
            <p className ="text-xl font-bold pb-2 text-[#ffd601]">{t('why-register-an-account')}</p>
            <p className="leading-loose text-justify">
              {t('why-register-an-account-ans')}
            </p>
          </div>

          <div>
            <p className ="text-xl font-bold pb-2 text-[#ffd601]">{t('how-do-I-set-up')}</p>
            <p className="leading-loose text-justify">
              {t('how-do-I-set-up-ans')}
            </p>
          </div>

          <div>
            <p className ="text-xl font-bold pb-2 text-[#ffd601]">{t('what-credit-cards')}</p>
            <p className="leading-loose text-justify">
              {t('what-credit-cards-ans')}
            </p>
          </div>

          <div>
            <p className ="text-xl font-bold pb-2 text-[#ffd601]">{t('are-there-any-hidden-charges')}</p>
            <p className="leading-loose text-justify">
              {t('are-there-any-hidden-charges-ans')}
            </p>
          </div>

          <div>
            <p className ="text-xl font-bold pb-2 text-[#ffd601]">{t('what-currencies')}</p>
            <p className="leading-loose text-justify">
              {t('what-currencies-ans')}
            </p>
          </div>

          <div>
            <p className ="text-xl font-bold pb-2 text-[#ffd601]">{t('can-I-cancel')}</p>
            <p className="leading-loose text-justify">
              {t('can-I-cancel-ans')}
            </p>
          </div>

          <div>
            <p className ="text-xl font-bold pb-2 text-[#ffd601]">{t('where-can-I-collect')}</p>
            <p className="leading-loose text-justify">
              {t('where-can-I-collect-ans')}
            </p>
          </div>

          <div>
            <p className ="text-xl font-bold pb-2 text-[#ffd601]">{t('can-I-send-someone')}</p>
            <p className="leading-loose text-justify">
              {t('can-I-send-someone-ans')}
            </p>
          </div>

          <div>
            <p className ="text-xl font-bold pb-2 text-[#ffd601]">{t('how-notify')}</p>
            <p className="leading-loose text-justify">
              {t('how-notify-ans')}
            </p>
          </div>

          <div>
            <p className ="text-xl font-bold pb-2 text-[#ffd601]">{t('my-personal-details')}</p>
            <p className="leading-loose text-justify">
              {t('my-personal-details-ans')}
            </p>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common']))
    }
  }
}
