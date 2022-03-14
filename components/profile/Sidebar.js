import { useState, useEffect } from 'react'
import { FaAddressCard } from "react-icons/fa";
import { RiCoupon2Fill, RiLogoutBoxRLine } from "react-icons/ri";
import { BsFillPhoneFill } from 'react-icons/bs';
import User from "./User";
import { useRouter } from "next/router";
import { supabase } from "@/utils/supabaseClient";
import { useUser } from '@/contexts/user/UserContext';
import { toast } from "react-toastify";
import { useTranslation } from "next-i18next"

export default function Sidebar({ children }) {
  const { t, i18n } = useTranslation()
  const router = useRouter();
  const { user, setUser } = useUser();
  const [phoneNumber, setPhoneNumber] = useState(null)

  useEffect(() => {
    if(!user) {
      router.push('/signin')
    }
    const FetchVerifyStatus = async () => {
      let { data: phone_numbers, error } = await supabase
        .from('phone_numbers')
        .select('number')
        .single()
      console.log("phone", phone_numbers)
      setPhoneNumber(phone_numbers.number)
    }
    FetchVerifyStatus()
  }, [user])

  const SignOutUser = async () => {
    const { error } = await supabase.auth.signOut()
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
    setUser(null)
    toast.success("Signed out successfully", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
    return router.push('/')
}

  return (
    <div className="lg:grid grid-rows-2 grid-flow-col justify-start">
        <User />
        <div className="row-span-2 col-span-2 bg-[#2c2c2c] text-white lg:w-[21rem] divide-y divide-[#161616] mb-3 h-92 rounded-[10px] text-sm cursor-pointer">
          <div className="hidden lg:flex p-4" onClick={() => router.push('/profile/personal-details')}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 "
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <p className={`${i18n.language === 'ar' ? 'px-3' : 'pl-3'}`}>{t('personal-details')}</p>
          </div>
          <div className="lg:hidden flex p-4" onClick={() => router.push('/profile/personal-details')}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 "
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <p className={`${i18n.language === 'ar' ? 'px-3' : 'pl-3'}`}>{t('personal-details')}</p>
          </div>

          <div className="flex p-4" onClick={() => router.push('/profile/active-coupons')}>
            <RiCoupon2Fill className="h-6 w-6" />
            <p className={`${i18n.language === 'ar' ? 'px-3' : 'pl-3'}`}>{t('active-coupons')}</p>
          </div>
          <div className={`flex justify-between items-center p-4 ${phoneNumber ? 'hover:cursor-auto' : null}`} onClick={phoneNumber ? null : () => router.push('/profile/phone-verification')}>
            <div className='flex items-center'>
              <BsFillPhoneFill className="h-6 w-6" />
              <p className={`${i18n.language === 'ar' ? 'px-3' : 'pl-3'}`}>{t('phone-number')}</p>
            </div>
            { phoneNumber ? <p className='bg-green-600 rounded-full px-3'>verified</p> : <p className='bg-yellow-500 rounded-full px-3'>not verified</p> }                      
          </div>
          <div className="hidden lg:flex p-4" onClick={() => router.push('/profile/change-password')}>
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
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <p className={`${i18n.language === 'ar' ? 'px-3' : 'pl-3'}`}>{t('change-password')}</p>
          </div>
          <div className="lg:hidden flex p-4" onClick={() => router.push('/profile/change-password')}>
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
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <p className={`${i18n.language === 'ar' ? 'px-3' : 'pl-3'}`}>{t('change-password')}</p>
          </div>
          <div className="hidden lg:flex p-4" onClick={() => router.push('/profile/shipping-address')}>
            <FaAddressCard className="h-6 w-6" />
            <p className={`${i18n.language === 'ar' ? 'px-3' : 'pl-3'}`}>{t('shipping-address')}</p>
          </div>
          <div className="lg:hidden flex p-4" onClick={() => router.push('/profile/shipping-address')}>
            <FaAddressCard className="h-6 w-6" />
            <p className={`${i18n.language === 'ar' ? 'px-3' : 'pl-3'}`}>{t('shipping-address')}</p>
          </div>
          <div className="flex p-4">
            <RiLogoutBoxRLine className="h-6 w-6"/>
            <p className={`${i18n.language === 'ar' ? 'px-3' : 'pl-3'}`}
              onClick={SignOutUser}>
              {t('logout')}
            </p>
          </div>
        </div>
        <div className="row-span-3 lg:p-7">
          {children}
        </div>
    </div>
  );
}
