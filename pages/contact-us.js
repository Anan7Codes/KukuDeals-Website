import React, { useState } from 'react'
import Head from "next/head";
import Image from 'next/image'
import Layout from '@/components/Layout';
import { toast } from "react-toastify";
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from "next-i18next"
import * as yup from 'yup'
import { Formik } from 'formik'
import axios from "axios";

function ContactUs() {
  const { t, i18n } = useTranslation()
  const { locale } = useRouter()
  const router = useRouter()
  const [ loading, setLoading ] = useState(false)

  const ContactForm = async ({fullname, email, message}) => {
    setLoading(true)
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/contact/contact-form`, {
        fullname, email, message
      })

      if (!res.data.success) {
        toast.error(t("something-went-wrong"), {
          position: i18n.language === 'ar' ? "top-left" : "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        });
        setLoading(false)
        return
      }
      toast.success(t('form-submitted'), {
        position: i18n.language === 'ar' ? "top-left" : "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      setLoading(false)
      return router.reload()
    } catch(e) {
      alert(e)
    }
    setLoading(false)
  }

  return (
    <div dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <Head>
          <title>Contact Us | Kuku Deals</title>
          <link rel="icon" href={locale === 'ar' ? "../icons/icon.png" : "/icons/icon.png"}/>
      </Head>
      <Layout>
          <div className="my-3 flex flex-col lg:flex-row items-center justify-center rounded-[10px] bg-[#2c2c2c] p-4">
              <div className={`${i18n.language === "ar" ? 'mx-32' : 'flex-1 w-32'} hidden lg:flex items-center justify-center`}>
                  <div className="relative w-44 h-40 mx-8">
                      <Image
                          src="/icons/contactus.png"
                          layout="fill"
                          alt="Contact Us"
                      />
                  </div>
              </div>
              <div className={`${i18n.language === "ar" ? 'flex-1' : null} flex flex-col py-12`}>
                  <p className="text-[#ffd601] font-title font-semibold text-4xl">{t('contact-us')}</p>
                  <p className="text-white font-semibold text-lg lg:w-[50%]">{t('contact-desc')}</p>
                  <Formik
                      initialValues={{ 
                          fullname: '', 
                          email: '',
                          message: '' 
                      }}
                      onSubmit={values => ContactForm(values)}
                      validationSchema={yup.object().shape({
                          fullname: yup
                              .string()
                              .required("Full Name is required"),
                          email: yup
                              .string()
                              .email('Entered is not a valid Email')
                              .required('Email is required'),
                          message: yup
                              .string()
                              .min(15, 'Message is short.')
                              .max(400, 'Message max length exceeded.')
                              .required('Message is required'),
                      })}
                  >
                  {({ values, handleChange, errors, touched, isValid, setFieldTouched, handleSubmit }) => (
                    <>
                      <input
                        type="text"
                        className={`border placeholder:text-xs text-white placeholder:text-[#d3d3d3] text-xs font-semibold ${i18n.language === 'ar' ? 'pr-3 ml-3' : 'pl-3 mr-3'} w-full lg:w-96 mt-12 outline-none rounded-[5px] h-14 border-[#d3d3d3] bg-[#2c2c2c]`}
                        placeholder="Full Name"
                        value={values.fullname} 
                        onChange={handleChange('fullname')}
                        onBlur={() => setFieldTouched('fullname')}
                      />
                      {touched.fullname && errors.fullname &&
                        <p className="text-xs text-red-600">{errors.fullname}</p>
                      }
                      <input
                        type="text"
                        className={`border placeholder:text-xs text-white placeholder:text-[#d3d3d3] text-xs font-semibold ${i18n.language === 'ar' ? 'pr-3 ml-3' : 'pl-3 mr-3'} w-full lg:w-96 mt-4 outline-none rounded-[5px] h-14 border-[#d3d3d3] bg-[#2c2c2c]`}
                        placeholder="Email Address"
                        value={values.email} 
                        onChange={handleChange('email')}
                        onBlur={() => setFieldTouched('email')}
                      />
                      {touched.email && errors.email &&
                        <p className="text-xs text-red-600">{errors.email}</p>
                      }
                      <textarea
                        className={`border placeholder:text-xs text-white placeholder:text-[#d3d3d3] text-xs font-semibold ${i18n.language === 'ar' ? 'pr-3 ml-3' : 'pl-3 mr-3'} pt-4 w-full lg:w-96 mt-4 outline-none rounded-[5px] h-28 border-[#d3d3d3] bg-[#2c2c2c]`}
                        placeholder="Message"
                        value={values.message} 
                        onChange={handleChange('message')}
                        onBlur={() => setFieldTouched('message')}
                      ></textarea>
                      {touched.message && errors.message &&
                        <p className="text-xs text-red-600">{errors.message}</p>
                      }
                      <button onClick={isValid ? handleSubmit : null} type="submit" className={`bg-[#ffd601] hover:bg-[#d1b736] ${i18n.language === 'ar' ? 'lg:ml-3' : 'lg:mr-3'} mt-4 w-full lg:w-96 outline-none rounded-[5px] h-14 text-black font-semibold text-base`}>
                      { loading ? <svg role="status" className="mx-auto h-8 animate-spin fill-black text-[#ffd601]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg> : t('send-message')}
                      </button>
                    </>
                  )}
                  </Formik> 
              </div>
          </div>
      </Layout>
    </div>
  )
}

export default ContactUs

export async function getStaticProps({ locale }) {
  return {
      props: {
      ...(await serverSideTranslations(locale, ['common']))
      }
  }
}