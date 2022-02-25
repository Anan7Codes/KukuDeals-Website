import { useEffect } from 'react'
import { FaAddressCard } from "react-icons/fa";
import { RiCoupon2Fill, RiLogoutBoxRLine } from "react-icons/ri";
import User from "./User";
import { useRouter } from "next/router";
import { supabase } from "@/utils/supabaseClient";
import { useUser } from '@/contexts/user/UserContext';
import { toast } from "react-toastify";

export default function Sidebar({ children }) {
  const router = useRouter();
  const { user, setUser } = useUser();

  useEffect(() => {
    if(!user) {
      router.push('/signin')
    }
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
    <div>
      <div className="lg:grid grid-rows-2 grid-flow-col justify-start">
        <User />
        <div className=" row-span-2 col-span-2 bg-[#2c2c2c] text-white lg:w-[21rem] divide-y  divide-[#161616] mb-5 rounded-[25px] text-sm  cursor-pointer">
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
            <p className="pl-3">Personal Details</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 hidden lg:flex lg:ml-[9.3rem] text-gray-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
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
            <p className="pl-3">Personal Details</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 hidden lg:flex lg:ml-[9.3rem] text-gray-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>

          <div className="hidden lg:flex p-4" onClick={() => router.push('/profile/active-coupons')}>
            <RiCoupon2Fill className="h-6 w-6" />
            <p className="pl-3">Active coupons</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 hidden lg:flex ml-[9.5rem] text-gray-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
          <div className="lg:hidden flex p-4" onClick={() => router.push('/profile/active-coupons')}>
            <RiCoupon2Fill className="h-6 w-6" />
            <p className="pl-3">Active coupons</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 hidden lg:flex ml-[9.5rem] text-gray-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
          <div className="hidden lg:flex p-4" onClick={() => router.push('/profile/settings')}>
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
            <p className="pl-3">Settings</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 hidden lg:flex ml-[12.2rem] text-gray-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
          <div className="lg:hidden flex p-4" onClick={() => router.push('/profile/settings')}>
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
            <p className="pl-3">Settings</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 hidden lg:flex ml-[12.2rem] text-gray-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
          <div className="hidden lg:flex p-4" onClick={() => router.push('/profile/shipping-address')}>
            <FaAddressCard className="h-6 w-6" />
            <p className="pl-3">Shipping Address</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 hidden lg:flex ml-[8.5rem] text-gray-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
          <div className="lg:hidden flex p-4" onClick={() => router.push('/profile/shipping-address')}>
            <FaAddressCard className="h-6 w-6" />
            <p className="pl-3">Shipping Address</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 hidden lg:flex ml-[8.5rem] text-gray-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
          <div className="flex p-4">
            <RiLogoutBoxRLine className="h-6 w-6" />
            <p className="pl-3"
              onClick={SignOutUser}>
              Logout
            </p>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 hidden lg:flex ml-[12.5rem] text-gray-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
        <div className="row-span-3 p-7">
          {children}
        </div>
      </div>
    </div>
  );
}
