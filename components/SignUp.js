import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next"
import { CountryDropdown } from "react-country-region-selector";
import { supabase } from '@/utils/supabaseClient';
import * as yup from 'yup'
import { Formik } from 'formik'

function SignUp() {
  const { locale } = useRouter()
  const { t, i18n } = useTranslation()
  const router = useRouter();
  const [gender, setGender] = useState(true);
  const [showNationality, setShowNationality] = useState(false);
  const [showCountryofResidence, setShowCountryOfResidence] = useState(false);

  const SignUpUser = async (values) => {
    console.log("values", values)
    try {
      if (values.password !== values.confirmPassword) {
        toast.error("Passwords does not match", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return;
      }
      const { user, error } = await supabase.auth.signUp(
        {
          email: values.email,
          password: values.password
        },
        {
          data: {
            name: values.firstname + " " + values.lastname,
            gender: gender,
            nationality: values.nationality,
            countryOfResidence: values.countryOfResidence,
            location: values.location,
            buildingName: values.buildingName,
            apartmentNo: values.apartmentNo
          }
        }
      )
      console.log("user", user)
      if (error) {
        toast.error(error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return
      }
      toast.success("Successfully signed up. You'll have to verify your email to continue", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      router.push({pathname: '/phone-number-verification', query: { uid: user.id}})
      return
    }
    catch (e) {
      console.log(e);
    }
  }
  return (
    <>
      <div className="bg-[#2c2c2c] my-3 flex justify-center items-center rounded-[10px] w-full h-full" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
        <div className="h-full w-full mt-20 lg:mt-16">
          <div className="flex lg:justify-center">
            <p className="text-3xl text-[#ffd601] font-semibold font-title text-center">Sign Up</p>
          </div>
          <div
            className="lg:flex lg:justify-center pb-6 m-4"
          >
            <Formik
                initialValues={{ 
                    firstname: '',
                    lastname: '',
                    email: '', 
                    password: '',
                    confirmPassword: '', 
                    nationality: '',
                    countryOfResidence: '',
                    location: '',
                    buildingName: '',
                    apartmentNo: ''
                }}
                onSubmit={values => SignUpUser(values)}
                validationSchema={yup.object().shape({
                    firstname: yup
                        .string()
                        .min(3, 'First Name should be atleast 3 chars.')
                        .max(20, 'First Name should not excced 20 chars.')
                        .required('First Name is required'),
                    lastname: yup
                        .string()
                        .min(3, 'Last Name should be atleast 3 chars.')
                        .max(20, 'Last Name should not excced 20 chars.')
                        .required('Last Name is required'),
                    email: yup
                        .string()
                        .email('Entered is not a valid Email')
                        .required('Email is required'),
                    password: yup
                        .string()
                        .min(6, 'Password should be atleast 6 chars.')
                        .max(30, 'Password should not excced 30 chars.')
                        .required('Password is required'),
                    confirmPassword: yup
                        .string()
                        .min(6, 'Password should be atleast 6 chars.')
                        .max(30, 'Password should not excced 30 chars.')
                        .required('Password is required'),
                    nationality: yup  
                        .string()
                        .required('Nationality is required'),
                    countryOfResidence: yup  
                        .string()
                        .required('Country of Residence is required'),
                    location: yup
                        .string(),
                    buildingName: yup
                        .string(),
                    apartmentNo: yup
                        .string()
                })}
            >
            {({ values, handleChange, errors, touched, isValid, setFieldTouched, handleSubmit }) => (
            <div className="flex flex-col text-white">
              <input
                type="text"
                className={`border placeholder:text-xs font-semibold placeholder:text-[#bebebe] text-xs ${i18n.language === 'ar' ? 'pr-3 ml-3' : 'pl-3 mr-3'} w-full mt-4 outline-none rounded-[5px] h-14 border-[#d3d3d3] bg-[#2c2c2c] text-white`}
                placeholder="First Name"
                value={values.firstname}
                onChange={handleChange('firstname')}
                onBlur={() => setFieldTouched('firstname')}
              />
              {touched.firstname && errors.firstname &&
                <p className="text-xs text-red-600">{errors.firstname}</p>
              }
              <input
                type="text"
                className={`border placeholder:text-xs text-xs font-semibold placeholder:text-[#bebebe] ${i18n.language === 'ar' ? 'pr-3 ml-3' : 'pl-3 mr-3'} w-full mt-4 outline-none rounded-[5px] h-14 border-[#d3d3d3] bg-[#2c2c2c] text-white`}
                placeholder="Last Name"
                value={values.lastname}
                onChange={handleChange('lastname')}
                onBlur={() => setFieldTouched('lastname')}
              />
              {touched.lastname && errors.lastname &&
                <p className="text-xs text-red-600">{errors.lastname}</p>
              }
              <input
                type="text"
                className={`border placeholder:text-xs text-xs font-semibold placeholder:text-[#bebebe] ${i18n.language === 'ar' ? 'pr-3 ml-3' : 'pl-3 mr-3'} w-full mt-4 outline-none rounded-[5px] h-14 border-[#d3d3d3] bg-[#2c2c2c] text-white`}
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
                className={`border placeholder:text-xs text-xs font-semibold placeholder:text-[#bebebe] ${i18n.language === 'ar' ? 'pr-3 ml-3' : 'pl-3 mr-3'} w-full mt-4 outline-none rounded-[5px] h-14 border-[#d3d3d3] bg-[#2c2c2c] text-white`}
                placeholder="Password"
                value={values.password}
                onChange={handleChange('password')}
                onBlur={() => setFieldTouched('password')}
              />
              {touched.password && errors.password &&
                <p className="text-xs text-red-600">{errors.password}</p>
              }
              <input
                type="password"
                className={`border placeholder:text-xs text-xs font-semibold placeholder:text-[#bebebe] ${i18n.language === 'ar' ? 'pr-3 ml-3' : 'pl-3 mr-3'} w-full mt-4 outline-none rounded-[5px] h-14 border-[#d3d3d3] bg-[#2c2c2c] text-white`}
                placeholder="Confirm Password"
                value={values.confirmPassword}
                onChange={handleChange('confirmPassword')}
                onBlur={() => setFieldTouched('confirmPassword')}
              />
              {touched.confirmPassword && errors.confirmPassword &&
                <p className="text-xs text-red-600">{errors.confirmPassword}</p>
              }
              <p className="text-2xl text-[#ffd601] font-bold pt-4">
                Personal Details
              </p>
              <div>
                <div className={`flex flex-row text-center my-5`}>
                    <div onClick={() => setGender(true)} className={`py-3 ${i18n.language === 'ar' ? 'rounded-r-[10px]' : 'rounded-l-[10px]'} flex-1 font-semibold  ${gender ? 'bg-[#ffd601] text-black' : 'bg-black text-[#ffd601]'}`} >
                        <p className ="cursor-pointer text-md">Male</p>
                    </div>
                    <div onClick={() => setGender(false)} className={`py-3 ${i18n.language === 'ar' ? 'rounded-l-[10px]' : 'rounded-r-[10px]'} flex-1 font-semibold ${!gender ? 'bg-[#ffd601] text-black' : 'bg-black text-[#ffd601]'}`}>
                        <p className="cursor-pointer text-md">Female</p>
                    </div>
                </div>
                <div onClick={() => setShowNationality(true)} className="flex flex-row font-semibold items-center lg:w-[98%] w-full mt-4 bg-[#2c2c2c] border rounded-lg h-14 border-[#d3d3d3]">
                  <p className=" text-[#bebebe] text-xs ml-3 mr-2">Nationality:</p>
                  <div className="flex-1">
                    <CountryDropdown
                      defaultOptionLabel=""
                      className=" bg-[#2c2c2c] border-8 border-[#2c2c2c] text-white font-semibold text-xs outline-none w-[100%] -ml-1"
                      // value={nationality}
                      // onChange={(val) => setNationality(val)}
                      value={values.nationality}
                      onChange={handleChange('nationality')}
                      onBlur={() => setFieldTouched('nationality')}
                    />
                  </div>
                  {touched.nationality && errors.nationality &&
                    <p className="text-xs text-red-600">{errors.nationality}</p>
                  }
                </div>
                <div onClick={() => setShowCountryOfResidence(true)} className="flex flex-row items-center lg:w-[98%] w-full mt-4 bg-[#2c2c2c] border rounded-lg h-14 border-[#d3d3d3]" >
                  <p className="text-[#bebebe] text-xs ml-3 mr-2 font-semibold">Country of Residence:</p>
                  <div className="flex-1">
                    <CountryDropdown
                      defaultOptionLabel=""
                      className="bg-[#2c2c2c] border-8 border-[#2c2c2c] text-white text-xs outline-none lg:w-[98%] w-full"
                      // value={countryOfResidence}
                      // onChange={(val) => setCountryOfResidence(val)}
                      value={values.countryOfResidence}
                      onChange={handleChange('countryOfResidence')}
                      onBlur={() => setFieldTouched('countryOfResidence')}
                    />
                  </div>
                  {touched.countryOfResidence && errors.countryOfResidence &&
                    <p className="text-xs text-red-600">{errors.countryOfResidence}</p>
                  }
                </div>
                <p className="text-2xl text-[#ffd601] font-bold pt-4">
                  Optional
                </p>
                <div className="flex flex-row items-center lg:w-[98%] w-full mt-4 bg-[#2c2c2c] border rounded-lg h-14 border-[#d3d3d3]">
                  <p className="text-[#bebebe] text-xs ml-3 mr-2 font-semibold">Location:</p>
                  <div className="flex-1">
                    <input className="bg-[#2c2c2c] border-8 border-[#2c2c2c] text-white text-xs outline-none lg:w-[98%] w-full"
                      value={values.location}
                      onChange={handleChange('location')}
                      onBlur={() => setFieldTouched('location')} />
                  </div>
                  {touched.location && errors.location &&
                    <p className="text-xs text-red-600">{errors.location}</p>
                  }
                </div>
                <div className="flex flex-row items-center lg:w-[98%] w-full mt-4 bg-[#2c2c2c] border rounded-lg h-14 border-[#d3d3d3]" >
                  <p className="text-[#bebebe] text-xs ml-3 mr-2 font-semibold">Building Name:</p>
                  <div className="flex-1">
                    <input className="bg-[#2c2c2c] border-8 border-[#2c2c2c] text-white text-xs outline-none lg:w-[98%] w-full"
                      value={values.buildingName}
                      onChange={handleChange('buildingName')}
                      onBlur={() => setFieldTouched('buildingName')} />
                  </div>
                  {touched.buildingName && errors.buildingName &&
                    <p className="text-xs text-red-600">{errors.buildingName}</p>
                  }
                </div>
                <div className="flex flex-row items-center lg:w-[98%] w-full mt-4 bg-[#2c2c2c] border rounded-lg h-14 border-[#d3d3d3]">
                  <p className="text-[#bebebe] text-xs ml-3 mr-2 font-semibold">Apartment No:</p>
                  <div className="flex-1">
                    <input className="bg-[#2c2c2c] border-8 border-[#2c2c2c] text-white text-xs outline-none lg:w-[98%] w-full"
                      value={values.apartmentNo}
                      onChange={handleChange('apartmentNo')}
                      onBlur={() => setFieldTouched('apartmentNo')} />
                  </div>
                  {touched.apartmentNo && errors.apartmentNo &&
                    <p className="text-xs text-red-600">{errors.apartmentNo}</p>
                  }
                </div>
              </div> 
              <div className="pb-6 flex justify-between">
                <p
                  className="text-[#ffd601] mr-3 pt-4 mt-4 w-full h-14 font-semibold text-base cursor-pointer"
                  onClick={() => router.push("/signin")}
                >
                  Existing User? Click here
                </p>
                <button onClick={isValid ? handleSubmit : null} className="bg-[#ffd601]  mr-3 mt-4 w-full outline-none rounded-[5px] h-14 text-black font-semibold text-base">
                  Sign Up
                </button>
              </div>
            </div>
            )}
            </Formik> 
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;

