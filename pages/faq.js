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
        <link rel="icon" href="./icons/icon.png"/>
      </Head>
      <Layout>
        <p className="text-[2.5rem] text-[#ffd601] pt-3 pb-5 font-bold font-title">{t('frequently-asked-questions')}</p>
        <div className="grid grid-cols-1 lg:gap-8 lg:grid-cols-3 text-white">
          <div>
            <p className ="text-xl font-bold pb-2 text-[#ffd601]">What is Kuku Deals?</p>
            <p className="leading-loose text-justify">
              Kuku Deals is an online store that gives you a chance to win
              amazing prizes. Our platform is aimed at rewarding you when you
              buy one or more of our products.
            </p>
          </div>
          <div>
            <p className ="text-xl font-bold pb-2 text-[#ffd601]">I'm new to Kuku Deals, how does it work?</p>
            <p className="leading-loose text-justify">
              All Kuku Deals products listed on the platform for sale are
              associated with a unique prize draw. When you purchase a product,
              you will receive a ticket associated with a prize, whose winner
              will be selected on the basis of a DED licensed draw.
            </p>
            <p className="leading-loose text-justify">Kuku Deals is accessible globally. </p>
          </div>

          <div>
            <p className ="text-xl font-bold pb-2 text-[#ffd601]">Why should I register an account with Kuku Deals?</p>
            <p className="leading-loose text-justify">
              To complete a purchase with Kuku Deals you must have a registered
              account. This is for your security and protection.
            </p>
          </div>

          <div>
            <p className ="text-xl font-bold pb-2 text-[#ffd601]">How do I set up my Kuku Deals account?</p>
            <p className="leading-loose text-justify">
              To create an account simply click 'Login/Register' in the top
              right hand corner of your screen and enter your details in the
              fields highlighted.
            </p>
          </div>

          <div>
            <p className ="text-xl font-bold pb-2 text-[#ffd601]">What Credit Cards does Kuku Deals accept?</p>
            <p className="leading-loose text-justify">
              We accept all major credit/debits cards including (but not limited
              to): Visa,MasterCard and Amex.
            </p>
          </div>

          <div>
            <p className ="text-xl font-bold pb-2 text-[#ffd601]">What Credit Cards does Kuku Deals accept?</p>
            <p className="leading-loose text-justify">
              We accept all major credit/debits cards including (but not limited
              to): Visa,MasterCard and Amex.
            </p>
          </div>

          <div>
            <p className ="text-xl font-bold pb-2 text-[#ffd601]">Are there any hidden charges I should be aware of?</p>
            <p className="leading-loose text-justify">
              There are no hidden charges on any Idealz purchase. You should
              however CHECK with your bank to see if they apply any
              transaction/processing fees.
            </p>
          </div>

          <div>
            <p className ="text-xl font-bold pb-2 text-[#ffd601]">What currencies can I use to purchase a Kuku Deals product?</p>
            <p className="leading-loose text-justify">
              We currently only accept AED. You can make a purchase from Kuku
              Deals via any bank account with any currency - however, we will
              not accept responsibility for final billings which have been
              affected by exchange rates or fees (hidden or otherwise) as
              imposed by your banking partner.
            </p>
          </div>

          <div>
            <p className ="text-xl font-bold pb-2 text-[#ffd601]">Can I cancel/refund a Kuku Deals purchase order?</p>
            <p className="leading-loose text-justify">
              All sales/purchases are final and no refunds are given under any
              circumstances.
            </p>
          </div>

          <div>
            <p className ="text-xl font-bold pb-2 text-[#ffd601]">Where can I collect my Kuku Deals prize?</p>
            <p className="leading-loose text-justify">
              Details on where to collect your prize will be sent to you (aka
              the &aposwinner&apos) via email
            </p>
          </div>

          <div>
            <p className ="text-xl font-bold pb-2 text-[#ffd601]">Can I send someone else to collect my Prize?</p>
            <p className="leading-loose text-justify">
              Only the registered account holder, or any individual with 'Power
              of Attorney' (POA) can collect the registered account holders'
              Kuku Deals Prize. Emirates ID or passport are the only acceptable
              forms of identification (please ensure your identification is up
              to date).
            </p>
          </div>

          <div>
            <p className ="text-xl font-bold pb-2 text-[#ffd601]">How will I be notified about the status of the campaign?</p>
            <p className="leading-loose text-justify">
              Kuku Deals will send 'Push Notifications'/emails to notify all
              ticket holders as to the status of each campaign.
            </p>
          </div>

          <div>
            <p className ="text-xl font-bold pb-2 text-[#ffd601]">Are my personal details secure with Kuku Deals?</p>
            <p className="leading-loose text-justify">
              Kuku Deals does not store or save any sensitive Credit Card
              information on its servers. Credit Card details that are
              registered with us are stored securely through the 'Stripe' secure
              online payment gateway.
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
