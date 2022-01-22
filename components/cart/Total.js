import React, { useState } from "react";
import ToggleSwitch from "../ToggleSwitch";
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

export default function Total() {
    const [paymentInfo,setPaymentInfo] = useState(false)
    const handlePayingOptions = ()=>{
        setPaymentInfo(true)
    }
    const handlePaymentOff =() =>{
        setPaymentInfo(false)
    }
  return (
    <div className="conatainer">
      <div className="bg-white rounded-[15px] mb-4 mt-3 p-5 leading-extra-loose h-60 w-[20rem] divide-y">
        <div className="flex text-2xl font-bold justify-between pb-6">
          <p>Total</p>
          <p className="pt-3 absolute mt-4 text-sm font-normal">
            Inclusive of VAT
          </p>
          <p>AED30.00</p>
        </div>
        <div className="flex justify-between text-sm pb-3 pt-3">
          <p>Subtotal</p>
          <p>AED28.57</p>
        </div>
        <div className="flex justify-between text-sm pb-3 pt-3">
          <p>VAT</p>
          <p>AED28.57</p>
        </div>
        <div className="flex pt-3 text-center text-sm pb-3">
          <ToggleSwitch />
          <p className="pl-3 text-sm ">Use points Avl.50(AED5.00)</p>
        </div>
      </div>
      <div>
        <div className="bg-white w-[20rem] h-[4.5rem] mb-4 rounded-[15px]">
          <input
            placeholder="Promo Code"
            className="border border-gray-400 pl-3  ml-5 mt-4 outline-none text-xs rounded w-48 h-9"
          />
          <button className="ml-3 text-blue-500 border h-9 w-20 rounded text-xs font-semibold border-blue-500">
            Apply
          </button>
        </div>
      </div>
      <div>
        <div className="bg-white divide-y rounded-t-xl">
          <div>
            <p className="text-2xl font-bold pl-5 pt-3 pb-3 text-gray-700">
              Payment Method
            </p>
          </div>
        
        </div>
        {paymentInfo? <>
        
        
            <div className= "w-[20rem] bg-white">
            <div className="flex justify-between  pt-2 ">

            <p className="text-lg pl-5">Add Credit or Debit Card</p>
            <button className="text-blue-500 pr-5 text-sm" onClick={handlePaymentOff}>Cancel</button>
            </div>
            <div className="ml-4 mr-4">
            <input
            placeholder="Credit or Debit Card Number"
            className="border border-gray-400 pl-3 w-full mt-4 outline-none text-xs rounded-[10px] h-14"
          />
         
          <div className="flex justify-between mt-4">
          <input
            placeholder="Expiry Date"
            className="border border-gray-400 pl-3 outline-none text-xs rounded-[10px] w-36 h-14"
          /> <input
            placeholder="Security Code"
        className="border border-gray-400 pl-3 outline-none text-xs rounded-[10px] w-32 h-14"
          />
          </div>
            </div>
            <div className="flex text-xs text-gray-400">

            <Checkbox {...label} defaultChecked />
            <p className="pt-3">Save card to account</p>
            </div>
        </div>
        </> : 
          <div className="flex p-3 hover:bg-gray-100 hover:rounded-b-2xl cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 bg-gray-200 rounded-full cursor-pointer"
              onClick={handlePayingOptions}
            fill="none"
            viewBox="0 0 24 24"
            stroke="#ffffff"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          <p className="pl-3 text-sm text-gray-700 font-semibold">
            Add new card
          </p>
        </div>}
        <button className="bg-gray-200 p-3 mt-4 w-full text-white font-bold h-16 rounded-[10px]">
          Pay now
        </button>
      </div>
    </div>
  );
}
