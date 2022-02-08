import React, { useEffect, useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { nhost } from "@/utils/nhost";

export default function PersonalDetails() {
  useEffect(() => {
    const userInfo = nhost.auth.getUser()
    console.log("userInfo", userInfo)
    const [first, last] = userInfo.displayName.split(' ');
    setFirstName(first)
    setLastName(last)
    setEmail(userInfo.email)
    setUserId(userInfo.user_id)
    const fetchProfile = async () => {
      try {
        const { data, error } = await nhost.graphql.request(`            
              query MyQuery {
                  profiles {
                  user_id
                  amountSpent
                  countryOfResidence
                  gender
                  nationality
                  phoneNumber
                  shippingAddress
                  }
              }
          `)
        console.log("data in personal.js", data);
        setPhoneNumber(data.profiles[0].phoneNumber)
        setNationality(data.profiles[0].nationality)
        setCountryOfResidence(data.profiles[0].countryOfResidence)
        setGender(data.profiles[0].gender)
      } catch (err) {
        console.log(err);
      }
    }
    fetchProfile()
  }, [])
  const [user_id, setUserId] = useState()
  const [firstname, setFirstName] = useState()
  const [lastname, setLastName] = useState()
  const [email, setEmail] = useState()
  const [gender, setGender] = useState(true)
  const [phoneNumber, setPhoneNumber] = useState()
  const [nationality, setNationality] = useState()
  const [countryOfResidence, setCountryOfResidence] = useState()
  // const [amountSpent, setAmountSpent] = useState(15)

  async function InsertUserData(e) {
    console.log("::::");
    e.preventDefault()
    try {
      const mutation = `
          mutation MyMutation($countryOfResidence: String!, $gender: Boolean!, $nationality: String!, $phoneNumber: String!) {
            insert_profiles(objects: {countryOfResidence: $countryOfResidence, gender: $gender, nationality: $nationality ,phoneNumber:$phoneNumber}) {
              affected_rows
              returning {
                countryOfResidence
                gender
                user_id
                nationality
                phoneNumber
                
              }
            }
          } 
        `;
      const variables = { gender, nationality, countryOfResidence,phoneNumber };
      const { data, error } = await nhost.graphql.request(mutation, variables);
      console.log("data",data);
      console.log("error",error);
    } catch (e) {
      console.log(e);
    }
  }
  // const handleSubmit = async (e) => {
  //   console.log("inside");
  //   e.preventDefault();

  //   const mutation = `mutation MyMutation($user_id: uuid!, $countryOfResidence: String!, $nationality: String!, $phoneNumber: String!, $gender: Boolean!) {
  //     update_profiles_by_pk(pk_columns: {user_id: $user_id}, _set: {countryOfResidence: $countryOfResidence, nationality: $nationality, phoneNumber: $phoneNumber, gender: $gender}) {
  //       gender
  //       nationality
  //       phoneNumber
  //       countryOfResidence
  //       user_id
        
  //     }
  //   }
  //   `

  //   const variables = { user_id, phoneNumber, countryOfResidence }

  //   const { data, error } = await nhost.graphql.request(mutation, variables);
  //   console.log(data);
  //   console.log(error);
  // }

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
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              placeholder="Last Name"
              className="border placeholder:text-xs text-xs pl-3 mr-3 w-full lg:w-72 mt-4 outline-none  rounded-[5px]  h-14  border-gray-300 "
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <input
              placeholder="Email"
              className="border placeholder:text-xs text-xs pl-3 mr-3 w-full lg:w-[98%] mt-4 outline-none  rounded-[5px]  h-14  border-gray-300 "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <PhoneInput
            placeholder="Enter Mobile Number"
            containerClass="my-container-class"
            value={phoneNumber}
            // onChange={(e)=> setPhoneNumber(e.target.value)}
            inputClass="my-input-class"
            containerStyle={{
              border: "",
              marginTop: "13px",
            }}
            inputStyle={{
              background: "",
              fontSize: "11px",
              height: "3.5rem",
              width: "98%",
              fontSize: "11px",
            }}
            enableSearch="true"
            country="in"
            regions={["north-america", "carribean", "middle-east", "asia"]}
          />
          <div className="lg:flex ">
            <CountryDropdown
              defaultOptionLabel="Nationality"
              className="border border-gray-300  text-xs text-gray-400 pl-3 mr-3 w-full lg:w-72 mt-4 outline-none   rounded-[5px]  h-14 "
              value={nationality}
              onChange={(val) => setNationality(val)}
            />
            <CountryDropdown
              defaultOptionLabel="Country of Residence"
              className="border text-gray-400 pl-3 mr-3 lg:w-72 mt-4 outline-none w-full text-xs rounded-[5px]  h-14  border-gray-300 "
              value={countryOfResidence}
              onChange={(val) => setCountryOfResidence(val)}
            />
          </div>
          <RadioGroup
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
          </RadioGroup>
          <button onClick={InsertUserData} className="bg-blue-500 lg:justify-start w-full lg:w-40 h-16 mt-3 text-white  hover:bg-blue-600 font-semibold rounded-[15px]">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}
