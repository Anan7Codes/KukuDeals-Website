import { useEffect, useState } from "react";
import { supabase } from '@/utils/supabaseClient';
import { useTranslation } from "next-i18next"
import Image from 'next/image'
import moment from 'moment'
import Coupon from "./Coupon";

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
                  <Coupon campaign={campaign} activeOrders={activeOrders} key={campaign.id}/>
                )
              })
            }
          </div>
        </div>
      </div>
    )
}
