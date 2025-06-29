import React, { useState, useEffect } from "react";
import Image from 'next/image'
import { CartState } from "@/contexts/cart/CartContext";
import { useRouter } from "next/router";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useUser } from '@/contexts/user/UserContext';
import { useTranslation } from "next-i18next";

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function Payment() {
    const { t, i18n } = useTranslation()
    const { user } = useUser();
    const router = useRouter();
    const { locale } = useRouter()

    const [ promoCode, setPromoCode ] = useState('')
    const [ promoCodeApplied, setPromoCodeApplied ] = useState(false)
    const [ promoResp, setPromoResp ] = useState({}) 
    const [ total, setTotal ] = useState(0)
    const [ clientTotal, setClientTotal ] = useState(0)
    const { state: { cart } } = CartState();
    const [ loading, setLoading ] = useState(false);
    const [ promoLoading, setPromoLoading ] = useState(false);   

    const EnterPromoCode = async () => { 
        setPromoLoading(true)
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/promocodes/enter-promo-code`, {
                promoCode: promoCode,
                user_id: user.id,
                cart: cart
            })
            setPromoLoading(false)
            if(!res.data.success) {
                alert(`Error: ${res.data.message}`)
                setPromoCode('')
                setPromoLoading(false)
                return
            }

            setPromoResp(res.data.data)
            if(res.data.data.type) {
                const tot = clientTotal - res.data.data.value
                if(tot < res.data.data.max_amount) {
                    setClientTotal(tot)
                } else {
                    setClientTotal(clientTotal - res.data.data.max_amount)
                }
            } else {
                const tot = clientTotal - (clientTotal * res.data.data.value / 100)
                if(tot < res.data.data.max_amount) {
                    setClientTotal(tot)
                } else {
                    setClientTotal(clientTotal - res.data.data.max_amount)
                }
            }

            setPromoCodeApplied(true)
            setPromoLoading(false)
        } catch (e) {
            alert(e)
        }
    }

    const RemovePromoCode = () => {
        setPromoCodeApplied(false)
        setClientTotal(total)
    }

    useEffect(() => {
        setTotal(cart.reduce((acc, curr) => acc + Number(curr.Price) * curr.qty, 0))
        const CalculatePromoValue = async (total) => {
            if(!total) return
            if(promoResp.type) {
                const tot = total - promoResp.value
                if(tot < promoResp.max_amount) {
                    setClientTotal(tot)
                } else {
                    setClientTotal(total - promoResp.max_amount)
                }
            } else {
                const tot = total - (total * promoResp.value / 100)
                if(tot < promoResp.max_amount) {
                    setClientTotal(tot)
                } else {
                    setClientTotal(clientTotal - promoResp.max_amount)
                }
            }
        }
        promoCodeApplied ? CalculatePromoValue(cart.reduce((acc, curr) => acc + Number(curr.Price) * curr.qty, 0)) : setClientTotal(cart.reduce((acc, curr) => acc + Number(curr.Price) * curr.qty, 0))
    }, [cart])

    const CheckOutSession = async () => {
        setLoading(true)
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/payments/checkout-sessions`, {
                promoCode: promoCodeApplied ? promoCode : null,
                user_id: user.id,
                cart: cart,
                locale: i18n.language,
                platform: "Website"
            })

            if(!response.data.success) return alert(response.data.message)
            router.push(response.data.url)
            setLoading(false)
        } catch (e) {
            alert("checkout", e)
        }
    };

    return (
        <>
            <div className="bg-[#2c2c2c] rounded-[15px] mb-4 mt-3 p-5 leading-extra-loose h-50">
                <div className="flex text-2xl font-bold justify-between pb-6 text-white">
                    <p>{t('total')}</p>
                    <p className="pt-2 text-white absolute pl-16 lg:pl-0 lg:mt-6 text-xs lg:text-sm font-normal">
                        ({t('inclusive')})
                    </p>
                    <p>{t('aed')} {promoCodeApplied ? cart.some( c => c.donate === "false" ) ? (clientTotal + 20).toFixed(2) : clientTotal.toFixed(2) : cart.some( c => c.donate === "false" ) ? (total + 20).toFixed(2) : total.toFixed(2)}</p>
                </div>
                <div className="flex justify-between text-sm py-1 mt-4 text-white">
                    <p>{t('subtotal')}</p>
                    <p>{t('aed')} {promoCodeApplied ? (clientTotal*0.95).toFixed(2) : (total*0.95).toFixed(2)}</p>
                </div>
                <div className="flex justify-between text-sm py-1 text-white">
                    <p>{t('vat')}</p>
                    <p>{t('aed')} {promoCodeApplied ? (clientTotal*0.05).toFixed(2) : (total*0.05).toFixed(2)}</p>
                </div>
                {cart.some( c => c.donate === "false" ) ?
                    <div className="flex justify-between text-sm py-1 text-white">
                        <p>{t('delivery-fee')}</p>
                        <p>{t('aed')} 20.00</p>
                    </div>
                :null}
            </div>
            {cart.some( c => c.donate === "false" ) ?
                <div className="bg-[#2c2c2c] rounded-[15px] mb-4 mt-3 p-5 min-h-50">
                    <div className="flex">
                        <div>
                            <p className="font-semibold font-title text-[#ffd601] text-lg">{t('deliver-to-your-address')}</p>
                            <p className="text-white text-xs">
                                {t('spend')} <span className="font-bold">{t('aed')} 20</span> {t('deliver-para')}.<br/><span className="font-bold">{t('your-coupons')}</span> {t('will-be-used')}
                            </p>
                        </div>
                        <div className=" w-16 h-12 relative">
                            <Image
                                src="/motorbike.png"
                                layout="fill"
                                alt="kuku logo"
                            />
                        </div>
                    </div>
                    {user ?
                        <>
                            <div className="text-sm py-1 mt-4 text-white">
                                <p className="font-semibold font-title text-[#ffd601]">{t('current-address')}</p>
                                <p className="text-white text-xs font-bold">{user.user_metadata.location ? `${user?.user_metadata.countryOfResidence}, ${user?.user_metadata.location}, ${user?.user_metadata.buildingName}, ${user?.user_metadata.apartmentNo}` : 'No address has been added'}</p>
                            </div>
                            <button onClick={() => router.push('/profile/shipping-address')} className="bg-[#ffd601] mt-4 w-full text-sm text-black font-semibold p-4 rounded-[10px]" type="submit" role="link">
                                {t('update-address')}
                            </button>
                        </>
                        : null
                    }
                </div>
                : null
            }
            { user ?
                <>
                    <div className="bg-[#2c2c2c] item-centers justify-center rounded-2xl">
                        { promoCodeApplied ?
                        <div className="flex items-center justify-center px-2 py-2">
                            <p className="text-sm text-white">{t('promo-code')} {promoCode} {t('saving-aed')} {(total - clientTotal).toFixed(2)}</p>
                            <button onClick={RemovePromoCode} className={`${i18n.language === 'ar' ? 'mr-3' : 'ml-3'} text-[#000] border border-[#ffd601] h-11 w-[20%] rounded text-xs font-semibold bg-[#ffd601]`}>
                                {t('remove')}
                            </button>
                        </div>
                        :
                        <div className="flex items-center justify-center">
                            <input
                            placeholder="Promo Code"
                            className={`border border-[#161616] uppercase bg-[#161616] text-white ${i18n.language === 'ar' ? 'pr-3' : 'pl-3'} my-4 outline-none text-xs rounded w-[70%] h-11`}
                            value={promoCode}
                            onChange={e => setPromoCode(e.target.value)}
                            />
                            <button onClick={promoLoading ? null : EnterPromoCode} disabled={promoCode ? false : true} className={`${i18n.language === 'ar' ? 'mr-3' : 'ml-3'} p-2 text-black w-[16%] h-11 rounded text-xs font-semibold bg-[#ffd601]`}>
                                { promoLoading ? <svg role="status" className="h-6 w-[100%] text-[#ffd601] animate-spin fill-black" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                </svg> : t('apply') }
                            </button>              
                        </div>            
                        }
                    </div> 
                    <button onClick={CheckOutSession} className="bg-[#ffd601] mt-4 w-full text-sm text-black font-semibold p-4 rounded-[10px]" type="submit" role="link">
                        { loading ? <svg role="status" className="mr-2 w-full h-8 animate-spin fill-black text-[#ffd601]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg> : t('confirm-order') }
                    </button>
                </>
                :
                <button onClick={() =>  router.push('/signin')} className="bg-[#ffd601] w-full text-sm text-black font-semibold p-4 rounded-[10px]" type="submit" role="link">
                    {t('you-have-to-sign-in')}.
                </button>                
            }
        </>
    );
}
