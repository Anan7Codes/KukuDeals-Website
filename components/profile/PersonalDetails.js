import React, { useEffect, useState } from "react";
import { CountryDropdown } from "react-country-region-selector";
import { supabase } from "@/utils/supabaseClient";
import { toast } from "react-toastify";

export default function PersonalDetails() {  
  const [email, setEmail] = useState()
  const [gender, setGender] = useState()
  const [phoneNumber, setPhoneNumber] = useState()
  const [personalDetails, setPersonalDetails] = useState({})
  const [newPersonalDetails, setNewPersonalDetails] = useState({})

  useEffect(() => {
    const GetUserData = async () => {
      const userInfo = await supabase.auth.user()
      const { nationality, countryOfResidence } = userInfo.user_metadata
      const { name, gender } = userInfo.user_metadata
      const { email } = userInfo
      const [firstname, lastname] = name.split(' ');
      setPersonalDetails({ nationality, countryOfResidence, firstname, lastname ,name })
      setNewPersonalDetails({ nationality, countryOfResidence, firstname, lastname, name})
      setGender(gender)
      setEmail(email)
    }
    GetUserData()
  }, [])

  async function InsertPersonalDetails(e) {
    e.preventDefault()
    if (JSON.stringify(personalDetails) === JSON.stringify(newPersonalDetails)) {
      toast.info("No change in PersonalDetails", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      return
    }
    try{
      const { user, error } = await supabase.auth.update({ 
        data: { 
          nationality: newPersonalDetails.nationality,
          countryOfResidence: newPersonalDetails.countryOfResidence,
          firstname: newPersonalDetails.firstname,
          lastname: newPersonalDetails.lastname,
          name: newPersonalDetails.firstname + " " +newPersonalDetails.lastname,           
        } 
      })
      console.log(user)

    if(error) {
      return toast.error(error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
    toast.success("Succesfully Updated", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
    }catch(e){
      console.log(e);
    }
  }
  return (
    <div>
      <div className="">
        <p className="pt-5 text-3xl font-bold font-title text-[#ffd601] ">
          Personal Details
        </p>
        <form className="">
          <div className="lg:flex text-lg">
            <input
              placeholder="First Name"
              className="text-white placeholder:text-xs placeholder:text-[#bebebe]  bg-[#2c2c2c] text-xs pl-3 mr-3 w-full lg:w-72 mt-4 outline-none  rounded-[5px]  h-14   "
              value={newPersonalDetails.firstname} onChange={e => setNewPersonalDetails({ ...newPersonalDetails, firstname: e.target.value })}

            />
            <input
              placeholder="Last Name"
              className="text-white placeholder:text-xs placeholder:text-[#bebebe] bg-[#2c2c2c] text-xs pl-3 mr-3 w-full lg:w-72 mt-4 outline-none  rounded-[5px]  h-14   "
              value={newPersonalDetails.lastname} onChange={e => setNewPersonalDetails({ ...newPersonalDetails, lastname: e.target.value })}

            />
          </div>
          <div className="flex flex-col">
            <input
              placeholder="Email"
              className=" placeholder:text-xs placeholder:text-[#bebebe] bg-[#2c2c2c] text-xs pl-3 mr-3 w-full lg:w-[96.5%] mt-4 outline-none  rounded-[5px] opacity-60 h-14 text-white "
              value={email}
              disabled

            />
          </div>

          <div className="lg:flex ">
            <CountryDropdown
              defaultOptionLabel="Nationality"
              className=" text-white bg-[#2c2c2c] text-xs pl-3 mr-3 w-full lg:w-72 mt-4 outline-none   rounded-[5px]  h-14 "
              value={newPersonalDetails.nationality} onChange={e => setNewPersonalDetails({ ...newPersonalDetails, nationality: e })}

            />
            <CountryDropdown
              defaultOptionLabel="Country of Residence"
              className=" text-white bg-[#2c2c2c] text-xs pl-3 mr-3 w-full lg:w-72 mt-4 outline-none   rounded-[5px]  h-14 "
              value={newPersonalDetails.countryOfResidence} onChange={e => setNewPersonalDetails({ ...newPersonalDetails, countryOfResidence: e })}
            />
          </div>
          <div className=" cursor-pointer pt-6 pb-4 ">
            {gender ? (
              <div className="flex justify-between items-center">
                <div>
                  <p
                    className="text-black bg-[#ffd601] rounded-l-lg h-12  flex justify-center items-center w-[19rem] text-center drop-shadow-sm	  "
                    value={true}
                    onClick={(e) => setGender(true)}>
                    Male
                  </p>
                </div>
                <div className="mr-4">
                  <p
                    className="bg-black text-[#ffd601]  flex justify-center items-center rounded-r-lg h-12  w-[18rem] text-center drop-shadow-md"
                    value={false}
                    onClick={(e) => setGender(false)}>
                    Female
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex justify-between">
                <div>
                  <p
                    className="bg-black text-[#ffd601]  flex justify-center items-center rounded-l-lg h-12  w-[18rem] text-center drop-shadow-md"
                    value={true}
                    onClick={(e) => setGender(true)}
                  >
                    Male
                  </p>
                </div>
                <div className="mr-4">
                  <p
                    className="text-black bg-[#ffd601] rounded-r-lg h-12  flex justify-center items-center w-[19rem] text-center drop-shadow-sm"
                    value={false}
                    onClick={(e) => setGender(false)}
                  >
                    Female
                  </p>
                </div>
              </div>
            )}
          </div>
          <button onClick={InsertPersonalDetails} className="bg-[#ffd601] lg:justify-start w-full lg:w-40 h-14 mt-3 text-black  hover:bg-[#dabd2c] font-semibold rounded-[15px]">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}
