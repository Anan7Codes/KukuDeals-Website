import { nhost } from "@/utils/nhost";
import { useEffect, useState } from "react";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";

export default function ShippingAddress() {
  const [id, setId] = useState()
  const [shippingAddress, setShippingAddress] = useState({ area: "", streetName: "", apartmentNo: ""})
  const [newShippingAddress, setNewShippingAddress ] = useState({ area: "", streetName: "", apartmentNo: ""})
  const [country, setCountry] = useState("United Arab Emirates");


  useEffect(() => {
    const userInfo = nhost.auth.getUser()
    setId(userInfo.id)
  }, [])

  async function InsertShippingData(e) {
    e.preventDefault()
    try {
      console.log(newShippingAddress);
      const mutation = `
      mutation MyMutation($newShippingAddress: jsonb!){
        insert_profiles(objects:{ shippingAddress: $newShippingAddress }) {
          affected_rows
          returning {
            shippingAddress
            
          }
        }
      }`
      const variables = { newShippingAddress};
      const { data, error } = await nhost.graphql.request(mutation, variables);
      console.log(data);
      console.log(error);
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div>
      <p className="text-3xl text-gray-700 font-bold mt-4 ">Shipping Address</p>
      <form onSubmit={InsertShippingData}>
        <div className="flex flex-col">
          <input
            placeholder="Apartment or Villa name"
            className="border placeholder:text-xs   pl-3 mr-3 w-full lg:w-[36rem] mt-4 outline-none  text-xs rounded-[5px]  h-14  border-gray-300 "
            value={newShippingAddress.apartmentNo} onChange={e => setNewShippingAddress({...newShippingAddress, apartmentNo: e.target.value})}
          />
          <input
            placeholder="Street name or No."
            className="border placeholder:text-xs   pl-3 mr-3 w-full lg:w-[36rem] mt-4 outline-none  text-xs rounded-[5px]  h-14  border-gray-300 "
            value={newShippingAddress.streetName} onChange={e => setNewShippingAddress({...newShippingAddress,streetName: e.target.value})}
          />
          <input
            placeholder="Area"
            className="border placeholder:text-xs   pl-3 mr-3 w-full lg:w-[36rem] mt-4 outline-none  text-xs rounded-[5px]  h-14  border-gray-300 "
            value={newShippingAddress.area} onChange={e => setNewShippingAddress({...newShippingAddress, area: e.target.value})}
          />
          {/* <RegionDropdown
            defaultOptionLabel="City"
            country={country}
            value={newShippingAddress.region}
            className="border placeholder:text-xs   pl-3 mr-3 w-full lg:w-[36rem] mt-4 outline-none  text-xs rounded-[5px]  h-14  border-gray-300 "
            onChange={(val) => setRegion(val)}
            onChange={e => setNewShippingAddress({...newShippingAddress, area: e.target.valuel})}
          /> */}
          <CountryDropdown
            value={country}
            defaultOptionLabel="Country"
            className="border placeholder:text-xs   pl-3 mr-3 w-full lg:w-[36rem] mt-4 outline-none  text-xs rounded-[5px]  h-14  border-gray-300 "
            onChange={(val) => setCountry(val)}
          />{" "}
        </div>
        <button className="bg-blue-500 mt-4 font-semibold hover:bg-blue-600 text-white w-full lg:w-52 h-14 text-center  rounded-[10px]">
          Save Address
        </button>
      </form>
    </div>
  );
}
