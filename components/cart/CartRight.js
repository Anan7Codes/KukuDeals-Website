import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import CartButton from "./CartButton";

export default function CartRight(props) {
  const [showCart, setShowCart] = useState(true);
  const router = useRouter()
  //   const onClose = () => {
  //     props.showCart(false);
  //   };
  const handleCart = (e) => {
    setShowCart(false);
  };
  const handleClick = () => {
    router.push('/cart')
  }
  return (
    <div>
      {showCart ? (
        <div
          className="grid justify-items-end absolute"
          onMouseLeave={handleCart}
        >
          <div className="bg-gray-100 drop-shadow-lg container w-[25rem] h-[22rem] bottom-3  right-10 rounded-[15px] fixed z-20">
            <div className=" text-sm font-semibold text-gray-700 pl-6 pr-6 pt-2">
              <div className="flex justify-between">
                <p>Donatable Product(s)</p>
              </div>
              <div className="flex justify-between pt-4">
                <div className=" bg-white cursor-pointer rounded-[15px] object-fit -left-2 relative w-32 h-24 cursor-pointer">
                  <Image
                    src="/icons/products/product.png"
                    layout="fill"
                    alt="product logo"
                  />
                </div>
                <div className="flex pl-1">
                  <div>
                    <p className="text-normal font-bold">
                      2 DXB license plates
                    </p>
                    <p>Balnco Set</p>
                    <p className="font-bold text-blue-500">AED30.00</p>
                    <div className="text-sm font-semibold text-green-500">
                      2 Coupons
                      <span className="text-black font-normal"> per unit</span>
                    </div>
                  </div>
                  <div className=" ml-20 leading-extra-loose ">
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
                    <div className="text-center">1</div>
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
                </div>
              </div>
            </div>
            <div className="bg-white rounded-b-2xl mt-6">
              <div className="ml-3 divide-y mr-3 leading-extra-loose text-[13px]">
                <div className="flex justify-between  ">
                  <p>Total Product</p>
                  <div className="flex pr-4">
                    <p>1</p>
                  </div>
                </div>
                <div className="flex justify-between">
                  <p>Total Coupons</p>
                  <div className="flex pr-4">
                    <p>2</p>
                  </div>
                </div>
                <div className="flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mt-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z"
                      clipRule="evenodd"
                    />
                    <path d="M9 11H3v5a2 2 0 002 2h4v-7zM11 18h4a2 2 0 002-2v-5h-6v7z" />
                  </svg>
                  <p className="pl-1">
                    You will get free 3 points from this purchase
                  </p>
                </div>
              </div>

              <button onClick={handleClick} className="bg-blue-500 rounded-[15px] text-base font-medium hover:bg-[#2A547E] text-white w-64 h-12 ml-16 mt-2 mb-4 ">
                Continue to Checkout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <CartButton />
      )}
    </div>
  );
}
