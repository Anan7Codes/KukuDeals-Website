import Image from "next/image";
export default function Coupon({ order }) {
    return (
        <>
            {order.coupons.map(item => {
                return (   
                    <div className="bg-[#2c2c2c] flex flex-col mb-10 px-10 max-w-[400px] rounded-[15px]" key={item.id}>
                        <div className="w-full flex justify-center">
                            <div className="relative w-48 h-48 mt-10">
                                <Image src={`${JSON.parse(item)?.image}`} layout="fill" alt="Coupon Image" />
                            </div>
                        </div>
                        <div className="flex items-center mt-8">
                            <p className="text-[#ffd601] font-semibold mr-2">Draws:</p>
                            <p className="text-white">{JSON.parse(item)?.name}</p> 
                        </div>
                        <div className="flex items-center">
                            <p className="text-[#ffd601] text-left font-semibold mr-2">Purchased On:</p>
                            <p className="text-white">{order?.created_at.split('T')[0]}</p>
                        </div>
                        <div className="flex items-center">
                            <p className="text-[#ffd601] text-left font-semibold mr-2">Amount:</p>
                            <p className="text-white">AED {JSON.parse(item)?.product_qty * JSON.parse(item)?.product_price}</p>
                        </div>
                        <div className="flex flex-col pb-10">
                            <p className="text-[#ffd601] text-left font-semibold mr-2">Coupons No(s):</p>
                            {JSON.parse(item)?.product_coupons.map((coupon, i) => {
                                 return (
                                    <p className="text-white" key={i}>{coupon}</p>
                                 )
                            })}
                            
                        </div>
                    </div>                 
                    // <div className="flex-col bg-[#2c2c2c] flex justify-center items-center rounded-[25px] mb-10 pb-10"  key={item.id}>
                    //     <div className="relative lg:top-5 mb-10 lg:w-48 h-40 mt-8 w-36">
                    //         <Image src={`${JSON.parse(item)?.image}`} layout="fill" alt="Coupon Image" />
                    //     </div>
                    //     <div>
                    //         <div className="flex flex-row">
                    //             <p className="text-[#ffd601] font-title font-bold">
                    //                 Draw:&nbsp;
                    //             </p>
                    //             <p className="text-white font-bold font-sans -mt-[3px]">
                    //                 {JSON.parse(item)?.name}
                    //             </p>
                    //         </div>
                    //         <div>
                    //             <p className="flex text-[#ffd601] font-title font-bold">
                    //                 Purchased On:&nbsp;
                    //                 <div>
                    //                     <p className="text-white font-bold font-sans -mt-[3px]">
                    //                         {order?.created_at.split('T')[0]}
                    //                     </p>
                    //                 </div>
                    //             </p>
                    //         </div>
                    //         <div>
                    //             <p className="flex text-[#ffd601] font-title font-bold">
                    //                 Amount:&nbsp;
                    //                 <div>
                    //                     <p className="text-white font-bold font-sans -mt-[3px]">
                    //                         AED {JSON.parse(item)?.product_qty * JSON.parse(item)?.product_price}
                    //                     </p>
                    //                 </div>
                    //             </p>
                    //         </div>
                    //         <p className="flex text-[#ffd601] font-title font-bold">Coupons No(s):</p>
                    //         {JSON.parse(item)?.product_coupons.map((coupon, i) => {
                    //             return (
                    //                 <p className="text-white" key={i} >{coupon}</p>
                    //             )
                    //         })}
                    //     </div>
                    // </div>
                )
            })}
        </>

    )
}
