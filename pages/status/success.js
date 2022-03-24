import Head from "next/head";
import React, { useState, useEffect } from 'react'
import Layout from '@/components/Layout'
import SkeletonLayout from "@/components/SkeletonLayout";
import { CartState } from "@/contexts/cart/CartContext";
import { supabase } from '@/utils/supabaseClient';
import { useUser } from '@/contexts/user/UserContext';
import { useRouter } from 'next/router';
import Confetti from 'react-confetti';
import Lottie from "lottie-react";
import SuccessAnimation from '@/public/success-animation.json'
import Skeleton from 'react-loading-skeleton'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from "next-i18next"

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      function handleResize() {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }

      window.addEventListener("resize", handleResize);
      handleResize();

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []); 
  return windowSize;
}
function Success() {
  const { t, i18n } = useTranslation()
  const { locale } = useRouter()
  const router = useRouter();
  const { width, height } = useWindowSize()
  const { user } = useUser()

  const [ success, setSuccess ] = useState(false)
  const { dispatch } = CartState();

  useEffect(() => {
    if(!user) {
      router.push('/signin')
    }
  }, [user])

  const [ latestOrder, setLatestOrder] = useState()
  useEffect(() => {
    const GetLatestOrder = async () => {
      try {
        let { data: completed_orders, error } = await supabase
          .from('completed_orders')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(1)
          .single()
        setLatestOrder(completed_orders)
      } catch (e) {
        console.log(e)
      }
    }
    GetLatestOrder() 
  }, [])

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      setSuccess(true)
    }
    const EmptyCart = () => {
      dispatch({
          type: 'EMPTY_CART',
      })       
    }
    EmptyCart()
  }, []);

  if(success) {
    return (
    <div className={`bg-[#161616] overflow-x-hidden`} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <Head>
          <title>Order Successful | Kuku Deals</title>
          <link rel="icon" href={locale === 'ar' ? "../../icons/icon.png" : "../icons/icon.png"}/>
      </Head>
      <Confetti
        width={width - 20}
        height={height}
        recycle={false}
      />
      <Layout>
        <div className='bg-[#2c2c2c] min-h-42 my-3 py-12 px-4 text-center rounded-[15px] flex flex-col items-center justify-center'>
          <Lottie
            animationData={SuccessAnimation}
            speed={1}
            style={{
              height: 200,
              width: 200
            }}
          />
          <p className='font-title text-[#ffd601] text-4xl lg:text-5xl font-semibold'>{t('congratulations')}</p>
          <p className='text-[#fff] text-xl lg:text-2xl leading-tight'>{t('order-success')}</p>
          <p className='text-[#fff] mt-4 text-md lg:text-lg'>{t('your-transaction-number')} <span className="font-bold">{`${latestOrder?.transaction_number.split("-")[0].padStart(4, '0')}-${latestOrder?.transaction_number.split("-")[1]}`}</span> &amp; {t('total-amount-paid-is')} <span className="font-bold">{t('aed')} {latestOrder?.final_amount}</span>.</p>
          <p className='text-[#fff] mt-4 text-md lg:text-lg'>{t('your-coupons-are')}:
          {latestOrder?.coupons.map(coupon => {
            return (
              JSON.parse(coupon)?.product_coupons.map((ticket, i) => {
              return (
                  <span className="font-bold px-1" key={i}>{ticket}<br/></span>
                )
              })
            )
          })}
          </p>
          
        </div>
      </Layout>
    </div> 
  )} else return (
    <div className='bg-[#161616]'>
      <SkeletonLayout>
        <Skeleton className="h-96 py-12" style={{borderRadius: 15}} />
      </SkeletonLayout>
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