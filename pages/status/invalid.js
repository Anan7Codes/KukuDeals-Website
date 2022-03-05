import React from 'react'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from "next-i18next"

function Invalid() {
  const { t } = useTranslation()
  const { locale } = useRouter()
  return (
    <div dir={locale === 'ar' ? 'rtl' : 'ltr'}>{t('restricted-page')}</div>
  )
}

export default Invalid

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common']))
    }
  }
}