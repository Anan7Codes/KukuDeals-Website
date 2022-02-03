import React, { useEffect, useState } from 'react';
import { nhost } from "@/utils/nhost";
import { useNhostAuth } from '@nhost/react-auth';


export default function User() {
    const { isLoading, isAuthenticated } = useNhostAuth();

    console.log({ isLoading });
    console.log({ isAuthenticated });
  
    if (isLoading) {
      console.log("Loading...");
    }
  
    if (!isAuthenticated) {
      console.log("User is not authenticated");
    }
  
    console.log("User is authenticated");
    const [displayName, setDisplayName] = useState("")
    const [email, setEmail] = useState("")
    const [amountSpent, setAmountSpent] = useState(0)

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { data, error } = await nhost.graphql.request(`
            
            query MyQuery {
                Profiles {
                  id
                  amountSpent
                  countryOfResidence
                  gender
                  nationality
                  phoneNumber
                  shippingAddress
                }
              }
              `)
                console.log("data",data);
                if(data) setAmountSpent(data.Profiles[0]?.amountSpent)
            } catch (err) {
                console.log(err);
            }
        }
        fetchProfile()
        const userInfo = nhost.auth.getUser()
        if(userInfo) {
            setDisplayName(userInfo.displayName)
            setEmail(userInfo.email)
        }
    }, [])


    return <div>
        <div className="col-span-2  mb-4  flex mt-5 shadow-lg bg-gradient-to-b from-[#175198] lg:w-[21rem] h-[20rem] rounded-[25px] items-center justify-center text-center ">
            <div>
                <p className="text-3xl font-bold text-gray-800">{displayName}</p>
                <p className="text-xs">{email}</p>
                <p className="flex justify-center text-sm">
                    Amount spent : AED
                    <p className="text-red-500 text-sm font-bold"> {amountSpent}</p>
                </p>
            </div>
        </div>
    </div>;
}
