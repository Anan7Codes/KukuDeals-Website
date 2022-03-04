import Head from "next/head";
import React, { useState, useEffect } from 'react'
import Layout from '@/components/Layout'
import SkeletonLayout from "@/components/SkeletonLayout";
import { CartState } from "@/contexts/cart/CartContext";
import { useUser } from '@/contexts/user/UserContext';
import { useRouter } from 'next/router';
import Confetti from 'react-confetti';
import Lottie from "lottie-react";
import SuccessAnimation from '@/public/success-animation.json'
import Skeleton from 'react-loading-skeleton'


function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      function handleResize() {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }

      window.addEventListener("resize", handleResize);
      handleResize();

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []); 
  return windowSize;
}

function Success() {
  const { width, height } = useWindowSize()
  const { user } = useUser()

  const [ success, setSuccess ] = useState(false)
  const { dispatch } = CartState();

  useEffect(() => {
    const router = useRouter();
    if(!user) {
      router.push('/signin')
    }
  }, [user])

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      setSuccess(true)
    }
    const EmptyCart = () => {
      dispatch({
          type: 'EMPTY_CART',
      })       
    }
    EmptyCart()
  }, []);

  if(success) {
    return (
    <div className={`bg-[#161616] overflow-x-hidden`}>
      <Head>
          <title>Order Successful | Kuku Deals</title>
          <link rel="icon" href="../icons/icon.png" />
      </Head>
      <Confetti
        width={width - 20}
        height={height}
        recycle={false}
      />
      <Layout>
        <div className='bg-[#2c2c2c] min-h-42 my-3 py-12 rounded-[15px] flex flex-col items-center justify-center'>
          <Lottie
            animationData={SuccessAnimation}
            speed={1}
            loop
            style={{
              height: 200,
              width: 200
            }}
          />
          <p className='font-title text-[#ffd601] text-5xl font-semibold'>Congratulations</p>
          <p className='text-[#fff] text-2xl'>You have successfully placed your order!</p>
        </div>
      </Layout>
    </div> 
  )} else return (
    <div className='bg-[#161616]'>
      <SkeletonLayout>
        <Skeleton className="h-96 py-12" style={{borderRadius: 15}} />
      </SkeletonLayout>
    </div>
  )
}

export default Success