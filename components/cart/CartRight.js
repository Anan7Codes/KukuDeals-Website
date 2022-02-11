import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import CartButton from "./CartButton";
import Cart from "./Cart";

export default function CartRight(props) {
  const [showCart, setShowCart] = useState(true);
  const router = useRouter()
  
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
          <div className="bg-gray-100 drop-shadow-lg container w-[25rem] h-[30rem] bottom-6 right-2 rounded-[15px] fixed z-20">
          <div className=" overflow-y-auto space-x-5 h-72"> 
          <Cart/>
          <Cart/>
          <Cart/>
          <Cart/>
          <Cart/>
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
              <div className="flex justify-center">
                
              <button onClick={handleClick} className="bg-blue-500 rounded-[15px] text-base font-medium hover:bg-[#2A547E] text-white w-64 h-12  mt-2 mb-4 ">
                Continue to Checkout
              </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <CartButton />
      )}
    </div>
  );
}
