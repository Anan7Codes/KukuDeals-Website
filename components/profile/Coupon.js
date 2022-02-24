import Image from "next/image";

export default function Coupon({ order }) {
    console.log(order)
    return (
        <div className=" ">
            <>
                {order.coupons.map(item => {
                    return (
                        <div >
                            <div className="flex flex-col bg-black  rounded-[15px] mb-10 max-height pb-10">
                                <div className="relative lg:top-5  flex justify-center items-center lg:w-[28rem] h-36 w-60 lg:h-64">
                                    <Image src={`${JSON.parse(item)?.image}`} layout="fill" alt="Coupon Image" />
                                </div>
                                <div className="pl-5">
                                    <p className="flex text-[#ffd601] font-title font-bold" > Draw:&nbsp;&nbsp; <p className="text-white font-bold">{JSON.parse(item)?.name}</p></p>
                                    <p className="flex text-[#ffd601] font-title font-bold">Purchased On: &nbsp;&nbsp;<p className="text-white font-bold">{order?.created_at.split('T')[0]}</p></p>
                                    <p className="flex pb-4 text-[#ffd601] font-title font-bold">Amount: &nbsp;&nbsp;<p className="text-white font-bold" >AED {JSON.parse(item)?.product_qty * JSON.parse(item)?.product_price}</p></p>
                                    <p className="flex text-[#ffd601] font-title font-bold">Coupons No(s):</p>
                                    {JSON.parse(item)?.product_coupons.map((coupon, i) => {
                                        return (
                                            <p className="text-white" key={i} >{coupon}</p>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </>

        </div>
    )
}
