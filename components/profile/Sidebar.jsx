import { useState } from "react";
import { FaAddressCard } from "react-icons/fa";
import { RiCoupon2Fill, RiLogoutBoxRLine } from "react-icons/ri";
import Address from "@/components/profile/Address";
import Coupon from "@/components/profile/Coupon";
import ProfileDetails from "@/components/profile/ProfileDetails";
import Settings from "@/components/profile/Settings";
import { nhost } from "@/utils/nhost";
import User from "./User";
import { useRouter } from "next/router";

export default function Sidebar() {
  const [showPersonalDetails, setShowPersonalDetails] = useState(false);
  const [showActiveCoupon, setShowActiveCoupon] = useState(false);
  const [showsSettings, setShowSettings] = useState(false);
  const [showShippingAddress, setShowShippingAddress] = useState(true);
  const [showSidebar, setShowSidebar] = useState(true);
  const router = useRouter()

  const handlePersonalDetails = () => {
    setShowSidebar(false);
    setShowPersonalDetails(true);
    setShowActiveCoupon(false);
    setShowSettings(false);
    setShowShippingAddress(false);
  };
  const handlePersonalDetail = () => {
    setShowSidebar(true);
    setShowPersonalDetails(true);
    setShowActiveCoupon(false);
    setShowSettings(false);
    setShowShippingAddress(false);
  };
  const handleCoupon = () => {
    setShowSidebar(false);
    setShowPersonalDetails(false);
    setShowActiveCoupon(true);
    setShowSettings(false);
    setShowShippingAddress(false);
  };
  const handleCoupons = () => {
    setShowSidebar(true);
    setShowPersonalDetails(false);
    setShowActiveCoupon(true);
    setShowSettings(false);
    setShowShippingAddress(false);
  };
  const handleSettings = () => {
    setShowSidebar(false);
    setShowPersonalDetails(false);
    setShowActiveCoupon(false);
    setShowSettings(true);
    setShowShippingAddress(false);
  };
  const handleSetting = () => {
    setShowSidebar(true);
    setShowPersonalDetails(false);
    setShowActiveCoupon(false);
    setShowSettings(true);
    setShowShippingAddress(false);
  };
  const handleShipping = () => {
    setShowSidebar(false);
    setShowPersonalDetails(false);
    setShowActiveCoupon(false);
    setShowSettings(false);
    setShowShippingAddress(true);
  };
  const handleShippings = () => {
    setShowSidebar(true);
    setShowPersonalDetails(false);
    setShowActiveCoupon(false);
    setShowSettings(false);
    setShowShippingAddress(true);
  };
  const handleSidebar = () => {
    setShowSidebar(true);
    setShowPersonalDetails(false);
    setShowActiveCoupon(false);
    setShowSettings(false);
    setShowShippingAddress(false);
  };
  const handleLogout = () => {
    nhost.auth.signOut()
    router.push('/');
  }
  return (
    <div>
      <div className=" lg:grid grid-rows-2 grid-flow-col justify-start">
       <User/>
        <div>
          {showSidebar ? (
            <div className=" row-span-2 col-span-2 bg-white lg:w-[21rem] divide-y mb-5 rounded-[25px] text-sm text-gray-700 cursor-pointer">
              <div
                className="hidden lg:flex p-4"
                onClick={handlePersonalDetail}
              >
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
              <div
                className="lg:hidden flex p-4"
                onClick={handlePersonalDetails}
              >
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

              <div className="hidden lg:flex p-4" onClick={handleCoupons}>
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
              <div className="lg:hidden flex p-4" onClick={handleCoupon}>
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
              <div className="hidden lg:flex p-4" onClick={handleSetting}>
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
              <div className="lg:hidden flex p-4" onClick={handleSettings}>
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
              <div className="hidden lg:flex p-4" onClick={handleShippings}>
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
              <div className="lg:hidden flex p-4" onClick={handleShipping}>
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
                <p className="pl-3" onClick={handleLogout}>Logout</p>

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
          ) : null}
        </div>
        <div className="row-span-3 p-7 ">
          {showPersonalDetails ? (
            <div>
              <div className="lg:hidden" onClick={handleSidebar}>
                <p>Back to profile</p>
              </div>
              <ProfileDetails />
            </div>
          ) : null}
          {showActiveCoupon ? (
            <div>
              <div className="lg:hidden" onClick={handleSidebar}>
                <p>Back to profile</p>
              </div>
              <Coupon />
            </div>
          ) : null}
          {showsSettings ? (
            <div>
              <div className="lg:hidden" onClick={handleSidebar}>
                <p>Back to profile</p>
              </div>
              <Settings />
            </div>
          ) : null}
          {showShippingAddress ? (
            <div>
              <div className="lg:hidden" onClick={handleSidebar}>
                <p>Back to profile</p>
              </div>
              <Address />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
