import Payment from "@/components/cart/Payment";
import { CartState } from "@/contexts/cart/CartContext";
import CartItem from "./CartItem";

export default function CartPage() {
  const { state: { cart } } = CartState();

  if (cart.length === 0 ) return (<p className="text-white">No items added to cart</p>)

  return (
    <div className="lg:grid grid-cols-12 my-4">
      <div className="col-span-9 lg:w-[95%]">
        <p className="text-4xl font-bold font-title text-[#ffd601]">Cart</p>
        {cart.map(item => {
          return (<CartItem item={item} key={item.id} />)
        })}
      </div>
      <div className="col-span-3">
        <Payment />
      </div>
    </div>
  );
}
