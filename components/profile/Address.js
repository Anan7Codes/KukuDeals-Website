import { useState } from "react";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";

export default function Address() {
  const [country, setCountry] = useState("United Arab Emirates");
  const [region, setRegion] = useState("");
  return (
    <div>
      <p className="text-3xl text-gray-700 font-bold mt-4 ">Shipping Address</p>
      <div className="flex flex-col">
        <input
          placeholder="Apartment or Villa name"
          className="border border-gray-300 placeholder:text-xs text-lg  pl-3 mr-3 w-[36rem] mt-4 outline-none  text-xs rounded-[5px]  h-14  border-gray-300 "
        />
        <input
          placeholder="Street name or No."
          className="border border-gray-300 placeholder:text-xs text-lg  pl-3 mr-3 w-[36rem] mt-4 outline-none  text-xs rounded-[5px]  h-14  border-gray-300 "
        />
        <input
          placeholder="Area"
          className="border border-gray-300 placeholder:text-xs text-lg  pl-3 mr-3 w-[36rem] mt-4 outline-none  text-xs rounded-[5px]  h-14  border-gray-300 "
        />
        <input
          placeholder="Current Password"
          className="border border-gray-300 placeholder:text-xs text-lg  pl-3 mr-3 w-[36rem] mt-4 outline-none  text-xs rounded-[5px]  h-14  border-gray-300 "
        />
        <RegionDropdown
          defaultOptionLabel="City"
          country={country}
          value={region}
          className="border border-gray-300  text-xs text-gray-400 pl-3 mr-3 w-[36rem] mt-4 outline-none  text-xs rounded-[5px]  h-14  border-gray-300 "
          onChange={(val) => setRegion(val)}
        />
        <CountryDropdown
          value={country}
          defaultOptionLabel="Country"
          className="border border-gray-300  text-xs text-gray-400 pl-3 mr-3 w-[36rem] mt-4 outline-none  text-xs rounded-[5px]  h-14  border-gray-300 "
          onChange={(val) => setCountry(val)}
        />{" "}
      </div>
      <button className="bg-blue-500 mt-4 font-semibold hover:bg-blue-600 text-white w-52 h-14 text-center  rounded-[10px]">
        Save Address
      </button>
    </div>
  );
}
