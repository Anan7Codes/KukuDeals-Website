import { supabase } from "@/utils/supabaseClient";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function ShippingAddress() {
  const [shippingAddress, setShippingAddress] = useState({})
  const [newShippingAddress, setNewShippingAddress] = useState({})

  useEffect(() => {
    const userInfo = supabase.auth.user()
    const { apartmentNo, buildingName, location } = userInfo.user_metadata
    setShippingAddress({ apartmentNo, buildingName, location })
    setNewShippingAddress({ apartmentNo, buildingName, location })
  }, [])

  const UpdateShippingAddress = async () =>{
    if(JSON.stringify(shippingAddress) === JSON.stringify(newShippingAddress)) {
     toast.info("No change in Shipping Address", {
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
  try {
    const { user, error } = await supabase.auth.update({ 
        data: { 
            location: newShippingAddress.location,
            buildingName: newShippingAddress.buildingName,
            apartmentNo: newShippingAddress.apartmentNo,

        } 
    })
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
} catch (e) {
    console.log(e)
}
}
  
  return (
    <div>
      <p className="text-3xl  font-bold mt-4 font-title text-[#ffd601]">Shipping Address</p>
      <div className="flex flex-col">
        <input
          placeholder="Apartment or Villa name"
          className=" placeholder:text-xs placeholder:text-white   pl-3 mr-3 w-full lg:w-[36rem] mt-4 outline-none  text-xs rounded-[5px]  h-14  bg-[#2c2c2c] text-white "
          value={newShippingAddress.apartmentNo} onChange={e => setNewShippingAddress({ ...newShippingAddress, apartmentNo: e.target.value })}
        />
        <input
          placeholder="Street name or No."
          className=" placeholder:text-xs placeholder:text-white   pl-3 mr-3 w-full lg:w-[36rem] mt-4 outline-none  text-xs rounded-[5px]  h-14  bg-[#2c2c2c] text-white "
          value={newShippingAddress.buildingName} onChange={e => setNewShippingAddress({ ...newShippingAddress, buildingName: e.target.value })}
        />
        <input
          placeholder="Area"
          className=" placeholder:text-xs placeholder:text-white   pl-3 mr-3 w-full lg:w-[36rem] mt-4 outline-none  text-xs rounded-[5px]  h-14  bg-[#2c2c2c] text-white "
          value={newShippingAddress.location} onChange={e => setNewShippingAddress({ ...newShippingAddress, location: e.target.value })}
        />
      </div>
      <button onClick={UpdateShippingAddress} className="bg-[#ffd601] text-black mt-4 font-semibold hover:bg-[#cfb327] w-full lg:w-52 h-14 text-center  rounded-[10px]">
        Save Address
      </button>
    </div>
  );
}
