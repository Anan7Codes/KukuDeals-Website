import { useEffect, useState } from "react";
import { supabase } from '@/utils/supabaseClient';
import { useTranslation } from "next-i18next"
import Image from 'next/image'
import moment from 'moment'

export default function ActiveCoupons() {
    const { t, i18n } = useTranslation()
    const [ activeOrders, setActiveOrders ] = useState([])
    const [ campaigns, setCampaigns ] = useState([])
    useEffect(() => {
      const GetActiveOrders = async () => {
        try {
          let { data: completed_orders, error } = await supabase
            .from('completed_orders')
            .select('*')
            .order('created_at', { ascending: false})
          setActiveOrders(completed_orders)
          let campaigns = await supabase
            .from('campaigns')
            .select('*')
          setCampaigns(campaigns.data)
        } catch (e) {
          alert(e)
        }
      }
      GetActiveOrders() 

    }, [])

    if(activeOrders.length === 0) return (
      <div className="bg-[#2c2c2c] rounded-[15px] flex items-center justify-center h-[400px] w-[350px]">
        <p className="text-white font-semibold">{t('no-active-coupons')}</p> 
      </div>
    )
    return (
      <div>
        <p className="font-title text-[#ffd601] font-semibold pb-4 text-4xl">{t('your-tickets')}</p>
        <div className="overflow-y-auto scrollbar-thin scrollbar-thumb-yellow-400 scrollbar-track-gray-100 max-h-[600px] lg:min-w-[800px] px-4 lg:px-0 hover:cursor-all-scroll">
          <div className="mx-4">          
            {
              campaigns?.map(campaign => {
                return (
                  <>
                    <p>{i18n.language === 'ar' ? campaign?.GiftName.ar : campaign?.GiftName.en }</p>
                    <p>{123}</p>
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        {activeOrders.map(order => {
                        return (order.coupons.map(coupon => {
                        if(JSON.parse(coupon).product_id === campaign.id) {
                            return (JSON.parse(coupon)?.product_coupons.map((item, i) => {
                            return (
                                <div className="h-[150px] bg-[#2c2c2c] mx-2 pt-2 my-2 rounded-[15px] relative" key={i}>
                                <div className="flex">
                                    <div className="flex flex-col justify-between mx-4">
                                    <div>
                                        <p className="font-semibold text-[12px] text-[#ffd601]">{t('coupon-no')}</p>
                                        <p className="text-[10px] text-white font-semibold">{item}</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-[12px] text-[#ffd601]">{t('purchase-date')}</p>
                                        <p className="text-[10px] text-white font-semibold">{moment(order?.created_at).format('lll')}</p>
                                    </div> 
                                    <div>
                                        <p className="font-semibold text-[12px] text-[#ffd601]">{t('product/prize')}</p>
                                        <p className="text-[10px] text-white font-semibold">{JSON.parse(coupon)?.name}</p>
                                    </div>
                                    </div>
                                    <div>
                                    <div className="flex flex-col justify-between">
                                    <div className="relative w-24 h-8 mx-2">
                                        <Image
                                        priority={true}
                                        src="/kuku-white.png"
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
                                    </div>
                                    <div className="bg-[#ffd601] absolute bottom-0 min-h-[20px] h-[20px] w-full rounded-b-[15px] text-[#ffd601]">&nbsp;</div>
                                </div>
                                </div>
                            )
                            }))                     
                        }
                        }))
                    })}
                    </div>
                  </>
                )
              })
            }
          </div>
        </div>
      </div>
    )
}
