import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { CountryDropdown } from "react-country-region-selector";
import { supabase } from '@/utils/supabaseClient';
import * as yup from 'yup'
import { Formik } from 'formik'
const countryCodes = require('country-codes-list')


function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nationality, setNationality] = useState();
  const [countryOfResidence, setCountryOfResidence] = useState();
  const [gender, setGender] = useState(true);
  const [additionalProfileDetails, setAdditionalProfileDetails] = useState({})
  const [phoneNumber, setPhoneNumber] = useState()
  const [showNationality, setShowNationality] = useState(false);
  const [showCountryofResidence, setShowCountryOfResidence] = useState(false);
  const myCountryCodesObject = countryCodes.customList('countryNameEn', '{countryNameEn},{countryCallingCode}')
  let code


  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        toast.error("passwords doesn't match", {
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
      // console.log(firstname, lastname, email, password, confirmPassword, gender, countryOfResidence, nationality, phoneNumber, additionalProfileDetails)
      const { user, session, error } = await supabase.auth.signUp(
        {
          email,
          password
        },

        {
          data: {
            name: firstname + " " + lastname,
            gender: gender,
            nationality: additionalProfileDetails.nationality,
            countryOfResidence: additionalProfileDetails.countryOfResidence,
            phoneNumber: "+" + code[1] + " " +phoneNumber,
            location: additionalProfileDetails.location,
            buildingName: additionalProfileDetails.buildingName,
            apartmentNo: additionalProfileDetails.apartmentNo
          }
        }
      )
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
      router.push('/signin')
      return
    }
    catch (e) {
      console.log(e);
    }
  }
  return (
    <>
      <div className="bg-[#2c2c2c] my-3 flex justify-center items-center rounded-[10px] w-full h-full">
        <div className="h-full w-full mt-20 lg:mt-16">
          <div className="flex lg:justify-center">
            <p className="text-3xl text-[#ffd601] font-semibold font-title text-center">Sign Up</p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="lg:flex lg:justify-center pb-6 m-4"
          >
            <div className="flex flex-col text-white ">
              <input
                type="text"
                className="border placeholder:text-xs font-semibold placeholder:text-[#bebebe] text-xs pl-3 mr-3 w-full lg:w-[98%] mt-4 outline-none rounded-[5px] h-14 border-[#d3d3d3] bg-[#2c2c2c] text-white"
                placeholder="First Name"
                value={firstname}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="text"
                className="border placeholder:text-xs text-xs font-semibold placeholder:text-[#bebebe] pl-3 mr-3 w-full lg:w-[98%] mt-4 outline-none rounded-[5px] h-14 border-[#d3d3d3] bg-[#2c2c2c] text-white"
                placeholder="Last Name"
                value={lastname}
                onChange={(e) => setLastName(e.target.value)}
              />
              <input
                type="text"
                className="border placeholder:text-xs text-xs pl-3 font-semibold placeholder:text-[#bebebe] mr-3 w-full lg:w-[98%] mt-4 outline-none rounded-[5px] h-14 border-[#d3d3d3] bg-[#2c2c2c] text-white"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                className="border placeholder:text-xs text-xs pl-3 font-semibold placeholder:text-[#bebebe] mr-3 w-full lg:w-[98%] mt-4 outline-none rounded-[5px] h-14 border-[#d3d3d3] bg-[#2c2c2c] text-white"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                className="border placeholder:text-xs text-xs pl-3 mr-3 font-semibold placeholder:text-[#bebebe] w-full lg:w-[98%] mt-4 outline-none rounded-[5px] h-14 border-[#d3d3d3] bg-[#2c2c2c] text-white"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <div className="pt-4">
                <p className="text-2xl text-[#ffd601] font-bold">
                  Personal Details
                </p>
              </div>
              <div>
                <div className="flex flex-row text-center lg:mr-2 my-5">
                    <div onClick={() => setGender(true)} className={`py-3 rounded-l-[10px] flex-1 font-semibold  ${gender ? 'bg-[#ffd601] text-black' : 'bg-black text-[#ffd601]'}`} >
                        <p className ="cursor-pointer text-md">Male</p>
                    </div>
                    <div onClick={() => setGender(false)} className={`py-3 rounded-r-[10px] flex-1 font-semibold ${!gender ? 'bg-[#ffd601] text-black' : 'bg-black text-[#ffd601]'}`}>
                        <p className="cursor-pointer text-md">Female</p>
                    </div>
                </div>
                <div onClick={() => setShowNationality(true)} className="flex flex-row font-semibold items-center lg:w-[98%] w-full mt-4 bg-[#2c2c2c] border rounded-lg h-14 border-[#d3d3d3]" >
                  <p className=" text-[#bebebe] text-xs ml-3 mr-2">Nationality:</p>
                  <div className="flex-1">
                    <CountryDropdown
                      defaultOptionLabel=""
                      className=" bg-[#2c2c2c] border-8 border-[#2c2c2c] text-white font-semibold text-xs outline-none w-[100%] -ml-1"
                      value={nationality}
                      onChange={(val) => setNationality(val)}
                    />
                  </div>
                </div>
                <div onClick={() => setShowCountryOfResidence(true)} className="flex flex-row items-center lg:w-[98%] w-full mt-4 bg-[#2c2c2c] border rounded-lg h-14 border-[#d3d3d3]" >
                  <p className="text-[#bebebe] text-xs ml-3 mr-2 font-semibold">Country of Residence:</p>
                  <div className="flex-1">
                    <CountryDropdown
                      defaultOptionLabel=""
                      className="bg-[#2c2c2c] border-8 border-[#2c2c2c] text-white text-xs outline-none w-[100%] -ml-1"
                      value={countryOfResidence}
                      onChange={(val) => setCountryOfResidence(val)}
                    />
                  </div>
                </div>
                {countryOfResidence ?
                  <>
                    <div className="flex flex-row items-center lg:w-[98%] w-full mt-4 bg-[#2c2c2c] border rounded-lg h-14 border-[#d3d3d3]">
                      <p className="text-[#bebebe] text-xs ml-3 mr-2 font-semibold">Phone Number:</p>
                      <div className="flex flex-1">
                        {Object.entries(myCountryCodesObject).map((item, i) => {
                          if (countryOfResidence === item[0]) {
                            code = item[1].split(',');
                          }
                        })}
                        <p className="text-xs pt-2">{`+${code[1]}`}</p>
                        <input className="bg-[#2c2c2c] border-8 border-[#2c2c2c] text-white text-xs outline-none w-[100%] " type="number"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="pt-4">
                      <p className="text-2xl text-[#ffd601] font-bold">
                        Optional
                      </p>
                    </div>
                    <div className="flex flex-row items-center lg:w-[98%] w-full mt-4 bg-[#2c2c2c] border rounded-lg h-14 border-[#d3d3d3]" >
                      <p className="text-[#bebebe] text-xs ml-3 mr-2 font-semibold">Location :</p>
                      <div className="flex-1">
                        <input className="bg-[#2c2c2c] border-8 border-[#2c2c2c] text-white text-xs outline-none w-[100%] -ml-1"
                          value={additionalProfileDetails?.location} onChange={e => setAdditionalProfileDetails({ ...additionalProfileDetails, location: e.target.value })} />
                      </div>
                    </div>
                    <div className="flex flex-row items-center lg:w-[98%] w-full mt-4 bg-[#2c2c2c] border rounded-lg h-14 border-[#d3d3d3]" >
                      <p className="text-[#bebebe] text-xs ml-3 mr-2 font-semibold">Building Name:</p>
                      <div className="flex-1">
                        <input className="bg-[#2c2c2c] border-8 border-[#2c2c2c] text-white text-xs outline-none w-[100%] -ml-1"
                          value={additionalProfileDetails?.buildingName} onChange={e => setAdditionalProfileDetails({ ...additionalProfileDetails, buildingName: e.target.value })} />
                      </div>
                    </div>
                    <div className="flex flex-row items-center lg:w-[98%] w-full mt-4 bg-[#2c2c2c] border rounded-lg h-14 border-[#d3d3d3]" >
                      <p className="text-[#bebebe] text-xs ml-3 mr-2 font-semibold">Apartment No :</p>
                      <div className="flex-1">
                        <input className="bg-[#2c2c2c] border-8 border-[#2c2c2c] text-white text-xs outline-none w-[100%] -ml-1"
                          value={additionalProfileDetails?.apartmentNo} onChange={e => setAdditionalProfileDetails({ ...additionalProfileDetails, apartmentNo: e.target.value })} />
                      </div>
                    </div>
                  </>
                  : null}
              </div> 

              <div className="pb-6 flex justify-between">
                <p
                  className="text-[#ffd601]  mr-3  pt-4 mt-4 w-full h-14 font-semibold text-base cursor-pointer"
                  onClick={() => router.push("/signin")}
                >
                  Existing User? Click here
                </p>
                <button className="bg-[#ffd601]  mr-3 mt-4 w-full outline-none rounded-[5px] h-14 text-black font-semibold text-base">
                  Sign Up
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
