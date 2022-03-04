import { useRouter } from "next/router";
import { useState } from "react";
import CartButton from "./CartButton";
import Cart from "./Cart";
import { CartState } from "@/contexts/cart/CartContext";

export default function CartRight() {
  const [showCart, setShowCart] = useState(true);
  const router = useRouter();

  const handleCart = () => {
    setShowCart(false);
  };
  const handleClick = () => {
    router.push("/cart");
  };
  const {
    state: { cart },
  } = CartState();

  return (
    <div>
      {showCart ? (
        <div
          className="grid justify-items-end absolute"
          onMouseLeave={handleCart}
        >
          <div className="bg-[#161616] drop-shadow-lg container w-[25rem] max-h-[30rem] bottom-6 right-2 rounded-[15px] fixed z-20">
            <div className="flex justify-between">
              <p className="text-[#ffd601] font-bold ml-4 mt-4 text-2xl font-title">Item(s)</p>
            </div>
            <div className="overflow-y-auto max-h-72">
              {cart.map((item) => {
                return <Cart item={item} key={item.id} />;
              })}
            </div>
            <div className="bg-[#161616] rounded-2xl">
              { cart.length ?
                <>
                <div className="flex justify-center pt-4">
                  <button
                    onClick={handleClick}
                    className="bg-[#ffd601] rounded-[10px] text-sm font-semibold text-black px-8 py-4 mt-2 mb-4"
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
