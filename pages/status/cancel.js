import React, { useEffect } from 'react'
import Layout from '@/components/Layout'
import { useUser } from '@/contexts/user/UserContext';

function Cancel() {
  const { user } = useUser()

  useEffect(() => {
    if(!user) {
      router.push('/signin')
    }
  }, [user])

  return (
    <div className='bg-[#161616]'>
      <Layout>
        <div className='bg-[#2c2c2c] min-h-42 my-8 py-12 rounded-[15px] flex flex-col items-center justify-center'>
          <p className='font-title text-[#ffd601] text-5xl font-semibold'>Cancelled</p>
          <p className='text-[#fff] text-2xl'>You have cancelled your order!</p>
        </div>
      </Layout>
    </div>
  )
}

export default Cancel