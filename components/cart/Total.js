import { CartState } from "@/contexts/cart/CartContext";
import { useEffect, useState } from "react";
import ToggleSwitch from "../ToggleSwitch";

function Total() {
  const [ total, setTotal ] = useState(0)
  const { state: { cart } } = CartState();

  useEffect(() => {
    setTotal(cart.reduce((acc, curr) => acc + Number(curr.Price) * curr.qty, 0))
  }, [cart])
  return <div>
      <div className="  bg-white rounded-[15px] mb-4 mt-3 p-5 leading-extra-loose h-60  divide-y">
        <div className="flex text-2xl font-bold justify-between pb-6">
          <p>Total </p>
          <p className="pt-2 absolute pl-16 lg:pl-0 lg:mt-4 text-sm font-normal">
            (Inclusive of VAT)
          </p>
          <p>AED{total}.00</p>
        </div>
        <div className="flex justify-between text-sm pb-3 pt-3">
          <p>Subtotal</p>
          <p>AED{total*0.95}</p>
        </div>
        <div className="flex justify-between text-sm pb-3 pt-3">
          <p>VAT</p>
          <p>AED{total*0.05}</p>
        </div>
        <div className="flex pt-3 text-center text-sm pb-3">
          <ToggleSwitch />
          <p className="pl-3 text-sm ">Use points Avl.50(AED5.00)</p>
        </div>
      </div>
      <div>
        <div className="bg-white  item-center justify-center h-[4.5rem]  rounded-t-2xl">
          <input
            placeholder="Promo Code"
            className="border border-gray-400 pl-3  ml-5 mt-4 outline-none text-xs rounded w-[70%]  h-9"
          />
          <button className="ml-3 text-blue-500 border h-9 w-[16%]  rounded text-xs font-semibold border-blue-500">
            Apply
          </button>
        </div>
      </div>
  </div>;
}

export default Total;
