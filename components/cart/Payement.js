import React, { useState, useEffect } from "react";
import { CartState } from "@/contexts/cart/CartContext";
import { supabase } from "@/utils/supabaseClient";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import axios from "axios";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function Payement() {
    const userInfo = supabase.auth.user();

    const [ promoCode, setPromoCode ] = useState('')
    const [ promoCodeApplied, setPromoCodeApplied ] = useState(false)
    const [ total, setTotal ] = useState(0)
    const [ clientTotal, setClientTotal ] = useState(0)
    const { state: { cart } } = CartState();

    const [ loading, setLoading ] = useState(false);
    const [ promoLoading, setPromoLoading ] = useState(false);
    const [ clientSecret, setClientSecret ] = useState();
    
    const appearance = {
      theme: 'night',
    };
    const options = {
      clientSecret,
      appearance,
    };

    const fetchPaymentSheetParams = async () => {
      setLoading(true)
      try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payments/create-payment-intent`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ 
                  cart: cart,
                  promoCode: promoCodeApplied ? promoCode : null,
                  user_id: userInfo.id
              })
          });
          const { paymentIntent } = await response.json();
          setClientSecret(paymentIntent);
          setLoading(false)
      } catch (e) {
          console.log("fetchparamserror", e)
      }
    };

  const EnterPromoCode = async () => { 
      setPromoLoading(true)
      try {
          const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/promocodes/enter-promo-code`, {
              promoCode: promoCode,
              user_id: userInfo.id
          })
          console.log(res)
          setPromoLoading(false)
          if(!res.data.success) {
            alert(`Error: ${res.data.message}`)
            setPromoCode('')
            setPromoLoading(false)
            return
          }

          if(confirm(`${res.data.message}`) ==  true) {
            setPromoCodeApplied(true)
            if(res.data.data.type) {
                setClientTotal(clientTotal - res.data.data.value)
            } else {
                setClientTotal(clientTotal - (clientTotal * res.data.data.value / 100))
            }
          } else {
            setPromoCodeApplied(false)
          }
          setPromoLoading(false)
      } catch (e) {
          console.log(e)
      }
  }

  const RemovePromoCode = () => {
      setPromoCodeApplied(false)
      setClientTotal(total)
  }

  useEffect(() => {
    setTotal(cart.reduce((acc, curr) => acc + Number(curr.Price) * curr.qty, 0))
    setClientTotal(cart.reduce((acc, curr) => acc + Number(curr.Price) * curr.qty, 0))
  }, [cart])

  return (
    <>
      <div className="bg-[#2c2c2c] rounded-[15px] mb-4 mt-3 p-5 leading-extra-loose h-50">
        <div className="flex text-2xl font-bold justify-between pb-6 text-white">
          <p>Total</p>
          <p className="pt-2 text-white absolute pl-16 lg:pl-0 lg:mt-6 text-sm font-normal">
            (Inclusive of VAT)
          </p>
          <p>AED{promoCodeApplied ? clientTotal.toFixed(2) : total.toFixed(2)}</p>
        </div>
        <div className="flex justify-between text-sm py-1 mt-4 text-white">
          <p>Subtotal</p>
          <p>AED{promoCodeApplied ? (clientTotal*0.95).toFixed(2) : (total*0.95).toFixed(2)}</p>
        </div>
        <div className="flex justify-between text-sm py-1 text-white">
          <p>VAT</p>
          <p>AED{promoCodeApplied ? (clientTotal*0.05).toFixed(2) : (total*0.05).toFixed(2)}</p>
        </div>
      </div>
      <div>
        { clientSecret ?
          null
          :
          <div className="bg-[#2c2c2c] item-centers justify-center rounded-2xl">
          { promoCodeApplied ?
            <div className="flex items-center justify-center px-2 py-2">
              <p className="text-sm">Promo code {promoCode} applied! Saving AED {(total - clientTotal).toFixed(2)}</p>
              <button onClick={RemovePromoCode} className="ml-3 text-[#ffd601] border h-11 w-[20%] rounded text-xs font-semibold bg-[#ffd601]">
                Remove
              </button>
            </div>
            :
            <div className="flex items-center justify-center">
              <input
                placeholder="Promo Code"
                className="border border-[#161616] bg-[#161616]  text-white pl-3 my-4 outline-none text-xs rounded w-[70%] h-11"
                value={promoCode}
                onChange={e => setPromoCode(e.target.value)}
              />
              <button onClick={promoLoading ? null : EnterPromoCode} className="ml-3 p-2 text-black w-[16%] h-11 rounded text-xs font-semibold bg-[#ffd601]">
              { promoLoading ? <svg role="status" className="h-6 w-[100%] text-gray-200 animate-spin fill-black" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg> : 'Apply' }
              </button>              
            </div>            
          }
          </div>        
        }
      </div>
      <div>
        {clientSecret ? 
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
          :
          <button className="bg-[#ffd601] mt-4 w-full text-black font-bold p-4 rounded-[10px]" onClick={fetchPaymentSheetParams}>
            { loading ? <svg role="status" className="mr-2 w-full h-8 text-black animate-spin fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg> : 'Confirm Order' }
          </button>
        }
      </div>
    </>
  );
}
