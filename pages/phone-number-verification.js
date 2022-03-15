import Head from "next/head";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Layout from '@/components/Layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from "next-i18next"
import axios from "axios";

export default function PhoneNumber() {
  const router = useRouter();
  const { locale } = useRouter()
  const { t, i18n } = useTranslation()
  const [ phoneNumber, setPhoneNumber ] = useState('');
  const [ enterCode, setEnterCode ] = useState(false)
  const [ code, setCode ] = useState('')
  const { uid } = router.query
  const [ loading, setLoading ] = useState(false);

  useEffect(() => {
    if(!uid) return router.push('/')
  }, [])
  const GetCode = async () => {
    setLoading(true)
    try {
        const res = await axios.post(`/api/verification/send-verification-code`, {
            phoneNumber
        })
        if(res.data.success) {
            setEnterCode(true)
        }
        setLoading(false)
    } catch (e) {
      alert(e)
    }
  }

  const SubmitCode = async () => {
    setLoading(true)
    try {
        const res = await axios.post(`/api/verification/confirm-code`, {
            phoneNumber,
            uid,
            code
        })
        if(!res.data.success) {
            toast.success("Something went wrong!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
            setLoading(false)
            return
        }
        toast.success("Verification Successful", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
        setLoading(false)
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
            <div className="flex justify-center py-3 bg-[#161616]">
                <div className="rounded-[15px] bg-[#2c2c2c] mb-6 px-16 py-12">
                    <p className="text-3xl text-[#ffd601] font-bold">{t('verify-your-phone-number')}</p>    
                    <div className="flex flex-col lg:w-[100%] w-full mt-8 h-16 bg-[#2c2c2c] border rounded-[5px] border-[#d3d3d3]">
                        <p className="text-[#bebebe] text-xs ml-2 mt-2 mr-2 font-semibold">{t('phone-number')}:</p>
                        <input className="bg-[#2c2c2c] border-8 border-[#2c2c2c] text-white text-sm outline-none w-full"
                            value={phoneNumber}
                            type="number"
                            onChange={e => setPhoneNumber(e.target.value)}
                            placeholder="Start with country code. Eg: 971507878787"
                        />                          
                    </div>
                    { enterCode ?                    
                        <div className="flex flex-col lg:w-[100%] w-full mt-4 h-16 bg-[#2c2c2c] border rounded-[5px] border-[#d3d3d3]">
                            <p className="text-[#bebebe] text-xs ml-2 mt-2 mr-2 font-semibold">{t('code')}:</p>
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
                        { loading ? <svg role="status" className="mr-2 w-full h-8 animate-spin fill-black text-[#ffd601]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                            </svg> : enterCode ? t('verify-phone') : t('get-code')}
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