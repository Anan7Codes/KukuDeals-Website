import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { CountryDropdown } from "react-country-region-selector";
import { supabase } from '@/utils/supabaseClient';
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

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
      console.log(firstname, lastname, email, password, confirmPassword, gender, countryOfResidence, nationality,phoneNumber,additionalProfileDetails)
      const { user, session, error } = await supabase.auth.signUp(
        {
          email,
          password
        },

        {
          data: { 
            name: firstname + " " + lastname, 
            gender: gender,
            nationality:nationality,
            countryOfResidence:countryOfResidence,
            // phoneNumber: countryCode + " " + additionalProfileDetails.phoneNumber,
            location: additionalProfileDetails.location,
            buildingName: additionalProfileDetails.buildingName,
            apartmentNo: additionalProfileDetails.apartmentNo
          }
        }
      )
      console.log(user, error, session)
      if(error){
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
    catch(e) {
      console.log(e);
    }
  }
  return (
    <>
      <div className="flex justify-center pt-20 pb-20">
        <div className="w-1/2  rounded-[25px] bg-[#2c2c2c] mb-6 mt-10">
          <div className="ml-28 pt-4">
            <p className="text-3xl text-[#ffd601] font-bold">Sign Up</p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex justify-center pb-6 pt-2"
          >
            <div className="flex flex-col text-white ">
              <input
                type="text"
                className="border placeholder:text-xs font-Manrope placeholder:text-white text-xs pl-3 mr-3 w-full lg:w-96 mt-4 outline-none rounded-[5px] h-14 border-[#d3d3d3] bg-[#2c2c2c] text-white"
                placeholder="FirstName"
                value={firstname}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="text"
                className="border placeholder:text-xs text-xs placeholder:text-white pl-3 mr-3 w-full lg:w-96 mt-4 outline-none rounded-[5px] h-14 border-[#d3d3d3] bg-[#2c2c2c] text-white"
                placeholder="LastName"
                value={lastname}
                onChange={(e) => setLastName(e.target.value)}
              />
              <input
                type="text"
                className="border placeholder:text-xs text-xs pl-3 placeholder:text-white mr-3 w-full lg:w-96 mt-4 outline-none rounded-[5px] h-14 border-[#d3d3d3] bg-[#2c2c2c] text-white"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                className="border placeholder:text-xs text-xs pl-3 placeholder:text-white mr-3 w-full lg:w-96 mt-4 outline-none rounded-[5px] h-14 border-[#d3d3d3] bg-[#2c2c2c] text-white"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                className="border placeholder:text-xs text-xs pl-3 mr-3 placeholder:text-white w-full lg:w-96 mt-4 outline-none rounded-[5px] h-14 border-[#d3d3d3] bg-[#2c2c2c] text-white"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              

              <div className="pt-4">
                <p className="text-3xl text-[#ffd601] font-bold">
                  Personal Details
                </p>
              </div>
              <div>
                <div className=" cursor-pointer pt-4">
                  <div className="flex justify-between">
                    <div>
                      <p
                        className={`rounded-l-lg w-48 py-2 text-center drop-shadow-sm ${gender ? 'bg-[#ffd601] text-black' : 'bg-black text-[#ffd601]'}`}
                        onClick={() => setGender(true)}
                      >
                        Male
                      </p>
                    </div>
                    <div className="mr-4">
                      <p
                        className={`rounded-r-lg w-52 py-2 text-center drop-shadow-sm ${!gender ? 'bg-[#ffd601] text-black' : 'bg-black text-[#ffd601]'}`}
                        onClick={() => setGender(false)}
                      >
                        Female
                      </p>
                    </div>
                  </div>
                </div>
                <div className="lg:flex ">
                  <CountryDropdown
                    defaultOptionLabel="Nationality"
                    className="border border-[#d3d3d3] bg-[#2c2c2c] text-white text-xs pl-3 mr-3 w-full mt-4 outline-none rounded-[5px] h-14"
                    value={nationality}
                    onChange={(val) => setNationality(val)}
                  />
                </div>
                <div className="lg:flex ">
                  <CountryDropdown
                    defaultOptionLabel="Country of Residence"
                    className="border border-[#d3d3d3] bg-[#2c2c2c] text-white text-xs pl-3 mr-3 w-full mt-4 outline-none rounded-[5px] h-14"
                    value={countryOfResidence}
                    onChange={(val) => setCountryOfResidence(val)}
                  />
                </div>
                <div className="lg:flex">
                <PhoneInput
                  placeholder="Enter Mobile Number"
                  containerClass="my-container-class"
                  value={phoneNumber}
                  // onChange={(e)=> setPhoneNumber(e.target.value)}
                  inputClass="my-input-class"
                  containerStyle={{
                    border: "",
                    marginTop: "13px",
                    backgroundColor: "#2c2c2c"
                  }}
                  inputStyle={{
                    background: "#2c2c2c",
                    color: 'white',
                    fontSize: "11px",
                    height: "3.1rem",
                    width: "98%",
                    fontSize: "11px",
                  }}
                  enableSearch="true"
                  country="ae"
                  regions={["north-america", "carribean", "middle-east", "asia"]}
                />
                </div>
              </div>
                <input
                type="text"
                className="border placeholder:text-xs placeholder:text-white text-xs pl-3 mr-3 w-full lg:w-[98%] mt-4 outline-none rounded-[5px] h-14 border-[#d3d3d3] bg-[#2c2c2c] text-white"
                placeholder="Location"
                value={additionalProfileDetails?.location} onChange={ e => setAdditionalProfileDetails({ ...additionalProfileDetails, location: e.target.value})}
              />
                 <input
                type="text"
                className="border placeholder:text-xs placeholder:text-white text-xs pl-3 mr-3 w-full lg:w-[98%] mt-4 outline-none rounded-[5px] h-14 border-[#d3d3d3] bg-[#2c2c2c] text-white"
                placeholder="Building Name"
                // value={newShippingAddress.apartmentNo} onChange={e => setNewShippingAddress({ ...newShippingAddress, apartmentNo: e.target.value })}
                value={additionalProfileDetails?.buildingName} onChange={ e => setAdditionalProfileDetails({ ...additionalProfileDetails, buildingName: e.target.value})}
              />
                 <input
                type="text"
                className="border placeholder:text-xs placeholder:text-white  text-xs pl-3 mr-3 w-full lg:w-[98%] mt-4 outline-none rounded-[5px] h-14 border-[#d3d3d3] bg-[#2c2c2c] text-white"
                placeholder="Apartment No"
                value={additionalProfileDetails?.apartmentNo} onChange={ e => setAdditionalProfileDetails({ ...additionalProfileDetails, apartmentNo: e.target.value})}
              />

              <div className="pb-6 flex justify-between">
                <p
                  className="text-[#ffd601]  mr-3  pt-4 mt-4 w-full h-14 font-semibold text-base cursor-pointer"
                  onClick={() => router.push("/signin")}
                >
                  Existing User Login
                </p>
                <button className="bg-[#ffd601] mr-3 mt-4 w-full outline-none rounded-[5px] h-14 text-black font-semibold text-base">
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
