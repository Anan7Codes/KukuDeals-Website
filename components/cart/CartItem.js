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
<div >
          <div className="bg-white flex  items-center lg:justify-start h-44 rounded-t-3xl my-6">
                <div className=" bg-white cursor-pointer rounded-[15px] object-fit -left-2 relative ml-10 mt-2 border border-gray-200 w-32 h-28">
                    <Image
                        src={item?.Image}
                        layout="fill"
                        alt="product logo"
                    />
                </div>
                <div className="flex pl-1 pt-2 	">
                    <div className="">

                        <p className=" text-sm sm:text-base lg:text-xl font-bold leading-2">
                            {item?.GiftName.en}
                        </p>
                        <p className="text-sm sm:text-base lg:text-xl pt-1 leading-2 lg:leading-3">
                            {item?.ProductName.en}
                        </p>
                        <p className="font-bold text-sm sm:text-base lg:text-xl lg:pt-3 text-blue-500">
                            AED{item?.Price}.00
                        </p>
                        <p className="text-xs font-semibold lg:pt-3 text-green-500">
                            {item?.SoldOutCoupons} Coupons
                            <span className="text-black font-normal"> per unit</span>
                        </p>
                    </div>

                    <div className=" sm:flex lg:flex  sm:ml-12 lg:ml-16 leading-extra-loose">
                        <div className="hidden sm:flex lg:flex">
                            <svg onClick={item?.qty === 1 ? RemoveFromCart : ReduceQty}
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-12 w-16 mr-4 rounded-[15px] bg-gray-200 cursor-pointer"
                                fill="none"
                                viewBox="0 0 18 20"
                                stroke="#808080"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1}
                                    d="M12 10H6"
                                />
                            </svg>
                            <div className="pt-2 pl-6 h-12 w-16 text-xl rounded-[15px] text-[#808080] bg-gray-200 mr-4">
                                {item?.qty}
                            </div>
                        </div>
                        <div className=" sm:hidden lg:hidden pl-3 pr-4" >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 bg-[#0073ff] text-white rounded-full cursor-pointer"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                />
                            </svg>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 bg-gray-300 rounded-full cursor-pointer"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M18 12H6"
                                />
                            </svg>
                        </div>
                        <button onClick={AddQty} className="hidden sm:flex lg:flex justify-center items-center cursor-pointer text-blue-500 border border-gray-300 font-semibold h-12 w-28 rounded-[15px]">
                            Add More
                        </button>
                    </div>
                </div>
            </div>
            <div className="bg-[#5dd74b] text-right h-12 rounded-b-3xl">
          <p className="text-white text-xs lg:text-sm mr-3 pt-1">
            Donate these product(s) to double the ticket(s)
            <ToggleSwitch sx={{ m: 1 }} defaultChecked />
          </p>
        </div>
        </div>
        
    )
}

