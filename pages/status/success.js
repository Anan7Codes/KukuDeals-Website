import React, { useState, useEffect } from 'react'
import Layout from '@/components/Layout'
import { CartState } from "@/contexts/cart/CartContext";
import { useUser } from '@/contexts/user/UserContext';
import { useRouter } from 'next/router';
import Confetti from 'react-confetti'

function Success() {
  const router = useRouter();
  const { user } = useUser()

  const [ success, setSuccess ] = useState(false)
  const { dispatch } = CartState();

  useEffect(() => {
    if(!user) {
      router.push('/signin')
    }
  }, [user])

  const EmptyCart = () => {
    dispatch({
        type: 'EMPTY_CART',
    })       
  }

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      setSuccess(true)
    }
    EmptyCart()
  }, []);

  if(success) {
    return (
    <div className='bg-[#161616]'>
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        recycle={false}
      />
      <Layout>
        <div className='bg-[#2c2c2c] min-h-42 my-8 py-12 rounded-[15px] flex flex-col items-center justify-center'>
          <p className='font-title text-[#ffd601] text-5xl font-semibold'>Congratulations</p>
          <p className='text-[#fff] text-2xl'>You have successfully placed your order!</p>
        </div>
      </Layout>
    </div> 
  )} else return (
    <div className='bg-[#161616]'>
      <Layout>
        <div className='bg-[#2c2c2c] min-h-42 my-8 py-12 rounded-[15px] flex flex-col items-center justify-center'>
          <p className='font-title text-[#ffd601] text-5xl font-semibold'>Restricted Page</p>
        </div>
      </Layout>
    </div>
  )
}

export default Success