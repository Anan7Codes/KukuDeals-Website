import { supabase } from '@/utils/supabaseClient';
import React, { useEffect, useState } from 'react';

export default function User() {
    const [userName,setUserName] = useState()
    const [email,setEmail] = useState()
    const [amountSpent, setAmountSpent] = useState(0)
    useEffect(()=>{
        const userInfo = supabase.auth.user();
        setUserName(userInfo.user_metadata.name)
        setEmail(userInfo.email)

    })
    return (
        <div>
            <div className="col-span-2  mb-4  flex mt-5 shadow-lg bg-gradient-to-b from-[#175198] lg:w-[21rem] h-[20rem] rounded-[25px] items-center justify-center text-center ">
                <div>
                    <p className="text-3xl font-bold text-gray-800">{userName}</p>
                    <p className="text-xs">{email}</p>
                    <p className="flex justify-center text-sm">
                        Amount spent : AED <span className="text-red-500 text-sm font-bold">{amountSpent}</span>
                    </p>
                </div>
            </div>
        </div>
    )
}
