import React, { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Layout from '@/components/Layout';

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

 const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    detectSessionInUrl: false,
})

export default function ResetPassword() {
  const router = useRouter();
  const [ password, setPassword ] = useState('');
  const [ confirmPassword, setConfirmPassword ] = useState('');

  console.log(new URLSearchParams(window.location.search))
  const access_token = new URLSearchParams(window.location.search).get(
    "access_token"
  );

  const ResetPassword = async () => {
    try {
        if(password !== confirmPassword) {
            return toast.error('Passwords do not match', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            });
        }
        const { error, data } = await supabase.auth.api
            .updateUser(access_token, { password : password })
        console.log('resetted', error, data)
        if (error) {
            toast.error(error, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            });
            return
        }
        toast.success("Signed in successfully", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
        return router.push('/')
    } catch (e) {
      alert(e)
    }
  }

  return (
    <div className="bg-[#161616]">
        <Layout>
            <div className="flex justify-center pt-20 pb-20 bg-[#161616] h-screen">
                <div className="rounded-[25px] bg-[#2c2c2c] mb-6 px-16 h-96">
                    <div className="pt-4">
                        <p className="text-3xl text-[#ffd601] font-bold">Reset Password</p>
                    </div>
                    <div
                        className="flex justify-center pb-6 pt-2"
                    >
                        <div className="flex flex-col">
                            <input
                                type="password"
                                className="border placeholder:text-xs text-xs pl-3 mr-3 w-[300px] lg:w-96 mt-4 outline-none rounded-[5px] h-14 border-[#d3d3d3] bg-[#2c2c2c] text-white"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <input
                                type="password"
                                className="border placeholder:text-xs text-xs pl-3 mr-3 w-[300px] lg:w-96 mt-4 outline-none rounded-[5px] h-14 border-[#d3d3d3] bg-[#2c2c2c] text-white"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <div className="flex justify-between">
                                <button onClick={ResetPassword} className="bg-[#ffd601] mr-3 mt-4 w-full outline-none rounded-[5px] h-14 text-black font-semibold text-base">
                                    Reset Password
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    </div>
  );
}
