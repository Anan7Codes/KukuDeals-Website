import React, { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { supabase } from '@/utils/supabaseClient';


export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const SignInUser = async (e) => {
    e.preventDefault();
    try {
      const { user, session, error } = await supabase.auth.signIn({
        email,
        password,
      })
      console.log("user",user)
      console.log(user.user_metadata.name);
      console.log("session",session);
      if (error) {
     toast.error(error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        });
        return
      }
      toast.success("Signed in successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      return router.push('/')
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div>
      <div className="flex justify-center pt-20 pb-20">
        <div className="w-1/2  rounded-[25px]  bg-white mb-6 mt-10">
          <div className="ml-28 pt-4">
            <p className="text-3xl text-gray-700 font-bold">Sign In</p>
          </div>
          <form
            onSubmit={SignInUser}
            className="flex justify-center pb-6 pt-2"
          >
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
                <button className="bg-blue-500 mr-3  mt-4 w-full outline-none  rounded-[5px]  h-14 text-white font-bold text-base">
                  Sign In
                </button>
              </div>
              <div className="flex justify-between text-xs">
                <p
                  className="text-blue-500 cursor-pointer "
                  onClick={() => router.push("/signup")}
                >
                  Don&apos;t have an account yet?Click here to Signup
                </p>
                {/* <p className="text-blue-500 cursor-pointer mr-3 ">
                  Forgot password
                </p> */}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
