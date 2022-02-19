import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CartButton from "./CartButton";
import Cart from "./Cart";
import { CartState } from "@/contexts/cart/CartContext";

export default function CartRight() {
  const [showCart, setShowCart] = useState(true);
  const [couponCount, setCouponCount] = useState();
  const router = useRouter();

  const handleCart = (e) => {
    setShowCart(false);
  };
  const handleClick = () => {
    router.push("/cart");
  };
  const {
    state: { cart },
  } = CartState();

  useEffect(() => {
    setCouponCount(
      cart.reduce((acc, curr) => acc + Number(curr.SoldOutCoupons), 0)
    );
  }, [cart]);
  return (
    <div>
      {showCart ? (
        <div
          className="grid justify-items-end absolute"
          onMouseLeave={handleCart}
        >
          <div className="bg-[#161616] drop-shadow-lg container w-[25rem] max-h-[30rem] bottom-6 right-2 rounded-[15px] fixed z-20">
            <div className="overflow-y-auto space-x-5 max-h-72">
              {cart.map((item) => {
                return <Cart item={item} key={item.id} />;
              })}
            </div>
            <div className="bg-[#161616] rounded-2xl">
              { cart.length ?
                <>
                <div className="mx-3 divide-y leading-extra-loose text-[13px]">
                  <div className="flex justify-between text-white">
                    <p>Total Product</p>
                    <div className="flex pr-4">
                      <p>{cart.length}</p>
                    </div>
                  </div>
                  <div className="flex justify-between text-white">
                    <p>Total Coupons</p>
                    <div className="flex pr-4">
                      <p>{couponCount}</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <button
                    onClick={handleClick}
                    className="bg-[#ffd601] rounded-[15px] text-base font-medium text-black p-4 py-2 mt-2 mb-4"
                  >
                    Continue to Checkout
                  </button>
                </div>
                </>
                :
                <p className="text-white text-center p-4">No items in checkout</p>              
              }
            </div>
          </div>
        </div>
      ) : (
        <CartButton />
      )}
    </div>
  );
}
