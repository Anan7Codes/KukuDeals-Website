import Image from "next/image";
import { useTranslation } from "next-i18next"

export default function Coupon({ order }) {
    const { t, i18n } = useTranslation()
    
    return (
        <>
            {order.coupons.map(item => {
                return (   
                    <div className="bg-[#2c2c2c] flex flex-col mb-10 px-10 max-w-[400px] rounded-[10px]" key={item.id}>
                        <div className="w-full flex justify-center">
                            <div className="relative w-48 h-48 mt-10">
                                <Image src={`${JSON.parse(item)?.image}`} layout="fill" alt="Coupon Image" />
                            </div>
                        </div>
                        <div className="flex items-center mt-8">
                            <p className="text-[#ffd601] font-semibold mr-2">{t('draw')}:</p>
                            <p className="text-white">{JSON.parse(item)?.name}</p> 
                        </div>
                        <div className="flex items-center">
                            <p className="text-[#ffd601] text-left font-semibold mr-2">{t('purchased-on')}:</p>
                            <p className="text-white">{order?.created_at.split('T')[0]}</p>
                        </div>
                        <div className="flex items-center">
                            <p className="text-[#ffd601] text-left font-semibold mr-2">{t('amount')}:</p>
                            <p className="text-white">{t('aed')} {JSON.parse(item)?.product_qty * JSON.parse(item)?.product_price}</p>
                        </div>
                        <div className="flex flex-col pb-10">
                            <p className={`text-[#ffd601] text-left font-semibold mr-2 ${i18n.language === 'ar' ? 'text-right' : null}`}>{t('coupon-nos')}:</p>
                            {JSON.parse(item)?.product_coupons.map((coupon, i) => {
                                return (
                                    <p className="text-white" key={i}>{coupon}</p>
                                )
                            })}                            
                        </div>
                    </div>                 
                )
            })}
        </>

    )
}
