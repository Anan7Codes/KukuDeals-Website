import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Cart(props) {
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
  return <div>
      <div className=" text-sm font-semibold text-gray-700 pl-6 pr-6 pt-2">
              <div className="flex justify-between">
                <p>Donatable Product(s)</p>
              </div>
              <div className="flex justify-between pt-4">
                <div className=" bg-white cursor-pointer rounded-[15px] object-fit -left-2 relative w-32 h-24">
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
        </div>
}
