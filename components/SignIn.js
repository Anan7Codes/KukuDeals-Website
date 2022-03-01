import React from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { supabase } from '@/utils/supabaseClient';
import * as yup from 'yup'
import { Formik } from 'formik'

export default function SignIn() {
  const router = useRouter();

  const SignInUser = async ({ email, password }) => {
    try {
      const { error } = await supabase.auth.signIn({
        email,
        password,
      })
      console.log(error)
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
      console.log(e)
    }
  }

  return (
    <div className="bg-[#2c2c2c] my-6 flex justify-center items-center rounded-[10px] w-full h-[30rem]">
      <div className="h-full w-full mt-20 lg:mt-16">
          <div className="pt-4 text-center">
            <p className="text-3xl text-[#ffd601] font-semibold font-title">Sign In</p>
          </div>
          <div
            className="flex justify-center pb-6 pt-2"
          >
            <Formik
                initialValues={{ 
                    email: '', 
                    password: '' 
                }}
                onSubmit={values => SignInUser(values)}
                validationSchema={yup.object().shape({
                    email: yup
                        .string()
                        .email('Entered is not a valid Email')
                        .required('Email is required'),
                    password: yup
                        .string()
                        .min(6, 'Password should be atleast 6 chars.')
                        .max(15, 'Password should not excced 15 chars.')
                        .required('Password is required'),
                })}
            >
            {({ values, handleChange, errors, touched, isValid, setFieldTouched, handleSubmit }) => (
              <div className="flex flex-col text-[#ffff] ">
                <input
                  type="text"
                  className="border placeholder:text-xs placeholder:text-[#bebebe]  text-xs font-semibold pl-3 mr-3 w-full lg:w-96 mt-4 outline-none rounded-[5px] h-14 border-[#d3d3d3] bg-[#2c2c2c]"
                  placeholder="Email Address"
                  value={values.email} 
                  onChange={handleChange('email')}
                  onBlur={() => setFieldTouched('email')}
                />
                {touched.email && errors.email &&
                  <p className="text-xs text-red-600">{errors.email}</p>
                }
                <input
                  type="password"
                  className="border placeholder:text-xs text-xs pl-3 mr-3 placeholder:text-[#bebebe] font-semibold w-full lg:w-96 mt-4 outline-none rounded-[5px] h-14 border-[#d3d3d3] bg-[#2c2c2c] "
                  placeholder="Password"
                  value={values.password} 
                  onChange={handleChange('password')}
                  onBlur={() => setFieldTouched('password')}
                />
                {touched.password && errors.password &&
                  <p className="text-xs text-red-600">{errors.password}</p>
                }
                <div className="pb-6 flex justify-between">
                  <button onClick={isValid ? handleSubmit : null} type="submit" className="bg-[#ffd601] hover:bg-[#d1b736] mr-3 mt-4 w-full outline-none rounded-[5px] h-14 text-black font-semibold text-base">
                    Sign In
                  </button>
                </div>
                <div className="flex flex-col justify-between text-xs">
                  <p
                    className="text-white cursor-pointer hover:text-[#ffd601]"
                    onClick={() => router.push("/signup")}
                  >
                    Don&apos;t have an account yet?  Click here to Signup
                  </p>
                  <p
                    className="text-white mt-4 cursor-pointer hover:text-[#ffd601]"
                    onClick={() => router.push("/forgot-password")}
                  >
                    Forgot Password? Click here to reset password
                  </p>
                </div>
              </div>
            )}
            </Formik> 
          </div>
        </div>
    </div>
  );
}
