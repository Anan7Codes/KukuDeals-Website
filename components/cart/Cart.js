import { CartState } from "@/contexts/cart/CartContext";
import Image from "next/image";

export default function Cart({ item }) {

  const { dispatch } = CartState();

  const AddQty = () => {
    dispatch({
      type: 'ADD_QTY',
      payload: item
    })
  }

  const ReduceQty = () => {
    dispatch({
      type: 'REDUCE_QTY',
      payload: item
    })
  }

  const RemoveFromCart = () => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: item
    })
  }

  return <div>
    {item ?
      <div className=" text-sm font-semibold text-white pl-6 pr-6 pt-2">
        <div className="flex justify-between">
          <p>Donatable Product(s)</p>
        </div>
        <div className="flex justify-between pt-4">
          <div className="cursor-pointer rounded-[15px] object-fit -left-2 relative w-32 h-24">
            <Image
              src={item?.Image}
              layout="fill"
              alt="product logo"
            />
          </div>
          <div className="flex pl-1">
            <div>
              <p className="text-normal font-bold">
                {item?.GiftName.en}
              </p>
              <p>{item?.ProductName.en}</p>
              <p className="font-bold text-[#ffd601]">AED{item?.Price}.00</p>
              <div className="text-sm font-semibold text-green-500">
              {item.donate === "true" ? '2 Coupons' : '1 Coupon'}
                <span className="text-white font-normal"> per unit</span>
              </div>
            </div>
            <div className="ml-20 leading-extra-loose">
              <svg
                onClick={AddQty}
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 bg-[#ffd601] text-black rounded-full cursor-pointer"
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
              <p className="text-white px-2 text-sm my-2">{item?.qty}</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                onClick={item.qty === 1 ? RemoveFromCart : ReduceQty}
                className="h-6 w-6 bg-[#2c2c2c] text-white rounded-full cursor-pointer"
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
      :
      <div>
        <p>No items added to cart</p>
      </div>
    }
  </div>
}
