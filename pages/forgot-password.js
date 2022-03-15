import Head from "next/head";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '@/components/Layout';
import { supabase } from '@/utils/supabaseClient';
import * as yup from 'yup'
import { Formik } from 'formik'

export default function ForgotPassword() {
    const router = useRouter();
    const { locale } = useRouter()
    const { t, i18n } = useTranslation()

    const ResetPass = async ({ email }) => {
        try {
            const { data, error } = supabase.auth.api
                .resetPasswordForEmail(email, { redirectTo: locale === 'ar' ? 'https://kukudeals.com/ar/reset-password' : 'https://kukudeals.com/reset-password' })
            console.log("reset", data, error)
            if (error) {
                toast.error(error.message, {
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
            toast.success("Reset link sent successfully", {
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
                <title>Forgot Password | Kuku Deals</title>
                <link rel="icon" href={locale === 'ar' ? "../../icons/icon.png" : "../icons/icon.png"}/>
            </Head>    
            <Layout>
                <div className="bg-[#2c2c2c] my-3 flex justify-center items-center rounded-[10px] w-full">
                    <div className="h-full w-full mt-20 lg:mt-16">
                        <div className="pt-4 text-center">
                            <p className="text-3xl text-[#ffd601] font-bold font-title">{t('forgot-password')}</p>
                        </div>
                        <div
                            className="flex justify-center pb-6 pt-2"
                        >
                            <Formik
                                initialValues={{ 
                                    email: '', 
                                }}
                                onSubmit={values => ResetPass(values)}
                                validationSchema={yup.object().shape({
                                    email: yup
                                        .string()
                                        .email('Entered is not a valid Email')
                                        .required('Email is required'),
                                })}
                            >
                            {({ values, handleChange, errors, touched, isValid, setFieldTouched, handleSubmit }) => (
                            <div className="flex flex-col text-[#ffff] ">
                                <input
                                    type="text"
                                    className={`border placeholder:text-xs placeholder:text-[#bebebe] text-xs font-semibold ${i18n.language === 'ar' ? 'pr-3 ml-3' : 'pl-3 mr-3'} w-full lg:w-96 mt-4 outline-none rounded-[5px] h-14 border-[#d3d3d3] bg-[#2c2c2c]`}
                                    placeholder="Email Address"
                                    value={values.email} 
                                    onChange={handleChange('email')}
                                    onBlur={() => setFieldTouched('email')}
                                />
                                {touched.email && errors.email &&
                                    <p className="text-xs text-red-600">{errors.email}</p>
                                }
                                <div className="pb-6 flex justify-between">
                                    <button onClick={isValid ? handleSubmit : null} type="submit" className="bg-[#ffd601] hover:bg-[#d1b736] mt-4 w-full lg:w-96 outline-none rounded-[5px] h-14 text-black font-semibold text-base">
                                        {t('send-email')}
                                    </button>
                                </div>
                            </div>
                            )}
                            </Formik> 
                        </div>
                    </div>
                </div>
            </Layout>
        </div>
    )

}

export async function getStaticProps({ locale }) {
    return {
      props: {
        ...(await serverSideTranslations(locale, ['common']))
      }
    }
}
