import { CartState } from "@/contexts/cart/CartContext";
import Image from "next/image";
import Switch from "react-switch";

export default function CartItem({ item }) {
  const {
    state: { cart },
  } = CartState();
  const { dispatch } = CartState();

  const AddQty = () => {
    dispatch({
      type: "ADD_QTY",
      payload: item,
    });
  };

  const ReduceQty = () => {
    dispatch({
      type: "REDUCE_QTY",
      payload: item,
    });
  };

  const RemoveFromCart = () => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: item,
    });
  };

  const Donate = () => {
    dispatch({
      type: "DONATE",
      payload: item,
    });
  };

  const DontDonate = () => {
    dispatch({
      type: "DONT_DONATE",
      payload: item,
    });
  };
  return (
    <div>
      <div className="bg-[#2c2c2c] flex items-center lg:justify-start h-44 rounded-t-3xl mt-6">
        <div className="cursor-pointer rounded-[15px] object-fit -left-2 relative ml-10 mt-2 w-32 h-28">
          <Image src={item?.Image} layout="fill" alt="product logo" />
        </div>
        <div className="flex flex-col lg:flex-row pl-1 pt-2">
          <div className="">
            <p className=" text-sm sm:text-base font-title text-[#ffd601] lg:text-xl font-bold leading-2">
              {item?.GiftName.en}
            </p>
            <p className="text-white text-sm sm:text-base lg:text-xl pt-1 leading-2 lg:leading-3">
              {item?.ProductName.en}
            </p>
            <p className="font-bold text-sm sm:text-base lg:text-xl lg:pt-3 text-white">
              AED{item?.Price}.00
            </p>
            <p className="text-xs font-semibold lg:pt-3 text-green-500 ">
              {item.donate === "true" ? '2 Coupons' : '1 Coupon'}
              <span className="text-white font-normal"> per unit</span>
            </p>
          </div>

          <div className="flex sm:ml-12 lg:ml-16 mt-4 leading-extra-loose">
            <button
              onClick={item?.qty === 1 ? RemoveFromCart : ReduceQty}
              className="flex justify-center items-center text-sm lg:text-md  cursor-pointer text-white bg-[#161616] font-semibold h-10 w-10 lg:h-12 lg:w-16 rounded-[15px]"
            >
              -
            </button>
            <div className="flex font-semibold items-center justify-center h-10 w-10 lg:h-12 lg:w-16 text-sm lg:text-md rounded-[15px] text-white bg-[#161616] mx-3">
              {item?.qty}
            </div>
            <button
              onClick={AddQty}
              className="flex justify-center items-center cursor-pointer bg-[#ffd601] text-black font-semibold h-10 w-20 lg:h-12 lg:w-28 text-sm lg:text-md rounded-[15px]"
            >
              Add More
            </button>
          </div>
        </div>
      </div>
      <div className="bg-[#2c2c2c] text-right h-12 flex justify-end rounded-b-3xl">
        <div className=" mr-2">
          <Switch onChange={item.donate === "true" ? DontDonate : Donate} checked={item.donate === "true" ? true : false}
            onColor="#161616"
            offColor="#767577"
            uncheckedIcon={false}
            checkedIcon={false}
            offHandleColor="#fffff"
            onHandleColor="#ffd601"
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
          />
        </div>
        <div>
          <p className="text-white text-xs lg:text-sm mr-3 pt-1">
            Donate these product(s) to double the ticket(s)
          </p>
        </div>
      </div>
    </div>
  );
}
