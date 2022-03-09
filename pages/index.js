import Head from "next/head";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from "next-i18next";
import { useRouter } from 'next/router'
import Layout from "@/components/Layout";
import SkeletonLayout from "@/components/SkeletonLayout";
import Banner from "@/components/home/Banner";
// import Section1 from "@/components/home/Section1";
import DownloadApp from "@/components/home/DownloadApp";
import Campaign from "@/components/home/Campaign";
import Soldout from "@/components/home/Soldout";
import Winners from "@/components/home/Winners";
import CartButton from "@/components/cart/CartButton";
import { useEffect, useState } from "react";
import { supabase } from '@/utils/supabaseClient';
import AliceCarousel from "react-alice-carousel";
import Skeleton from 'react-loading-skeleton'
import "react-alice-carousel/lib/alice-carousel.css";
import ArrowL from "@/components/home/ArrowL";
import ArrowR from "@/components/home/ArrowR";

export default function Home() {
  const  { t, i18n } = useTranslation()
  const { locale } = useRouter()
  const [campaigns, setCampaigns] = useState([])
  const [winners, setWinners] = useState([])
  const [isSoldOutNextDisabled, setIsSoldOutNextDisabled] = useState(false)
  const [isSoldOutPrevDisabled, setIsSoldOutPrevDisabled] = useState(true)
  const [isWinnerNextDisabled, setIsWinnerNextDisabled] = useState(false)
  const [isWinnerPrevDisabled, setIsWinnerPrevDisabled] = useState(true)

  const responsive = {
    0: { items: 1 },
    576: { items: 3 },
    1024: { items: 4 },
  };
  
  useEffect(() => {
    const FetchCampaigns = async () => {
      try {
        let { data, error } = await supabase.from('campaigns').select('*')
        if (error) {
          toast.error(error.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
          });
          return
        }
        setCampaigns(data)
      } catch (e) {
        console.log(e)
      }
    }
    FetchCampaigns()
    const FetchWinners = async () => {
      try {
        let { data, error } = await supabase.from('winners').select('*')
        if (error) {
          toast.error(error.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true, 
            progress: undefined
          });
          return
        }
        setWinners(data)
      } catch (e) {
        console.log(e)
      }
    }
    FetchWinners()
  }, [])
 
  if(campaigns.length === 0 ) return (
    <SkeletonLayout>
      <Skeleton className="h-96" style={{borderRadius: 15}} />
      <Skeleton className="h-60 mt-6" style={{borderRadius: 15}} />
      <Skeleton className="h-60 mt-6" style={{borderRadius: 15}} />
      <Skeleton className="h-60 mt-6" style={{borderRadius: 15}} />
    </SkeletonLayout>
  )
  if (!campaigns) return <p>No Data</p>
  return (
    <div className="bg-[#161616]" dir={locale === 'ar' ? 'rtl' : 'ltr'}> 
      <Head>
        <title>Kuku Deals</title>
      </Head>
      <Layout>
        <Banner />
        <DownloadApp/>
        {/* <Section1 /> */}
        <div>
          {campaigns?.map(campaign => {
              return (
                <Campaign campaign={campaign} key={campaign.id} />
              )
            })
          }
        </div>
        <div>
          <div className="py-3">
            <div className="bg-[#ffd601] rounded-[15px] px-6 py-8 text-black">
              <div className="relative">
                <div className={`flex justify-between`}>
                  <p className="font-title font-bold text-3xl">{t('common:soldout')}</p>
                </div>
                <div className={`flex justify-between`}>
                  <p className={`text-normal pt-4 lg:pt-0 font-medium lg:w-[450px]`}>{t('common:soldoutdesc')}</p>
                </div>
                <div className="mt-6 relative">
                  <AliceCarousel
                    mouseTracking
                    responsive={responsive}
                    onSlideChanged={(e) => {
                      setIsSoldOutNextDisabled(e.isNextSlideDisabled)
                      setIsSoldOutPrevDisabled(e.isPrevSlideDisabled)                      
                    }}
                    renderPrevButton={() => {                      
                      return (
                        <div className={`absolute flex ${i18n.language === 'ar' ? 'left-16' : 'right-20'} -top-32 lg:-top-28 ${isSoldOutPrevDisabled ? 'opacity-50' : null}`}>
                          <ArrowL />
                        </div>
                    )}}
                    renderNextButton={() => {
                      return (
                        <div className={`absolute flex ${i18n.language === 'ar' ? 'left-20' : 'right-16'} -top-32 lg:-top-28 ${isSoldOutNextDisabled ? 'opacity-50' : null}`}>
                          <ArrowR />
                        </div>
                      )}}
                    disableDotsControls="true"
                    controlsStrategy="alternate"
                  >
                    {campaigns?.filter((campaign) => campaign.SoldOut === true).map((campaign, i) => {
                      return (
                        <Soldout campaign={campaign} key={campaign.id} data-value={i}/>
                      )
                    })}
                  </AliceCarousel>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="py-3">
            <div className="bg-[#000000] rounded-[15px] px-6 py-5">
              <div className="p-2 text-[#ffd601]">
                <div className={`flex justify-between`}>
                  <p className="font-title font-bold text-3xl">{t('common:winners')}</p>
                </div>
                <div className={`flex justify-between`}>
                  <p className={`text-normal pt-4 lg:pt-0 font-medium lg:w-[450px]`}>{t('common:winners-desc')}</p>
                </div>
              </div>
              <div className="mt-6 flex">
                <AliceCarousel
                  mouseTracking
                  responsive={responsive}
                  onSlideChanged={(e) => {
                    setIsWinnerNextDisabled(e.isNextSlideDisabled)
                    setIsWinnerPrevDisabled(e.isPrevSlideDisabled)                      
                  }}
                  renderPrevButton={() => {
                    return (
                      <div className={`absolute flex ${i18n.language === 'ar' ? 'left-16' : 'right-20'} -top-32 lg:-top-24`}>
                        <ArrowL item={true} isWinnerPrevDisabled={isWinnerPrevDisabled}/>
                      </div>
                  )}}
                  renderNextButton={() => {
                    return (
                      <div className={`absolute flex ${i18n.language === 'ar' ? 'left-20' : 'right-16'} -top-32 lg:-top-24`}>
                        <ArrowR item={true} isWinnerNextDisabled={isWinnerNextDisabled}/>
                      </div>
                  )}}
                  disableDotsControls="true"
                  controlsStrategy="alternate"
                >
                  {winners?.map((winner, i) => {
                    return (
                      <Winners winner={winner} key={winner.id} data-value={i}/>
                    )
                  })}
                </AliceCarousel>
              </div>
            </div>
          </div>
        </div>
        <CartButton />
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