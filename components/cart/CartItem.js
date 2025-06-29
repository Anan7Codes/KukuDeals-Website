import Image from "next/image";
import Switch from "react-switch";
import { CartState } from "@/contexts/cart/CartContext";
import { useTranslation } from "next-i18next";
import { toast } from "react-toastify";

export default function CartItem({ item }) {
  const { t, i18n } = useTranslation()
  const { dispatch } = CartState();

  const AddQty = () => {
    if(item.qty >= (item.TotalCoupons - item.SoldOutCoupons)) {
      return toast.error(t("sorry-no-coupons"), {
        position: i18n.language === 'ar' ? "top-left" : "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
    }
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
      <div className="bg-[#2c2c2c] flex items-center lg:justify-start h-44 rounded-t-[15px] mt-2">
        <div className="cursor-pointer rounded-[10px] object-fit -left-2 relative ml-4 lg:ml-10 mt-2 w-40 h-32">
          <Image src={item?.Image} layout="fill" alt="product logo" />
        </div>
        <div className="flex flex-col lg:flex-row justify-between w-[100%] pl-1 pr-8 pt-2">
          <div>
            <p className=" text-sm sm:text-base text-[#ffd601] lg:text-xl font-semibold leading-2">
              {i18n.language === 'ar' ? item?.GiftName.ar : item?.GiftName.en}
            </p>
            <p className="text-white text-sm sm:text-base lg:text-xl pt-1 leading-2 lg:leading-3">
              {i18n.language === 'ar' ? item?.ProductName.ar : item?.ProductName.en}
            </p>
            <p className="font-semibold text-sm sm:text-base lg:text-xl lg:pt-3 text-white">
              {t('aed')} {item?.Price}.00
            </p>
            <p className="text-xs font-semibold lg:pt-3 text-green-500">
              {item.donate === "true" ? t('2-coupons') : t('1-coupon')}
              <span className="text-white font-normal"> {t('per-unit')}</span>
            </p>
          </div>

          <div className={`flex sm:ml-12 lg:ml-16 ${i18n.language === 'ar' ? 'mx-3' : null} mt-4`}>
            <button
              onClick={item?.qty === 1 ? RemoveFromCart : ReduceQty}
              className="flex justify-center items-center text-lg lg:text-xl cursor-pointer text-white bg-[#161616] font-semibold h-10 w-10 lg:h-12 lg:w-16 rounded-[10px]"
            >
              -
            </button>
            <div className="flex font-semibold items-center justify-center h-10 w-10 lg:h-12 lg:w-16 text-sm lg:text-md rounded-[10px] bg-[#161616] text-white mx-2">
              {item?.qty}
            </div>
            <button
              onClick={AddQty}
              className="flex justify-center items-center cursor-pointer bg-[#ffd601] text-black font-semibold h-10 w-10 lg:h-12 lg:w-16 text-lg lg:text-xl rounded-[10px]"
            >
              +
            </button>
          </div>
        </div>
      </div>
      <div className="bg-[#2c2c2c] text-right h-12 flex justify-end rounded-b-[10px]">
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
          <p className={`text-white text-xs lg:text-sm ${i18n.language === 'ar' ? 'mx-3' : 'mr-3'} pt-1`}>
            {t('donate-products')}
          </p>
        </div>
      </div>
    </div>
  );
}
