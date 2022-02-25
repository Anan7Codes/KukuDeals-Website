import Image from "next/image";
export default function Coupon({ order }) {
    return (
        <>
            {order.coupons.map(item => {
                return (
                    
                    <div className="flex-col bg-black flex justify-center items-center rounded-[15px]  pl-4 mb-10  mr-14 pb-10 lg:w-[40rem]"  key={item.id}>
                        <div className="relative lg:top-5 mb-10 lg:w-64 h-36 mt-8 w-36 lg:h-64">
                            <Image src={`${JSON.parse(item)?.image}`} layout="fill" alt="Coupon Image" />
                        </div>
                        <div className="">
                            <div>
                                <p className="flex pb-4 text-[#ffd601] font-title font-bold">
                                    Draw:&nbsp;
                                    <div>
                                        <p className="text-white font-bold font-sans -mt-[3px]" >
                                            {JSON.parse(item)?.name}
                                        </p>
                                    </div>
                                </p>
                            </div>
                            <div>
                                <p className="flex pb-4 text-[#ffd601] font-title font-bold">
                                    Purchased On:&nbsp;
                                    <div>
                                        <p className="text-white font-bold font-sans -mt-[3px]" >
                                            {order?.created_at.split('T')[0]}
                                        </p>
                                    </div>
                                </p>
                            </div>
                            <div>
                                <p className="flex pb-4 text-[#ffd601] font-title font-bold">
                                    Amount:&nbsp;
                                    <div>
                                        <p className="text-white font-bold font-sans -mt-[3px]" >
                                            AED {JSON.parse(item)?.product_qty * JSON.parse(item)?.product_price}
                                        </p>
                                    </div>
                                </p>
                            </div>
                            <p className="flex text-[#ffd601] mb-3 font-title font-bold">Coupons No(s):</p>
                            {JSON.parse(item)?.product_coupons.map((coupon, i) => {
                                return (
                                    <p className="text-white" key={i} >{coupon}</p>
                                )
                            })}
                        </div>
                    </div>
                )
            })}
        </>

    )
}
