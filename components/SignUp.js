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
  const [ loading, setLoading ] = useState(false);

  const SignUpUser = async (values) => {
    setLoading(true)
    try {
      if (values.password !== values.confirmPassword) {
        toast.error(t('passwords-do-not-match'), {
          position: i18n.language === 'ar' ? "top-left" : "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setLoading(false)
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
      if (error) {
        toast.error(error, {
          position: i18n.language === 'ar' ? "top-left" : "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true, 
          progress: undefined,
        });
        setLoading(false)
        return
      }
      toast.success(t('success-sign-up'), {
        position: i18n.language === 'ar' ? "top-left" : "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setLoading(false)
      router.push({pathname: '/phone-number-verification', query: { uid: user.id}})
      return
    }
    catch (e) {
      console.log(e);
    }
  }
  return (
    <>
      <div className="bg-[#2c2c2c] my-3 flex justify-center items-center rounded-[15px] w-full h-full" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
        <div className="h-full w-full mt-20 lg:mt-16">
          <p className="text-3xl text-[#ffd601] font-semibold font-title text-center">{t('sign-up')}</p>
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
                {t('personal-details')}
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
                </div>
                {touched.nationality && errors.nationality &&
                    <p className="text-xs text-red-600">{errors.nationality}</p>
                }
                <div onClick={() => setShowCountryOfResidence(true)} className="flex flex-row items-center lg:w-[98%] w-full mt-4 bg-[#2c2c2c] border rounded-lg h-14 border-[#d3d3d3]" >
                  <p className="text-[#bebebe] text-xs ml-3 mr-2 font-semibold">Country of Residence:</p>
                  <div className="flex-1">
                    <CountryDropdown
                      defaultOptionLabel=""
                      className="bg-[#2c2c2c] border-8 border-[#2c2c2c] text-white text-xs outline-none lg:w-[98%] w-full"
                      value={values.countryOfResidence}
                      onChange={handleChange('countryOfResidence')}
                      onBlur={() => setFieldTouched('countryOfResidence')}
                    />
                  </div>                  
                </div>
                {touched.countryOfResidence && errors.countryOfResidence &&
                    <p className="text-xs text-red-600">{errors.countryOfResidence}</p>
                }
                <p className="text-2xl text-[#ffd601] font-bold pt-4">
                  {t('optional')}
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
                  {t('existing-user')}
                </p>
                <button onClick={isValid ? handleSubmit : null} className="bg-[#ffd601]  mr-3 mt-4 w-full outline-none rounded-[5px] h-14 text-black font-semibold text-base">
                  { loading ? <svg role="status" className="mr-2 w-full h-8 animate-spin fill-black text-[#ffd601]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg> : t('sign-up')}
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

