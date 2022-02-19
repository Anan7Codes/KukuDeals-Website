import React, { useState, useEffect } from "react";
import { CartState } from "@/contexts/cart/CartContext";
import { supabase } from "@/utils/supabaseClient";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

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
    
    console.log("userInfo", userInfo)

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
          setPromoLoading(false)
          if(!res.data.success) {
            alert('Error', `${res.data.message}`)
            setPromoCode('')
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
      <div className="bg-white rounded-[15px] mb-4 mt-3 p-5 leading-extra-loose h-50 divide-y">
        <div className="flex text-2xl font-bold justify-between pb-6">
          <p>Total </p>
          <p className="pt-2 absolute pl-16 lg:pl-0 lg:mt-4 text-sm font-normal">
            (Inclusive of VAT)
          </p>
          <p>AED{promoCodeApplied ? clientTotal.toFixed(2) : total.toFixed(2)}</p>
        </div>
        <div className="flex justify-between text-sm pb-3 pt-3">
          <p>Subtotal</p>
          <p>AED{promoCodeApplied ? (clientTotal*0.95).toFixed(2) : (total*0.95).toFixed(2)}</p>
        </div>
        <div className="flex justify-between text-sm pb-3 pt-3">
          <p>VAT</p>
          <p>AED{promoCodeApplied ? (clientTotal*0.05).toFixed(2) : (total*0.05).toFixed(2)}</p>
        </div>
      </div>
      <div>
        <div className="bg-white item-center justify-center rounded-2xl">
          { promoCodeApplied ?
            <>
              <p>Promo code {promoCode} applied! Saving AED {(total - clientTotal).toFixed(2)}</p>
              <button onClick={RemovePromoCode} className="ml-3 text-blue-500 border h-9 w-[16%] rounded text-xs font-semibold border-blue-500">
                Remove
              </button>
            </>
            :
            <>
              <input
                placeholder="Promo Code"
                className="border border-gray-400 pl-3 ml-5 my-4 outline-none text-xs rounded w-[70%] h-9"
                value={promoCode}
                onChange={e => setPromoCode(e.target.value)}
              />
              <button onClick={promoLoading ? null : EnterPromoCode} className="ml-3 text-blue-500 border h-9 w-[16%] rounded text-xs font-semibold border-blue-500">
              { promoLoading ? <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24"></svg> : 'Apply' }
              </button>
            </>
          }
        </div>
      </div>
      <div>
        {clientSecret ? 
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
          :
          <button className="bg-blue-800 p-3 mt-4 w-full text-white font-bold h-16 rounded-[10px]" onClick={fetchPaymentSheetParams}>
            { loading ? <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24"></svg> : 'Confirm Order' }
          </button>
        }
      </div>
    </>
  );
}
