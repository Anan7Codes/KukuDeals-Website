import Head from "next/head";
import Layout from "@/components/Layout";
import Banner from "@/components/home/Banner";
import Section1 from "@/components/home/Section1";
import Campaign from "@/components/home/Campaign";
import Soldout from "@/components/home/Soldout";
import Winners from "@/components/home/Winners";
import CartButton from "@/components/cart/CartButton";
import { useEffect, useState } from "react";
import { supabase } from '@/utils/supabaseClient';
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import ArrowL from "@/components/home/ArrowL";
import ArrowR from "@/components/home//ArrowR";

export default function Home() {
  const [campaigns, setCampaigns] = useState([])
  const [winners, setWinners] = useState([])
  const [index, setIndex] = useState(0);
  const responsive = {
    0: { items: 1 },
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

  if (!campaigns) return <p>No Data</p>
  return (
    <div className="bg-[#161616]">
      <Head>
        <title>Kuku Deals</title>
      </Head>
      <Layout>
        <Banner />
        {/* <Section1 /> */}
        <div>
          <p className="text-[26px] text-[#ffd601] pt-5 font-title font-bold">Explore campaigns</p>
          {campaigns?.map(campaign => {
            return (
              <Campaign campaign={campaign} key={campaign.id} />
            )
          })}
        </div>
        <div>
          <div className=" mx-auto">
            <div className="bg-[#ffd601] rounded-[15px] px-6 py-5 text-black">
              <div className="pt-2 ml-3 relative">
                <div className="flex justify-between">
                  <p className="tracking-tighter font-title font-bold text-3xl">Sold Out</p>
                </div>
                <div className="text-xs lg:text-base leading-5 font-medium">
                  All our sold out campaigns along with their <br /> corresponding
                  draw dates are listed below
                </div>
                <div className="mt-6 relative ">
                  <AliceCarousel
                    mouseTracking
                    responsive={responsive}
                    onSlideChanged={(e) => {
                      setIndex(10);
                    }}
                    renderPrevButton={() => {
                      return index == 0 ? (
                        <div className="absolute hidden lg:flex -top-24 right-24 opacity-50">
                          <ArrowL />
                        </div>
                      ) : (
                        <div className="absolute hidden lg:flex -top-24 opacity:100 right-24">
                          <ArrowL />
                        </div>
                      )
                    }}
                    renderNextButton={() => {
                      return index >= 10 - 4 ? (
                        <div className="absolute hidden lg:flex -top-24 opacity-50 right-20">
                          <ArrowR />
                        </div>
                      ) : (
                        <div className="absolute hidden lg:flex -top-24 right-20">
                          <ArrowR />
                        </div>
                      );
                    }}
                    disableDotsControls="true"
                    controlsStrategy="alternate"
                  >
                    <div className="flex justify-center items-center">
                      <div className="flex-col space-y-8 lg:hidden">
                        {campaigns?.map(campaign => {
                          return (
                            <Soldout campaign={campaign} key={campaign.id} />
                          )
                        })}
                      </div>
                      <div className="hidden lg:flex space-x-[17rem]">
                        {campaigns?.map(campaign => {
                          return (
                            <Soldout campaign={campaign} key={campaign.id} />
                          )
                        })}
                      </div>
                      </div>
                  </AliceCarousel>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="py-8">
            <div className="bg-[#000000] rounded-[15px] px-6 pr-2 py-5 text-black">
              <div className="p-2  text-[#ffd601]">
                <p className="font-[700] tracking-tighter text-3xl font-title">Winners</p>
                <p className="text-normal">
                  All our winners are announced in this section
                </p>
              </div>
              <div className="mt-6 flex">
                <AliceCarousel
                  mouseTracking
                  responsive={responsive}
                  onSlideChanged={(e) => {
                    setIndex(10);
                  }}
                  renderPrevButton={() => {
                    return index == 0 ? (
                      <div className="absolute  -top-24 right-24 opacity-50">
                        <ArrowL item={true}/>
                      </div>
                    ) : (
                      <div className="absolute -top-24 opacity:100 right-24">
                        <ArrowL item={true}/>
                      </div>
                    );
                  }}
                  renderNextButton={() => {
                    return index >= 10 - 4 ? (
                      <div className="absolute -top-24 opacity-50 right-20">
                        <ArrowR item={true}/>
                      </div>
                    ) : (
                      <div className="absolute -top-24 right-20">
                        <ArrowR item={true}/>
                      </div>
                    );
                  }}
                  disableDotsControls="true"
                  controlsStrategy="alternate"
                >
                  <div className="flex justify-center items-center">
                    <div className="flex-col space-y-8 lg:hidden">
                      {winners?.map(winner => {
                        return (
                          <Winners winner={winner} key={winner.id} />
                        )
                      })}
                    </div>
                    <div className="hidden justify-start lg:flex space-x-10">
                      {winners?.map(winner => {
                        return (
                          <Winners winner={winner} key={winner.id} />
                        )
                      })}
                    </div>
                  </div>
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
