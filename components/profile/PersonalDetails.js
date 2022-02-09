import React, { useEffect, useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { supabase } from "@/utils/supabaseClient";
import { toast } from "react-toastify";

export default function PersonalDetails() {

  const [firstname, setFirstName] = useState()
  const [lastname, setLastName] = useState()
  const [newFirstname, setNewFirstName] = useState()
  const [newLastname, setNewLastName] = useState()
  const [email, setEmail] = useState()
  const [gender, setGender] = useState()
  const [newGender, setNewGender] = useState()
  const [phoneNumber, setPhoneNumber] = useState()
  const [personalDetails, setPersonalDetails] = useState({})
  const [newPersonalDetails, setNewPersonalDetails] = useState({})
  // const [amountSpent, setAmountSpent] = useState(15)

  useEffect(() => {
    const userInfo = supabase.auth.user()
    console.log(userInfo);
    const { nationality, countryOfResidence } = userInfo.user_metadata

    const { name, gender } = userInfo.user_metadata
    const { email } = userInfo
    const [firstname, lastname] = name.split(' ');
    setPersonalDetails({ nationality, countryOfResidence, firstname, lastname ,name })
    setNewPersonalDetails({ nationality, countryOfResidence, firstname, lastname, name})
    setGender(gender)
    setEmail(email)

  }, [])

  async function InsertPersonalDetails(e) {
    e.preventDefault()
    console.log(personalDetails);
    console.log(newPersonalDetails);
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
      toast.error(error, {
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
        <p className="pt-5 text-3xl font-bold text-gray-700 ">
          Personal Details
        </p>
        <form className="">
          <div className="lg:flex text-lg">
            <input
              placeholder="First Name"
              className="border placeholder:text-xs text-xs pl-3 mr-3 w-full lg:w-72 mt-4 outline-none  rounded-[5px]  h-14  border-gray-300 "
              value={newPersonalDetails.firstname} onChange={e => setNewPersonalDetails({ ...newPersonalDetails, firstname: e.target.value })}

            />
            <input
              placeholder="Last Name"
              className="border placeholder:text-xs text-xs pl-3 mr-3 w-full lg:w-72 mt-4 outline-none  rounded-[5px]  h-14  border-gray-300 "
              value={newPersonalDetails.lastname} onChange={e => setNewPersonalDetails({ ...newPersonalDetails, lastname: e.target.value })}

            />
          </div>
          <div className="flex flex-col">
            <input
              placeholder="Email"
              className="border placeholder:text-xs text-xs pl-3 mr-3 w-full lg:w-[96.5%] mt-4 outline-none opacity-30 rounded-[5px]  h-14  border-gray-300 "
              value={email}

            />
          </div>

          <div className="lg:flex ">
            <CountryDropdown
              defaultOptionLabel="Nationality"
              className="border border-gray-300  text-xs text-gray-400 pl-3 mr-3 w-full lg:w-72 mt-4 outline-none   rounded-[5px]  h-14 "
              value={newPersonalDetails.nationality} onChange={e => setNewPersonalDetails({ ...newPersonalDetails, nationality: e })}

            />
            <CountryDropdown
              defaultOptionLabel="Country of Residence"
              className="border text-gray-400 pl-3 mr-3 lg:w-72 mt-4 outline-none w-full text-xs rounded-[5px]  h-14  border-gray-300 "
              value={newPersonalDetails.countryOfResidence} onChange={e => setNewPersonalDetails({ ...newPersonalDetails, countryOfResidence: e })}
            />
          </div>
          {/* <RadioGroup
            className="mt-3 justify-start"
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            defaultValue={gender}
          >
            <FormControlLabel
              value={true}

              control={<Radio />}
              label={
                <span style={{ fontSize: "14px", color: "gray" }}>Male</span>
              }
            />
            <FormControlLabel
              value={false}
              control={<Radio />}
              label={
                <span style={{ fontSize: "14px", color: "gray" }}>Female</span>
              }
            />
          </RadioGroup> */}
          <div className=" cursor-pointer pt-6 pb-4 ">
            {gender ? (
              <div className="flex justify-between items-center">
                <div>
                  <p
                    className="bg-white rounded-l-lg h-12  flex justify-center items-center w-[19rem] text-center drop-shadow-sm	 text-blue-600 "
                    value={true}
                    onClick={(e) => setGender(true)}                             >
                    Male
                  </p>
                </div>
                <div className="mr-4">
                  <p
                    className="bg-gray-300 opacity-20 flex justify-center items-center rounded-r-lg h-12  w-[18rem] text-center drop-shadow-md"
                    value={false}
                    onClick={(e) => setGender(false)}                          >
                    Female
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex justify-between">
                <div>
                  <p
                    className="bg-gray-300 opacity-20 flex justify-center items-center rounded-l-lg h-12  w-[19rem] text-center drop-shadow-md	 "
                    value={true}
                    onClick={(e) => setGender(true)}
                  >
                    Male
                  </p>
                </div>
                <div className="mr-4">
                  <p
                    className="bg-white rounded-r-lg h-12 flex justify-center items-center w-[18rem] text-center drop-shadow-sm	 text-blue-600 "
                    value={false}
                    onClick={(e) => setGender(false)}
                  >
                    Female
                  </p>
                </div>
              </div>
            )}
          </div>
          <button onClick={InsertPersonalDetails} className="bg-blue-500 lg:justify-start w-full lg:w-40 h-16 mt-3 text-white  hover:bg-blue-600 font-semibold rounded-[15px]">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}
