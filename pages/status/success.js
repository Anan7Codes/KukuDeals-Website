import Head from "next/head";
import Image from "next/image";
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
import moment from 'moment'

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

  const [tab, setTab] = useState('invoice')

  const [ success, setSuccess ] = useState(false)
  const { dispatch } = CartState();

  useEffect(() => {
    if(!user) {
      router.push('/signin')
    }
  }, [user])

  const [ latestOrder, setLatestOrder] = useState([])
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
        alert(e)
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

  if(success && latestOrder.length !== 0 ) {
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
        <div className='min-h-42 my-3 bg-[#2c2c2c] flex flex-col items-center'>
          <div className="max-w-[600px] rounded-[15px] px-4">
            <div className="flex flex-col items-center justify-center pt-12 pb-8">
              <Lottie
                animationData={SuccessAnimation}
                speed={1}
                style={{
                  height: 200,
                  width: 200
                }}
              />
              <p className='font-title text-[#ffd601] text-3xl lg:text-5xl font-semibold'>{t('congratulations')}</p>
              <p className='text-[#fff] text-lg lg:text-2xl leading-tight'>{t('order-success')}</p>
            </div>         

            <div className="flex items-center justify-center mb-6">
                <span onClick={() => setTab('invoice')} className={`${tab === 'invoice' ? 'bg-[#ffd601] text-black' : 'bg-black text-[#ffd601] opacity-50 cursor-pointer'} text-sm font-semibold ${i18n.language === 'ar' ? 'rounded-r-[50px] pl-2 py-2 pr-3' : 'rounded-l-[50px] pl-3 py-2 pr-2' }`}>{t('tax-invoice')}</span>
                <span onClick={() => setTab('coupons')} className={`${tab === 'coupons' ? 'bg-[#ffd601] text-black' : 'bg-black text-[#ffd601] opacity-50 cursor-pointer'} text-sm font-semibold ${i18n.language === 'ar' ? 'rounded-l-[50px] pl-3 py-2 pr-2' : 'rounded-r-[50px] pr-3 py-2 pl-2' }`}>{t('Coupons')}</span>
            </div>

            {tab === 'invoice' ? 
              <div className="pb-12">
                <div className="flex flex-col font-bold text-white">
                  <p className="text-2xl">{t('tax-invoice')}</p>
                  <p className="mt-6">{t('trn')}: 100066261700003</p>
                  <p>{t('transaction-number')}: {`${latestOrder?.transaction_number.split("-")[0].padStart(4, '0')}-${latestOrder?.transaction_number.split("-")[1]}`}</p>
                  <p>{t('purchase-date')}: {moment(latestOrder?.created_at).format('lll')}</p>
                </div>
                <div className="flex items-center justify-between font-semibold text-white mt-6">
                  <p>{t('total-before-vat')}</p>
                  <p>{t('aed')} {latestOrder?.final_amount*0.95.toFixed(2)}</p>
                </div>
                <div className="flex items-center justify-between font-semibold text-white my-2">
                  <p>{t('vat-amount')}</p>
                  <p>{t('aed')} {latestOrder?.final_amount*0.05.toFixed(2)}</p>
                </div>
                <div className="flex items-center text-xl justify-between font-bold text-white">
                  <p>{t('total')}</p>
                  <p>{t('aed')} {latestOrder?.final_amount}</p>
                </div>
              </div> : null
            }

            {tab === 'coupons' ?
              <div className="pb-12">
                <p className="text-2xl text-white font-bold">{t('your-coupons')}</p>
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  {latestOrder?.coupons.map(coupon => {
                    return (
                      JSON.parse(coupon)?.product_coupons.map((ticket, i) => {
                      return (
                        <div className="h-[150px] bg-white mx-2 pt-2 my-2 rounded-[15px] relative" key={i}>
                          <div className="flex">
                            <div className="flex-1 text-[10px] px-2 flex flex-col space-y-2">
                              <div>
                                <p className="font-bold">{t('coupon-no')}</p>
                                <p className="text-[9px]">{ticket}</p>
                              </div>
                              <div>
                                <p className="font-bold">{t('product/prize')}</p>
                                <p className="text-[9px]">{JSON.parse(coupon)?.name}</p>
                              </div>
                              <div>
                                <p className="font-bold">{t('purchased-on')}</p>
                                <p className="text-[9px]">{moment(latestOrder?.created_at).format('lll')}</p>
                              </div>                     
                            </div>
                            <div className="flex flex-col justify-between">
                              <div className="relative w-24 h-8 mx-2">
                                <Image
                                  priority={true}
                                  src="/kuku-black.png"
                                  layout="fill"
                                  alt="KukuDeals logo"
                                />
                              </div>
                              <div className="relative w-20 h-20 mx-auto">
                                <Image
                                  priority={true}
                                  src={JSON.parse(coupon)?.image}
                                  layout="fill"
                                  alt="Product Logo"
                                />
                              </div>
                            </div>
                            <div className="bg-[#ffd601] absolute bottom-0 min-h-[20px] h-[20px] w-full rounded-b-[15px] text-[#ffd601]">&nbsp;</div>
                          </div>
                        </div>
                        )
                      })
                    )
                  })}                  
                </div> 
              </div>: null
            }          
          </div>         
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