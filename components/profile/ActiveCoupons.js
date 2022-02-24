import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { supabase } from '@/utils/supabaseClient';
import Coupon from "./Coupon";

export default function ActiveCoupons() {
    const router = useRouter();
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
    return (
        <div>
            <div className="flex flex-col  justify-center items-center ">
              <div>
              {activeOrders?.map(order => {              
              return (
                <Coupon order={order} key={order.id}/>              
              )
            })} 
              </div>
              {/* <div className=" relative  top-0 left-0 opacity-50  hover:shadow-outline w-40 h-40 cursor-pointer">
            <Image
              src="/icons/coupon.png"
              layout="fill"
              alt="product logo"
            />
          </div> 
              <p className="pt-3 text-white pb-4 text-center">You can view active coupons after you make purchase</p>
              <button onClick={ ()=>router.push('/')} className="bg-[#ffd601] hover:bg-[#cfb429] font-semibold  text-black w-72 h-14 text-center  rounded-[10px]">
                  Start Shopping
              </button> */}
                </div>
        </div>
    )
}
