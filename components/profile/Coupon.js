import React, { useState, useEffect } from 'react'
import { useTranslation } from "next-i18next"
import Image from 'next/image'
import moment from 'moment'

const Coupon = ({ campaign, activeOrders }) => {
    const { t, i18n } = useTranslation()
    const [ count, setCount ] = useState(0)
    const [ show, setShow ] = useState(true)
    useEffect(() => {
        const GetCount = async () => {
            var tempArr = []
            activeOrders.filter(order => order.coupons.filter(coupon => {
                if(JSON.parse(coupon).product_id === campaign.id) {
                    tempArr.push(JSON.parse(coupon))
                }            
            }))
            var tempCount =  tempArr.reduce((prev, cur) => prev + cur.product_coupons.length,0 )
            setCount(tempCount)           
        }
        GetCount()
    }, [])
    return (
        <>
            <div className='flex items-center justify-between bg-[#2c2c2c] px-4 py-2 mr-2 mb-4 rounded-[15px]'>
                <div>
                    <p className='text-white font-semibold'>{i18n.language === 'ar' ? campaign?.GiftName.ar : campaign?.GiftName.en }</p>
                    <p className='text-white text-sm'>{t('total-coupons')}: {count}</p>
                </div>
                {
                    show ?
                        <svg onClick={() => setShow(false)} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>  
                    :
                    <svg onClick={() => setShow(true)} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                }
                              
            </div>            
            {show ?
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    {activeOrders.map(order => {
                    return (order.coupons.map(coupon => {
                    if(JSON.parse(coupon).product_id === campaign.id) {
                        return (JSON.parse(coupon)?.product_coupons.map((item, i) => {
                            return (
                                <div className="h-[180px] lg:h-[150px] bg-white mr-2 pt-2 my-2 rounded-[15px] relative" key={i}>
                                    <div className="flex">
                                        <div className="flex flex-col justify-between mx-4">
                                            <div>
                                                <p className="font-semibold text-[12px]">{t('coupon-no')}</p>
                                                <p className="text-[10px] font-semibold">{item}</p>
                                            </div>
                                            <div>
                                                <p className="font-semibold text-[12px]">{t('purchase-date')}</p>
                                                <p className="text-[10px] font-semibold">{moment(order?.created_at).format('lll')}</p>
                                            </div> 
                                            <div>
                                                <p className="font-semibold text-[12px] ">{t('product/prize')}</p>
                                                <p className="text-[10px] font-semibold">{JSON.parse(coupon)?.name}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex flex-col justify-between">
                                                <div className="relative w-24 h-8 mx-2">
                                                    <Image
                                                    priority={true}
                                                    src="/kuku-black.png"
                                                    layout="fill"
                                                    alt="KukuDeals logo"
                                                    />
                                                </div>
                                                <div className="relative w-20 h-20 mx-auto">
                                                    <Image
                                                    priority={true}
                                                    src={JSON.parse(coupon)?.image}
                                                    layout="fill"
                                                    alt="Product Logo"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-[#ffd601] absolute bottom-0 min-h-[20px] h-[20px] w-full rounded-b-[15px] text-[#ffd601]">&nbsp;</div>
                                    </div>
                                </div>
                            )
                        }))                     
                    }
                    }))
                })}
                </div>
                : null
            }
        </>
    )
}

export default Coupon