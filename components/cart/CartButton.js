import CartRight from "./CartRight";
import { useState } from "react";
import { CartState } from "@/contexts/cart/CartContext";

export default function CartButton() {
  const [showCart, setshowCart] = useState();
  const [showButton, setshowButton] = useState(true);
  const handleMouseIn = () => {
    setshowCart(true);
    setshowButton(false);
  }
  const {state: {cart}} = CartState();

  return (
    <>
      <div className='fixed container content-center bottom-4 right-2 lg:right-8 grid justify-items-end z-20'>
        {showButton ? (
          <div onMouseOver={handleMouseIn}>
            <div className="flex">
              <div className="bg-[#161616] py-4 px-4 flex items-center justify-center relative text-white rounded-[15px]">
                <button className="font-normal">
                  <p className="hidden lg:flex">Shopping Cart</p>
                </button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-2 h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  >
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                </svg>
                { cart.length ?
                  <div className=" absolute -top-2 right-0 rounded-full bg-[#ffd601]">
                    <p className="text-xs font-bold text-black px-2 py-1">{cart.length? cart.length : null}</p>  
                  </div> 
                  :
                  null
                }               
              </div>
            </div>          
          </div>
        ) : null}
      </div>
      {showCart ? <CartRight showCart={setshowCart} /> : null}
    </>
  );
}
