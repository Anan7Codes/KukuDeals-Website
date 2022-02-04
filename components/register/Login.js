import React, { useState } from 'react';
import { nhost } from "@/utils/nhost";
import { useRouter } from 'next/router';


export default function Login() {
    const router = useRouter()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            nhost.auth.signIn({
                email,
                password,
            });
            alert("Login successful")
            router.push('/')
        } catch (error) {
             alert("Login failed");
             console.log(error);
        }
    }

    return <div>
        <div className="flex justify-center pt-20 pb-20">
            <div className="w-1/2  rounded-[25px]  bg-white mb-6 mt-10">
                <div className="ml-28 pt-4">
                    <p className="text-3xl text-gray-700 font-bold">Please Login</p>
                </div>
                <form onSubmit={handleSubmit} className="flex justify-center pb-6 pt-2">
                    <div className="flex flex-col">
                        <input
                            type="text"
                            className="border placeholder:text-xs text-xs pl-3 mr-3 w-full lg:w-96 mt-4 outline-none  rounded-[5px]  h-14  border-gray-300 "
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            className="border placeholder:text-xs text-xs pl-3 mr-3 w-full lg:w-96 mt-4 outline-none  rounded-[5px]  h-14  border-gray-300 "
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className="pb-6 flex justify-between">
                            <button className="bg-blue-500 mr-3  mt-4 w-full outline-none  rounded-[5px]  h-14 text-white font-bold text-base  ">
                                login
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>;
}
