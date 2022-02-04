import { useState } from "react";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";

export default function ShippingAddress() {
  const [apartmentNo,setApartmentNo] = useState()
  const [streetName,setStreetName] = useState()
  const [area,setArea] = useState()
  const [shippingAddress, setShippingAddress] = useState({ area: "", streetName: "", apartmentNo: "" })

  const [country, setCountry] = useState("United Arab Emirates");
  const [region, setRegion] = useState("");

  async function InsertShippingData(e) {
    try {
      // mutation MyMutation{
      //   insert_Profiles(objects: {shippingAddress:{area :"Test", streetName:"test",apartmentNo:"121A"}, id: "6fb9a7de-e1db-4c71-abd2-d2d2030211b6"}) {
      //     affected_rows
      //     returning {
      //       shippingAddress
      //     }
      //   }
      // }
      e.preventDefault()
      setShippingAddress(shippingAddress.apartmentNo)
      console.log("shippingAddress",shippingAddress);
      console.log(apartmentNo);

      const mutation = `
          mutation MyMutation($amountSpent: Int!, $countryOfResidence: String!, $gender: Boolean!, $nationality: String!, $phoneNumber: String!, $shippingAddress: jsonb!) {
            insert_Profiles(objects: {countryOfResidence: $countryOfResidence, amountSpent: $amountSpent, gender: $gender, nationality: $nationality, phoneNumber: $phoneNumber, shippingAddress: $shippingAddress}) {
              affected_rows
              returning {
                area
                streetName
                apartmentNo
                shippingAddress
              }
            }
          } 
        `;
      const variables = { area, streetName, apartmentNo, shippingAddress };
      const { data, error } = await nhost.graphql.request(mutation, variables);
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div>
      <p className="text-3xl text-gray-700 font-bold mt-4 ">Shipping Address</p>
      <div className="flex flex-col">
        <input
          placeholder="Apartment or Villa name"
          className="border placeholder:text-xs   pl-3 mr-3 w-full lg:w-[36rem] mt-4 outline-none  text-xs rounded-[5px]  h-14  border-gray-300 "
          value={apartmentNo} onChange={(e) => setApartmentNo(e.target.value)}
        />
        <input
          placeholder="Street name or No."
          className="border placeholder:text-xs   pl-3 mr-3 w-full lg:w-[36rem] mt-4 outline-none  text-xs rounded-[5px]  h-14  border-gray-300 "
          value={streetName} onChange={(e) => setStreetName(e.target.value)}

        />
        <input
          placeholder="Area"
          className="border placeholder:text-xs   pl-3 mr-3 w-full lg:w-[36rem] mt-4 outline-none  text-xs rounded-[5px]  h-14  border-gray-300 "
          value={area} onChange={(e) => setArea(e.target.value)}

        />
        <RegionDropdown
          defaultOptionLabel="City"
          country={country}
          value={region}
          className="border placeholder:text-xs   pl-3 mr-3 w-full lg:w-[36rem] mt-4 outline-none  text-xs rounded-[5px]  h-14  border-gray-300 "
          onChange={(val) => setRegion(val)}
        />
        <CountryDropdown
          value={country}
          defaultOptionLabel="Country"
          className="border placeholder:text-xs   pl-3 mr-3 w-full lg:w-[36rem] mt-4 outline-none  text-xs rounded-[5px]  h-14  border-gray-300 "
          onChange={(val) => setCountry(val)}
        />{" "}
      </div>
      <button onClick={InsertShippingData} className="bg-blue-500 mt-4 font-semibold hover:bg-blue-600 text-white w-full lg:w-52 h-14 text-center  rounded-[10px]">
        Save Address
      </button>
    </div>
  );
}
