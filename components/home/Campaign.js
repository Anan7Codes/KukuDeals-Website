import { Fragment, useState, useEffect } from 'react'
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { Dialog, Transition } from "@headlessui/react";
import { CartState } from '@/contexts/cart/CartContext';

export default function Campaign({ campaign }) {
    const  { t, i18n } = useTranslation()

    const [isOpen, setIsOpen] = useState(false);
    const [prizeDetails, setPrizeDetails] = useState(true);
    const [qty, setQty] = useState(0)
  
    function closeModal() {
      setIsOpen(false);
    }
  
    function openModal() {
      setIsOpen(true);
    }
  
    const {
      state: { cart },
      dispatch
    } = CartState()
  
    useEffect(() => {
      cart.filter(c => c.id === campaign.id ? setQty(c.qty) : null)
    }, [cart,campaign])
  
    const AddToCart = () => {
      dispatch({
        type: 'ADD_TO_CART',
        payload: campaign
      })
    }
  
    const AddQty = () => {
      dispatch({
        type: 'ADD_QTY',
        payload: campaign
      })
    }
  
    const ReduceQty = () => {
      dispatch({
        type: 'REDUCE_QTY',
        payload: campaign
      })
    }
  
    const RemoveFromCart = () => {
      dispatch({
        type: 'REMOVE_FROM_CART',
        payload: campaign
      })
    }
    if(!campaign?.SoldOut) {
    return (
      <div>
        <div className="z-0 mx-auto rounded-[15px]">
          <div className="w-full relative my-6">
        <div className={`flex flex-col items-center justify-around lg:flex-row h-full pb-6 bg-[#2c2c2c] cursor-pointer rounded-[15px] overflow-visible shadow-lg transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-[101%] duration-700`}>
          <div className={`mt-[60px] lg:mt-0 ${i18n.language === 'ar' ? 'lg:mr-24' : 'lg:ml-24'} flex justify-center items-center`}>
            <div className="relative lg:top-5 lg:w-64 lg:h-64 w-48 h-48">
              <Image src={campaign?.Image} layout="fill" alt="Campaign Image" />
            </div>
          </div>
          <div className={`flex flex-col justify-center w-full mt-6 lg:mt-10 pb-2 lg:ml-12 lg:pb-0`}>
            <div className="text-center sm:pl-4 sm:pt-2 lg:text-justify	lg:text-3xl">
              <p className={`text-md lg:text-2xl text-white ${i18n.language === 'ar' ? 'text-center' : null}`}>
              {t('buy-a')} {i18n.language === 'ar' ? campaign?.ProductName.ar :  campaign?.ProductName.en} {t('for')}: <span className='font-bold'>{t('aed')} {campaign?.Price}</span>
              </p>                
              <p className={`text-white lg:text-3xl font-bold ${i18n.language === 'ar' ? 'text-center' : null}`}>
                <span className="lg:text-3xl font-title lg:pt-6 text-[#ffd601]">{t('win')} </span> 
                {i18n.language === 'ar' ? campaign?.GiftName.ar : campaign?.GiftName.en}
              </p>
              {cart.some(c => c.id === campaign.id) ?
                <div className={`flex justify-center lg:justify-start space-x-2 items-center pt-4`}>
                  <div onClick={cart.some(c => c.id === campaign.id && c.qty === 1) ? RemoveFromCart : ReduceQty} className={`${i18n.language === 'ar' ? 'ml-2' : null} flex text-2xl bg-[#161616] font-semibold py-15 justify-center items-center w-16 h-12 rounded-[10px]`}>
                    <p className="text-white">-</p>
                  </div>
                  <div className={`flex bg-[#161616] font-semibold py-15 justify-center text-lg items-center w-16 h-12 rounded-[10px]`}>
                    <p className="text-white">{qty}</p>
                  </div>
                  <div onClick={AddQty} className="flex bg-[#ffd601] text-black font-semibold text-2xl py-15 justify-center items-center w-16 h-12 rounded-[10px]">
                    <p>+</p>
                  </div>
                </div> :
                <div className={`mt-2 space-x-2 text-sm lg:text-base flex items-center justify-center lg:justify-start`}>
                  <button
                    onClick={openModal}
                    className={`${i18n.language === 'ar' ? 'ml-3' : null} w-36 h-12 lg:w-40 lg:h-12 text-black font-semibold bg-[#ffd601] hover:text-[#ffd601] hover:bg-[#000] hover:border hover:border-[#ffd601] rounded-[10px]`}
                  >
                    {t('prize-details')}
                  </button>
                  <button onClick={AddToCart} className="bg-[#000] w-36 h-12 lg:w-40 lg:h-12 text-[#ffd601] font-semibold hover:bg-[#ffd601] hover:text-black rounded-[10px]">
                  {t('add-to-cart')}
                  </button>
                </div>
              }
              <div className={`flex items-center justify-center lg:justify-start my-4 text-left`}>
                <div className="relative w-6 h-6 mx-2">
                  <Image src="/icons/calendar.png" layout="fill" alt="Calendar Image" />
                </div>
                <div className='flex flex-col'>
                  <p className='text-white font-bold text-xs leading-3'>{t('max-date')}: {campaign?.DrawDate}</p>
                  <p className='text-white text-xs'>{t('sold-out-rule')}</p>
                </div>
              </div>
            </div>

            <div className={`absolute -top-4 ${i18n.language === 'ar' ? '-left-4' : '-right-4'} h-28 w-28 lg:h-32 lg:w-32 p-2 bg-[#161616] rounded-full`}>
              <CircularProgressbar
                value={campaign?.SoldOutCoupons}
                maxValue={campaign?.TotalCoupons}
                strokeWidth={6}
                styles={buildStyles({
                  pathColor: "#ffd601",
                  trailColor: "#161616",
                  backgroundColor: "#2c2c2c"
                })}
                background={true}
              />
              <div className={`flex flex-col text-center absolute top-0 h-20 w-20 mt-7 ml-2 lg:ml-4 ${i18n.language === 'ar' ? 'mr-2 lg:mr-4' : null}`}>
                <p className="text-lg lg:text-2xl font-semibold text-white leading-4 lg:leading-none">
                  {campaign?.SoldOutCoupons}
                </p>
                <p className="text-[9px] font-semibold text-white leading-3 lg:leading-1">
                  {t('sold_out')}
                </p>
                <p className="text-[9px] text-white leading-3 lg:leading-1">
                  {t('total')}
                </p>
                <p className="text-md lg:text-xl font-normal text-white leading-4 lg:leading-none">
                  {campaign?.TotalCoupons}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="fixed ml-2 mr-2 inset-0 z-10" onClose={closeModal}>
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
              style={{ backgroundColor: "#161616" }}
            >
              <div className="inline-block w-full max-w-md p-6 my-8 text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <div className="flex justify-end">
                  <button
                    type="button"
                    className=" px-4 py-2 bg-[#161616] text-white border border-transparent rounded-md hover:text-[#ffd601] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#ffd601]"
                    onClick={closeModal}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <div className="my-4">
                  <div className="relative flex justify-center items-center lg:ml-24 ml-16 w-48 h-48">
                    <Image
                      src={ prizeDetails ? campaign?.ImageGift : campaign?.ImageProduct}
                      layout="fill"
                      alt="Campaign Image"
                    />
                  </div>
                  <div className="absolute -top-8 -left-5 bg-[#161616] w-32 p-2 rounded-full">
                    <CircularProgressbar
                      value={campaign?.SoldOutCoupons}
                      maxValue={campaign?.TotalCoupons}
                      strokeWidth={6}
                      styles={buildStyles({
                        pathColor: "#ffd601",
                        trailColor: "#161616",
                        backgroundColor: "#2c2c2c"
                      })}
                      background={true}
                    />
                    <div className="flex flex-col text-center absolute top-2 left-4 h-20 w-20 mt-5 ml-2 ">
                      <p className="text-lg lg:text-2xl font-semibold text-white leading-4 lg:leading-none">
                        {campaign?.SoldOutCoupons}
                      </p>
                      <p className="text-[9px] font-semibold text-white leading-3 lg:leading-1">
                        {t('sold_out')}
                      </p>
                      <p className="text-[9px] text-white leading-3 lg:leading-1">
                        {t('total')}
                      </p>
                      <p className="text-md lg:text-xl font-normal text-white leading-4 lg:leading-none">
                        {campaign?.TotalCoupons}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-center py-4">
                    <button
                      onClick={() => setPrizeDetails(true)}
                      className={`px-2 ${prizeDetails ? 'text-black bg-[#ffd601]' : 'bg-[#2c2c2c] text-white'} rounded-l-xl text-sm py-3 px-8 font-semibold`}
                    >
                      {t('prize-details')}
                    </button>
                    <button
                      onClick={() => setPrizeDetails(false)}
                      className={`px-2 ${prizeDetails ? 'bg-[#2c2c2c] text-white': 'text-black bg-[#ffd601]'} rounded-r-xl text-sm py-3 px-8 font-semibold`}
                    >
                      {t('product-details')}
                    </button>
                  </div>
                  { prizeDetails ?
                    <>
                      <p className="text-white text-sm">{t('get-a-chance')}:</p>
                      <p className="text-[#ffd601] font-semibold text-2xl">{i18n.language === 'ar' ? campaign?.GiftName.ar : campaign?.GiftName.en}</p>
                      <p className="text-white text-sm">
                      {i18n.language === 'ar' ? campaign?.GiftDescription.ar : campaign?.GiftDescription.en}
                      </p>
                    </>
                    :
                    <>
                      <div className="flex justify-between mb-2">
                        <p className="text-[#ffd601] text-2xl font-semibold">{i18n.language === 'ar' ? campaign?.ProductName.ar : campaign?.ProductName.en}</p>
                        <p className="text-white font-semibold">
                        {t('aed')} {campaign?.Price}
                        </p>
                      </div>
                      <p className="text-sm text-white">
                        {i18n.language === 'ar' ? campaign?.ProductDescription.ar : campaign?.ProductDescription.en}
                      </p>
                    </>
                  }                             
                </div>
                <div className="flex justify-between items-center pt-4 pb-4">
                  <div className="flex-col">
                    <p className="text-lg text-white">{t('buy-a')} {i18n.language === 'ar' ? campaign?.ProductName.ar : campaign?.ProductName.en}</p>
                    <p className="text-base text-[#ffd601] font-semibold">
                      {t('aed')} {campaign?.Price}
                    </p>
                    <p className="text-xs text-white">{t('inclusive')}</p>
                  </div>
                  {cart.some(c => c.id === campaign.id) ?
                    <div className="flex justify-center lg:justify-start space-x-2 items-center pt-4">
                      <div onClick={cart.some(c => c.id === campaign.id && c.qty === 1) ? RemoveFromCart : ReduceQty} className="flex text-2xl cursor-pointer bg-[#2c2c2c] pt-15 pb-15 justify-center items-center w-12 h-12 rounded-[10px]">
                        <p className="text-white  hover:text-[#ffd601]">-</p>
                      </div>
                      <div className="flex bg-[#2c2c2c] py-15 justify-center text-lg items-center w-12 h-12 rounded-[10px]">
                        <p className="text-white">{qty}</p>
                      </div>
                      <div onClick={AddQty} className="flex bg-[#ffd601] cursor-pointer text-black text-2xl pt-15 pb-15 justify-center items-center w-12 h-12 rounded-[10px]" >
                        <p>+</p>
                      </div>
                    </div> :
                    <div className="mt-2 space-x-4 text-sm lg:text-base">
                      <button onClick={AddToCart} className="bg-[#ffd601] w-32 h-12 lg:w-32 lg:h-12 text-black text-sm font-semibold hover:bg-[#ffd601] rounded-[10px]">
                        {t('add-to-cart')}
                      </button>
                    </div>
                  }
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
            </div>
        </div>
    )
} else return null
}
