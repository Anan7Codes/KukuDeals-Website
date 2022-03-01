import Head from "next/head";
import React, { useState, useEffect } from 'react'
import Layout from '@/components/Layout'



function Success() {
    return (
        <div className={`bg-[#161616] overflow-x-hidden`}>
          <Head>
              <title>404 | Kuku Deals</title>
              <link rel="icon" href="./icons/icon.png" />
          </Head>
          <Layout>
            <div className='bg-[#2c2c2c] min-h-42 my-8 py-12 rounded-[15px] flex flex-col items-center justify-center'>
              <p className='font-title text-[#ffd601] text-5xl font-semibold'>How are you here?</p>
              <p className='text-[#fff] text-2xl'>Sorry, but this page does not exist!</p>
            </div>
          </Layout>
        </div> 
    )
}  

export default Success