import Head from "next/head";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Layout from '@/components/Layout';
import { supabase } from '@/utils/supabaseClient';
import * as yup from 'yup'
import { Formik } from 'formik'

export default function ForgotPassword() {
    const router = useRouter();

    const ResetPass = async ({ email }) => {
        try {
            const { data, error } = supabase.auth.api
                .resetPasswordForEmail(email, { redirectTo: 'https://kukudeals.vercel.app/reset-password' })
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
        <div className="bg-[#161616]">    
            <Head>
                <title>Forgot Password | Kuku Deals</title>
            </Head>    
            <Layout>
                <div className="bg-[#2c2c2c] my-6 flex justify-center items-center rounded-[10px] w-full">
                    <div className="h-full w-full mt-20 lg:mt-16">
                        <div className="pt-4 text-center">
                            <p className="text-3xl text-[#ffd601] font-bold font-title">Forgot Password</p>
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
                                    className="border placeholder:text-xs placeholder:text-white  text-xs font-semibold pl-3 mr-3 w-full lg:w-96 mt-4 outline-none rounded-[5px] h-14 border-[#d3d3d3] bg-[#2c2c2c]"
                                    placeholder="Email Address"
                                    value={values.email} 
                                    onChange={handleChange('email')}
                                    onBlur={() => setFieldTouched('email')}
                                />
                                {touched.email && errors.email &&
                                    <p className="text-xs text-red-600">{errors.email}</p>
                                }
                                <div className="pb-6 flex justify-between">
                                    <button onClick={isValid ? handleSubmit : null} type="submit" className="bg-[#ffd601] hover:bg-[#d1b736] mr-3 mt-4 w-full outline-none rounded-[5px] h-14 text-black font-semibold text-base">
                                        Send Email
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
