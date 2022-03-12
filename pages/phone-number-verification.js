import Head from "next/head";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Layout from '@/components/Layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from "next-i18next"
import axios from "axios";

export default function PhoneNumber() {
  const router = useRouter();
  const { locale } = useRouter()
  const [ phoneNumber, setPhoneNumber ] = useState('');
  const [ enterCode, setEnterCode ] = useState(false)
  const [ code, setCode ] = useState('')
  const { uid } = router.query

  const GetCode = async () => {
    try {
        const res = await axios.post(`/api/verification/send-verification-code`, {
            phoneNumber
        })
        if(res.data.success) {
            setEnterCode(true)
        }
    } catch (e) {
      alert(e)
    }
  }

  const SubmitCode = async () => {
    try {
        const res = await axios.post(`/api/verification/confirm-code`, {
            phoneNumber,
            uid,
            code
        })
        if(!res.data.success) return toast.success("Something went wrong!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })

        toast.success("Verification Successful", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
        router.push('/signin')
    } catch (e) {
      alert(e)
    }
  }

  return (
    <div className="bg-[#161616]" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
        <Head>
            <title>Phone Number Verification | Kuku Deals</title>
            <link rel="icon" href={locale === 'ar' ? "../../icons/icon.png" : "../icons/icon.png"}/>
        </Head>
        <Layout>
            <div className="flex justify-center pt-20 pb-20 bg-[#161616] h-screen">
                <div className="rounded-[15px] bg-[#2c2c2c] mb-6 px-16 h-96">
                    <p className="text-3xl text-[#ffd601] font-bold pt-8">Verify Your Phone Number</p>    
                    <div className="flex flex-col lg:w-[100%] w-full mt-8 h-16 bg-[#2c2c2c] border rounded-[5px] border-[#d3d3d3]">
                        <p className="text-[#bebebe] text-xs ml-2 mt-2 mr-2 font-semibold">Phone Number:</p>
                        <input className="bg-[#2c2c2c] border-8 border-[#2c2c2c] text-white text-sm outline-none w-full"
                            value={phoneNumber}
                            type="number"
                            onChange={e => setPhoneNumber(e.target.value)}
                            placeholder="Start with country code. Eg: 971507878787"
                        />                          
                    </div>
                    { enterCode ?                    
                        <div className="flex flex-col lg:w-[100%] w-full mt-4 h-16 bg-[#2c2c2c] border rounded-[5px] border-[#d3d3d3]">
                            <p className="text-[#bebebe] text-xs ml-2 mt-2 mr-2 font-semibold">Code:</p>
                            <input className="bg-[#2c2c2c] border-8 border-[#2c2c2c] text-white text-sm outline-none w-full"
                                value={code}
                                onChange={e => setCode(e.target.value)}
                                type="number"
                                placeholder="Enter your 6 digit code"
                            />                          
                        </div> 
                        :
                        null
                    }
                    <div className="flex justify-between">
                        <button onClick={enterCode ? SubmitCode : GetCode} className="bg-[#ffd601] mt-4 lg:w-[100%] w-full outline-none rounded-[5px] h-12 text-black font-semibold text-base">
                            {enterCode ? 'Verify Phone' : 'Get Code'}
                        </button>
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