import { CartState } from "@/contexts/cart/CartContext";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { toast } from "react-toastify";

export default function Cart({ item }) {
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
      <div className="text-sm font-semibold text-white pt-2 mt-4">
        <div className="flex justify-between">
          <div className={`${i18n.language === 'ar' ? 'mr-8' : 'ml-8'} flex`}>
            <div className="-left-2 relative w-20 h-20">
              <Image
                src={item?.Image}
                layout="fill"
                alt="product logo"
              />
            </div>
            <div className="px-2">
              <p className="text-normal font-bold">
                {i18n.language === 'ar' ? item?.GiftName.ar : item?.GiftName.en}
              </p>
              <p>{i18n.language === 'ar' ? item?.ProductName.ar : item?.ProductName.en}</p>
              <p className="font-bold text-[#ffd601]">{t('aed')} {item?.Price}.00</p>
              <div className="text-sm font-semibold text-green-500">
              {item.donate === "true" ? t('2-coupons') : t('1-coupon')}
                <span className="text-white font-normal"> {t('per-unit')}</span>
              </div>
            </div>
          </div>
          <div className={`${i18n.language === 'ar' ? 'ml-8' : 'mr-8'} leading-extra-loose`}>
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
      :
      <div>
        <p>No items added to cart</p>
      </div>
    }
  </div>
}
