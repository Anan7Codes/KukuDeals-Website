import { CartState } from "@/contexts/cart/CartContext";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Cart({ item }) {
  console.log("right cart ", item)
  const [showCart, setShowCart] = useState(true);
  const router = useRouter()
  // const [qty, setQty] = useState()
  const { state: { cart } } = CartState();
  const { dispatch } = CartState();

  const handleCart = (e) => {
    setShowCart(false);
  };
  const handleClick = () => {
    router.push('/cart')
  }
  // useEffect(() => {
  //   cart.filter(c => c.id === item.id ? setQty(c.qty) : null)
  // }, [cart])
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

  const Donate = () => {
    dispatch({
      type: 'DONATE',
      payload: item
    })
  }

  const DontDonate = () => {
    dispatch({
      type: 'DONT_DONATE',
      payload: item
    })
  }
  return <div>
    {item ?
      <div className=" text-sm font-semibold text-gray-700 pl-6 pr-6 pt-2">
        <div className="flex justify-between">
          <p>Donatable Product(s)</p>
        </div>
        <div className="flex justify-between pt-4">
          <div className=" bg-white cursor-pointer rounded-[15px] object-fit -left-2 relative w-32 h-24">
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
              <p className="font-bold text-blue-500">AED{item?.Price}.00</p>
              <div className="text-sm font-semibold text-green-500">
                {item?.SoldOutCoupons} Coupons
                <span className="text-black font-normal"> per unit</span>
              </div>
            </div>
            <div className=" ml-20 leading-extra-loose ">
              <svg
                onClick={AddQty}
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
              <div className="text-center"> {item?.qty}</div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                onClick={item.qty === 1 ? RemoveFromCart : ReduceQty}
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
      :
      <div>
        <p>No items added to cart</p>
      </div>
    }
  </div>
}
