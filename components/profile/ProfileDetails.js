import React, { useEffect, useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { nhost } from "@/utils/nhost";

export default function ProfileDetails() {
  const [firstname, setFirstName] = useState();
  const [lastname, setLastName] = useState();
  const [email, setEmail] = useState();
  const [value, setValue] = useState();
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  useEffect(() => {
    const InsertProfileData = async () => {
      try {
        const { data, error } = await nhost.graphql.request(`    
            mutation MyMutation {
              insert_Profiles(objects: {amountSpent: 50, countryOfResidence: "India", gender: false, id: "6fb9a7de-e1db-4c71-abd2-d2d2030211b6", nationality: "UAE", phoneNumber: "", shippingAddress: ""})
              {
                returning {
                  id
                  amountSpent
                  body
                  countryOfResidence
                }
            }    
          `);
        console.log("data",data);
        console.log(error);
      } catch (err) {
        console.log(err);
      }
    };
    InsertProfileData();
    // const userInfo = nhost.auth.getUser();
  }, []);

  return (
    <div>
      <div className="">
        <p className="pt-5 text-3xl font-bold text-gray-700 ">
          Personal Details
        </p>
        {/* <form onSubmit={handleSubmit} className=""> */}
        <div className="lg:flex text-lg">
          <input
            placeholder="First Name"
            className="border placeholder:text-xs text-lg pl-3 mr-3 w-full lg:w-72 mt-4 outline-none  rounded-[5px]  h-14  border-gray-300 "
            value={firstname}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            placeholder="Last Name"
            className="border placeholder:text-xs text-lg pl-3 mr-3 w-full lg:w-72 mt-4 outline-none  rounded-[5px]  h-14  border-gray-300 "
            value={lastname}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <input
            placeholder="Email"
            className="border placeholder:text-xs text-lg pl-3 mr-3 w-full lg:w-[98%] mt-4 outline-none  rounded-[5px]  h-14  border-gray-300 "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <PhoneInput
          placeholder="Enter Mobile Number"
          containerClass="my-container-class"
          value={value}
          onChange={setValue}
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
            value={country}
            onChange={(val) => setCountry(val)}
          />
          <CountryDropdown
            defaultOptionLabel="Country of Residence"
            className="border text-gray-400 pl-3 mr-3 lg:w-72 mt-4 outline-none w-full text-xs rounded-[5px]  h-14  border-gray-300 "
            value={region}
            onChange={(val) => setRegion(val)}
          />
        </div>
        <RadioGroup
          className="mt-3 justify-start"
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
        >
          <FormControlLabel
            value="male"
            control={<Radio />}
            label={
              <span style={{ fontSize: "14px", color: "gray" }}>Male</span>
            }
          />
          <FormControlLabel
            value="female"
            control={<Radio />}
            label={
              <span style={{ fontSize: "14px", color: "gray" }}>Female</span>
            }
          />
        </RadioGroup>
        <div className="">
          <button className="bg-blue-500 lg:justify-start w-full lg:w-40 h-16 mt-3 text-white  hover:bg-blue-600 font-semibold rounded-[15px]">
            Update
          </button>
        </div>
        {/* </form> */}
      </div>
    </div>
  );
}
