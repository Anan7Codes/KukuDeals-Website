import Image from "next/image";
import { useRouter } from "next/router";

export default function ActiveCoupons() {
    const router = useRouter();
    return (
        <div>
            <div className="flex flex-col  justify-center items-center lg:ml-48">
                <div className=" relative  top-0 left-0 opacity-50  hover:shadow-outline w-40 h-40 cursor-pointer">
            <Image
              src="/icons/coupon.png"
              layout="fill"
              alt="product logo"
            />
          </div> 
              <p className="pt-3 text-white pb-4 text-center">You can view active coupons after you make purchase</p>
              <button onClick={ ()=>router.push('/')} className="bg-[#ffd601] hover:bg-[#cfb429] font-semibold  text-black w-72 h-14 text-center  rounded-[10px]">
                  Start Shopping
              </button>
                </div>
        </div>
    )
}
