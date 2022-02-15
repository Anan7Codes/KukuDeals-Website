import React, { useState } from "react";
import Checkbox from '@mui/material/Checkbox';
import Total from "./Total";
import mail from '@sendgrid/mail';
mail.setApiKey(process.env)

const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

export default function Payement() {
  const [paymentInfo, setPaymentInfo] = useState(false)
  const handlePayingOptions = () => {
    setPaymentInfo(true)
  }
  const handlePaymentOff = () => {
    setPaymentInfo(false)
  }
  const PdfGenerator = async() => {
  
  }
  return (
    <div className="">
      <Total />
      <div>
        {paymentInfo ? <>
          <div className=" bg-white  rounded-b-2xl">
            <div className="flex justify-between">

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
          <div className="flex bg-white rounded-b-2xl cursor-pointer h-10 p-2">
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
            <p className="pl-3 text-sm text-gray-700 font-semibold ">
              Add new card
            </p>
          </div>}
        <button onClick={PdfGenerator} className="bg-gray-200 p-3 mt-4 w-full text-white font-bold h-16 rounded-[10px]">
          Pay now
        </button>
      </div>
    </div>
  );
}
