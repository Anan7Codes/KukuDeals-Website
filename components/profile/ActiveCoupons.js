import { useEffect, useState } from "react";
import { supabase } from '@/utils/supabaseClient';
import Coupon from "./Coupon";

export default function ActiveCoupons() {
    const [ activeOrders, setActiveOrders ] = useState([])
    useEffect(() => {
      const GetActiveOrders = async () => {
        try {
          let { data: completed_orders, error } = await supabase
            .from('completed_orders')
            .select('*')
          setActiveOrders(completed_orders)
        } catch (e) {
          console.log(e)
        }
      }
      GetActiveOrders() 
    }, [])

    if(activeOrders.length === 0) return (
      <div className="bg-[#2c2c2c] rounded-[15px] flex items-center justify-center h-[400px] w-[350px]">
        <p className="text-white font-semibold">No Active Coupons</p> 
      </div>
    )
    return (
      <div>
        <p className="font-title text-[#ffd601] font-semibold pb-4 text-4xl">Your Tickets</p>
        <div className="overflow-y-auto scrollbar-thin scrollbar-thumb-yellow-400 scrollbar-track-gray-100 max-h-[600px] lg:min-w-[800px] px-4 lg:px-0 hover:cursor-all-scroll">
          {activeOrders?.map(order => {              
            return (
              <Coupon order={order} key={order.id}/>              
            )
          })} 
        </div>
      </div>
    )
}
