import React from 'react'
import { CartState } from "@/contexts/cart/CartContext";
import { useEffect, useState } from "react";
import Image from "next/image";
import ToggleSwitch from "@/components/ToggleSwitch";

export default function CartItem({item}) {
  console.log("item",item)
    // const [qty, setQty] = useState()
    const { state: { cart } } = CartState();
    const { dispatch } = CartState();
    // useEffect(() => {
    //   cart.filter(c => c.id === item.id ? setQty(c.qty) : null)
    // }, [cart])
    const AddQty = () => {
      dispatch({
        type: 'ADD_QTY',
        payload: item
      })
    }
  
    const ReduceQty = () => {
      dispatch({
        type: 'REDUCE_QTY',
        payload: item
      })
    }
  
    const RemoveFromCart = () => {
      dispatch({
        type: 'REMOVE_FROM_CART',
        payload: item
      })
    }
  
    const Donate = () => {
      dispatch({
        type: 'DONATE',
        payload: item
      })
    }
  
    const DontDonate = () => {
      dispatch({
        type: 'DONT_DONATE',
        payload: item
      })
    }
    return (
    <div>
      <div className="bg-[#2c2c2c] flex items-center lg:justify-start h-44 rounded-t-3xl mt-6">
        <div className="cursor-pointer rounded-[15px] object-fit -left-2 relative ml-10 mt-2 w-32 h-28">
          <Image
              src={item?.Image}
              layout="fill"
              alt="product logo"
          />
        </div>
        <div className="flex pl-1 pt-2">
            <div className="">
                <p className="text-white text-sm sm:text-base lg:text-xl font-bold leading-2">
                    {item?.GiftName.en}
                </p>
                <p className="text-white text-sm sm:text-base lg:text-xl pt-1 leading-2 lg:leading-3">
                    {item?.ProductName.en}
                </p>
                <p className="font-bold text-sm sm:text-base lg:text-xl lg:pt-3 text-[#ffd601]">
                    AED{item?.Price}.00
                </p>
                <p className="text-xs font-semibold lg:pt-3 text-green-500">
                    {item?.SoldOutCoupons} Coupons
                    <span className="text-white font-normal"> per unit</span>
                </p>
            </div>

            <div className="flex sm:ml-12 lg:ml-16 leading-extra-loose">
                <button onClick={item?.qty === 1 ? RemoveFromCart : ReduceQty} className="flex justify-center items-center cursor-pointer text-white bg-[#161616] font-semibold h-12 w-16 rounded-[15px]">
                    -
                </button>
                <div className="flex items-center justify-center h-12 w-16 text-xl rounded-[15px] text-white bg-[#161616] mx-3">
                    {item?.qty}
                </div>
                <button onClick={AddQty} className="hidden sm:flex lg:flex justify-center items-center cursor-pointer bg-[#ffd601] text-black font-semibold h-12 w-28 rounded-[15px]">
                    Add More
                </button>
            </div>
        </div>
      </div>
      <div className="bg-[#2c2c2c] text-right h-12 rounded-b-3xl">
        <p className="text-white text-xs lg:text-sm mr-3 pt-1">
          Donate these product(s) to double the ticket(s)
          <ToggleSwitch sx={{ m: 1 }} defaultChecked />
        </p>
      </div>
    </div>        
  )
}

