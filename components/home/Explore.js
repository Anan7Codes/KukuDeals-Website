import Image from "next/image";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useRouter } from "next/router";


export default function Explore({ campaign }) {
  const [isOpen, setIsOpen] = useState(false);
  const [prizeDetails, setPrizeDetails] = useState(true);
  const [productDetails, setProductDetails] = useState(false);
  const router = useRouter()

  const handleClick = () => {
    router.push('/cart')
  }
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  const handlePrizeDetails = () => {
    setPrizeDetails(true);
    setProductDetails(false);
  };
  const handleProductDetails = () => {
    setProductDetails(true);
    setPrizeDetails(false);
  };
  return (
    <>
      <div className="w-full relative my-10">
        <div className="flex flex-col items-center justify-around lg:flex-row h-[50vh] pb-6 bg-white cursor-pointer rounded-[15px] overflow-visible shadow-lg transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-[102%] duration-300">
          <div className="mt-[60px] lg:mt-0">
            <div className="cursor-pointer absolute top-0 left-0 mt-6 ml-4 hover:shadow-outline w-24 h-10">
              <Image
                src="/icons/explore/shop-logo.png"
                layout="fill"
                alt="sponsor logo"
              />
            </div>
            <div className="relative lg:top-5 lg:left-6 flex justify-center items-center lg:w-[28rem] h-36 w-60 lg:h-64">
              <Image src={campaign?.Image} layout="fill" alt="Campaign Image" />
            </div>
          </div>
          <div className="flex-col w-full pb-6 lg:pb-0">
            <div className="justify-center">
              <div className="text-sm text-center sm:pl-4 sm:pt-2 lg:text-justify	 lg:text-3xl">
                <div className="lg:pt-8">
                  <p className="text-5xl lg:text-7xl font-bold lg:leading-none italic text-[#f22]">
                    Win
                  </p>
                </div>
                <p className="text-lg lg:text-3xl text-gray-600 tracking-tighter font-extrabold leading-6 lg:leading-none">
                  {campaign?.GiftName.en}
                </p>
                <p className="text-lg lg:text-3xl text-gray-700 tracking-tighter leading-4 lg:leading-none font-medium">
                  Buy a {campaign?.ProductName.en} and make it yours!
                </p>
                <p className="text-lg lg:text-3xl tracking-tighter font-bold text-blue-500 lg:leading-none">
                  AED {campaign?.Price}
                </p>
                <div className="mt-4 space-x-2 text-sm lg:text-base">
                  <button
                    onClick={openModal}
                    className="w-32 h-12 lg:w-44 lg:h-12  text-gray-700 font-semibold border border-gray-200 hover:bg-gray-200 rounded-[12px] "
                  >
                    Prize Details
                  </button>
                  <button className="bg-blue-500 w-32 h-12 lg:w-44 lg:h-12 text-white font-semibold hover:bg-blue-400 rounded-[12px]">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>

            <div className="absolute -top-4 -right-4 h-20 w-28  lg:h-28 lg:w-32 p-2 bg-white rounded-full">
              <CircularProgressbar
                value={campaign?.SoldOutCoupons}
                maxValue={campaign?.TotalCoupons}
                strokeWidth={10}
                styles={buildStyles({
                  pathColor: `${
                    campaign?.SoldOutCoupons <= (campaign?.TotalCoupons * 1) / 3
                      ? "#0abf28"
                      : campaign?.SoldOutCoupons >
                          (campaign?.TotalCoupons * 1) / 3 &&
                        campaign?.SoldOutCoupons <=
                          (campaign?.TotalCoupons * 2) / 3
                      ? "#ffff00"
                      : "#ff471a"
                  }`,
                  trailColor: "#e6e6e6",
                })}
              />
              <div className="flex flex-col text-center absolute top-0 h-20 w-20 mt-7 ml-2 lg:ml-4">
                <p className="text-lg lg:text-2xl font-semibold text-gray-600 leading-4 lg:leading-none">
                  {campaign?.SoldOutCoupons}
                </p>
                <p className="text-[9px] font-semibold text-gray-600 leading-3 lg:leading-1">
                  SOLD
                </p>
                <p className="text-[9px] text-gray-400 leading-3 lg:leading-1">
                  OUT OF
                </p>
                <p className="text-md lg:text-xl font-normal text-gray-300 leading-4 lg:leading-none">
                  {campaign?.TotalCoupons}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Transition appear show={isOpen} as={Fragment} >
        <Dialog
          as="div"
          className="fixed  inset-0 z-10 "
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center ">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              
            >
              <Dialog.Overlay className="fixed inset-0 " />
              
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
              style ={{backgroundColor:"#f7fafc"}}

            >
              <div className="inline-block w-full max-w-md p-6 my-8  text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <div className="flex justify-end">
                  <button
                    type="button"
                    className=" px-4 py-2 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
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
                <div className="mt-2">
                  <div className="relative flex justify-center items-center h-52">
                    <Image
                      src={campaign?.Image}
                      layout="fill"
                      alt="Campaign Image"
                    />
                  </div>

                  {prizeDetails ? (
                    <>
                      <div className="absolute -top-8 -left-4   bg-white    lg:h-28 w-32  p-2  rounded-full">
                        <CircularProgressbar
                          value={campaign?.SoldOutCoupons}
                          maxValue={campaign?.TotalCoupons}
                          strokeWidth={10}
                          styles={buildStyles({
                            pathColor: `${
                              campaign?.SoldOutCoupons <=
                              (campaign?.TotalCoupons * 1) / 3
                                ? "#0abf28"
                                : campaign?.SoldOutCoupons >
                                    (campaign?.TotalCoupons * 1) / 3 &&
                                  campaign?.SoldOutCoupons <=
                                    (campaign?.TotalCoupons * 2) / 3
                                ? "#ffff00"
                                : "#ff471a"
                            }`,
                            trailColor: "#e6e6e6",
                          })}
                        />
                        <div className="flex flex-col text-center absolute top-0 h-20 w-20 mt-7 ml-2 lg:ml-4">
                          <p className="text-lg lg:text-2xl font-semibold text-gray-600 leading-4 lg:leading-none">
                            {campaign?.SoldOutCoupons}
                          </p>
                          <p className="text-[9px] font-semibold text-gray-600 leading-3 lg:leading-1">
                            SOLD
                          </p>
                          <p className="text-[9px] text-gray-400 leading-3 lg:leading-1">
                            OUT OF
                          </p>
                          <p className="text-md lg:text-xl font-normal text-gray-300 leading-4 lg:leading-none">
                            {campaign?.TotalCoupons}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-center  h-10 pb-2">
                        <button
                          onClick={handlePrizeDetails}
                          className="bg-white  pr-3 pl-3  text-blue-500 rounded-l-xl text-sm"
                        >
                          Prize Details
                        </button>
                        <button
                          onClick={handleProductDetails}
                          className="opacity-50  pr-2 pl-3  bg-gray-300 rounded-r-xl text-sm"
                        >
                          Product Details
                        </button>
                      </div>
                      <p>Get a chance to win:</p>
                      <p>{campaign?.GiftName.en}</p>
                      <p className="text-sm text-gray-500">
                      {campaign?.GiftDescription.en}                       
                      </p>
                    </>
                  ) : null}
                  {productDetails ? (
                    <>
                     <div className="absolute -top-8 -left-4   bg-white    lg:h-28 w-32  p-2  rounded-full">
                        <CircularProgressbar
                          value={campaign?.SoldOutCoupons}
                          maxValue={campaign?.TotalCoupons}
                          strokeWidth={10}
                          styles={buildStyles({
                            pathColor: `${
                              campaign?.SoldOutCoupons <=
                              (campaign?.TotalCoupons * 1) / 3
                                ? "#0abf28"
                                : campaign?.SoldOutCoupons >
                                    (campaign?.TotalCoupons * 1) / 3 &&
                                  campaign?.SoldOutCoupons <=
                                    (campaign?.TotalCoupons * 2) / 3
                                ? "#ffff00"
                                : "#ff471a"
                            }`,
                            trailColor: "#e6e6e6",
                          })}
                        />
                        <div className="flex flex-col text-center absolute top-0 h-20 w-20 mt-7 ml-2 lg:ml-4">
                          <p className="text-lg lg:text-2xl font-semibold text-gray-600 leading-4 lg:leading-none">
                            {campaign?.SoldOutCoupons}
                          </p>
                          <p className="text-[9px] font-semibold text-gray-600 leading-3 lg:leading-1">
                            SOLD
                          </p>
                          <p className="text-[9px] text-gray-400 leading-3 lg:leading-1">
                            OUT OF
                          </p>
                          <p className="text-md lg:text-xl font-normal text-gray-300 leading-4 lg:leading-none">
                            {campaign?.TotalCoupons}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-center  h-10 pb-2">
                        <button
                          onClick={handlePrizeDetails}
                          className="opacity-50  pr-2 pl-3  bg-gray-300 rounded-l-xl text-sm"
                        >
                          Prize Details
                        </button>
                        <button
                          onClick={handleProductDetails}
                          className="bg-white  pr-3 pl-3  text-blue-500 rounded-r-xl text-sm"
                        >
                          Product Details
                        </button>
                      </div>
                      <div className="flex justify-between mr-10">
                        <p>{campaign?.ProductName.en}</p>
                        <p className="text-blue-500 font-bold pt-2 pb-2">AED {campaign?.Price}</p>
                      </div>
                      <p className="text-sm text-gray-500">
                      {campaign?.ProductDescription.en}                        
                      </p>
                    </>
                  ) : null}
                </div>
                <div className="flex justify-between  pt-4 pb-4">
                  <div className="flex-col ">

                  <p className="text-xl">Buy {campaign?.ProductName.en}</p>
                  <p className="text-base text-blue-500 font-bold">AED {campaign?.Price}</p>
                  <p className="text-xs">Inclusive of VAT</p>
                  </div>
                  <button onClick={handleClick} className="bg-blue-500  rounded-[15px] text-white font-bold h-16 w-[60%]">Add to Cart</button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
