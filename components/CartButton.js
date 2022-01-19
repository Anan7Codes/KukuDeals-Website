import CartRight from "./CartRight";
import { useState } from "react";

export default function CartButton() {
  const [showCart, setshowCart] = useState();
  const [showButton, setshowButton] = useState(true);
  const handleMouseIn = () => {
    setshowCart(true);
    setshowButton(false);
  };

  return (
    <div className="">
<div className='container content-center fixed bottom-4 -right-15 grid justify-items-end pr-20 z-20'>
        {showButton ? (
          <div className="bg-[#0073ff] h-[56px] w-[186px] text-white rounded-[15px] pt-3 ">
            <button onMouseOver={handleMouseIn} className="pl-7 font-normal ">
              {" "}
              Shopping Cart{" "}
            </button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 ml-32 -mt-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
            </svg>
          </div>
        ) : null}
      </div>
      {showCart ? <CartRight showCart={setshowCart} /> : null}
    </div>
  );
}
