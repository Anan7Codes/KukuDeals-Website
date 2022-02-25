import React, { useEffect, useState } from 'react';
import { useUser } from '@/contexts/user/UserContext';

export default function User() {
    const { user } = useUser();

    const [userName,setUserName] = useState()
    const [email,setEmail] = useState()

    useEffect(() => {
        setUserName(user.user_metadata.name)
        setEmail(user.email)
    },[user])
    return (
        <div className="mb-4 flex mt-5 shadow-lg text-[#fff] bg-[#2c2c2c] lg:w-[21rem] h-[20rem] rounded-[15px] items-center justify-center text-center ">
            <div>
                <p className="text-3xl font-bold text-title">{userName}</p>
                <p className="text-xs">{email}</p>
            </div>
        </div>
    )
}
