import Head from "next/head";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Layout from '@/components/Layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from "next-i18next"
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

 const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    detectSessionInUrl: false,
})

export default function ResetPassword() {
  const router = useRouter();
  const { locale } = useRouter()
  const { t, i18n } = useTranslation()
  const [ password, setPassword ] = useState('');
  const [ confirmPassword, setConfirmPassword ] = useState('');
  const [ accessToken, setAccessToken ] = useState('')
//   useEffect(() => {
//     console.log("query", window.location.hash)
//     console.log('token', window.location.hash.match(new RegExp("#access_token=" + "(.*)" + "&expires"))[1])
//     setAccessToken(window.location.hash.match(new RegExp("#access_token=" + "(.*)" + "&expires"))[1])
//    },[])


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
            .updateUser(accessToken, { password : password })
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
    <div className="bg-[#161616]" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
        <Head>
            <title>Reset Password | Kuku Deals</title>
            <link rel="icon" href={locale === 'ar' ? "../../icons/icon.png" : "../icons/icon.png"}/>
        </Head>
        <Layout>
            <div className="flex justify-center py-3 bg-[#161616]">
                <div className="rounded-[25px] bg-[#2c2c2c] mb-6 px-16 py-12">
                    <div className="pt-4">
                        <p className="text-3xl text-[#ffd601] font-bold">{t('reset-password')}</p>
                    </div>
                    <div
                        className="flex justify-center pb-6 pt-2"
                    >
                        <div className="flex flex-col">
                            <input
                                type="password"
                                className={`border placeholder:text-xs text-xs ${i18n.language === 'ar' ? 'pr-3 ml-3' : 'pl-3 mr-3'} w-[300px] lg:w-96 mt-4 outline-none rounded-[5px] h-14 border-[#d3d3d3] bg-[#2c2c2c] text-white`}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <input
                                type="password"
                                className={`border placeholder:text-xs text-xs ${i18n.language === 'ar' ? 'pr-3 ml-3' : 'pl-3 mr-3'} w-[300px] lg:w-96 mt-4 outline-none rounded-[5px] h-14 border-[#d3d3d3] bg-[#2c2c2c] text-white`}
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <div className="flex justify-between">
                                <button onClick={ResetPassword} className="bg-[#ffd601] mt-4 w-[300px] lg:w-96 outline-none rounded-[5px] h-14 text-black font-semibold text-base">
                                    {t('reset-password')}
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

export async function getStaticProps({ locale }) {
    return {
      props: {
        ...(await serverSideTranslations(locale, ['common']))
      }
    }
}