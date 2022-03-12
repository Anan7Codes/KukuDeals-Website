import React from "react";
import { useRouter } from 'next/router'
import { toast } from "react-toastify";
import { supabase } from '@/utils/supabaseClient';
import { useTranslation } from "next-i18next"
import * as yup from 'yup'
import { Formik } from 'formik'

export default function SignIn() {
  const router = useRouter();
  const { t, i18n } = useTranslation()
  const [ loading, setLoading ] = useState(false);
  
  const SignInUser = async ({ email, password }) => {
    setLoading(true)
    try {
      const { user, error } = await supabase.auth.signIn({
        email,
        password,
      })
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
        setLoading(false)
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
      setLoading(false)
      return router.push('/')
    } catch(e) {
      console.log(e)
    }
  }

  return (
    <div className="bg-[#2c2c2c] my-3 flex justify-center items-center rounded-[10px] w-full h-[30rem]">
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
                        .max(30, 'Password should not excced 30 chars.')
                        .required('Password is required'),
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
                <input
                  type="password"
                  className={`border placeholder:text-xs text-xs placeholder:text-[#bebebe] font-semibold ${i18n.language === 'ar' ? 'pr-3 ml-3' : 'pl-3 mr-3'} w-full lg:w-96 mt-4 outline-none rounded-[5px] h-14 border-[#d3d3d3] bg-[#2c2c2c]`}
                  placeholder="Password"
                  value={values.password} 
                  onChange={handleChange('password')}
                  onBlur={() => setFieldTouched('password')}
                />
                {touched.password && errors.password &&
                  <p className="text-xs text-red-600">{errors.password}</p>
                }
                <div className="pb-6 flex justify-between">
                  <button onClick={isValid ? handleSubmit : null} type="submit" className="bg-[#ffd601] hover:bg-[#d1b736] mt-4 w-full lg:w-96 outline-none rounded-[5px] h-14 text-black font-semibold text-base">
                  { loading ? <svg role="status" className="mr-2 w-full h-8 animate-spin fill-black text-[#ffd601]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg> : 'Sign In'}
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