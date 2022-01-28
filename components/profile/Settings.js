import React from "react";

export default function Settings() {
  return (
    <div>
      <div>
        <p className="text-3xl text-gray-700 font-bold ">Change Password</p>

        <div className="lg:flex">
          <input
            placeholder="Current Password"
            type="password"
            className="border placeholder:text-xs text-lg  pl-3 mr-3 w-full lg:w-[26rem] mt-4 outline-none  rounded-[5px]  h-14  border-gray-300 "
            />
         
        </div>

        <input
          placeholder="New Password"
          type="password"
          className="border placeholder:text-xs text-lg  pl-3 mr-3 w-full lg:w-[26rem] mt-4 outline-none  rounded-[5px]  h-14  border-gray-300 "
        />
      

        <input
          placeholder="Confirm Password"
          type="password"
          className="border placeholder:text-xs text-lg  pl-3 mr-3 w-full lg:w-[26rem] mt-4 outline-none  rounded-[5px]  h-14  border-gray-300 "
        />
       
      </div>
      <button className="bg-blue-500 mt-4 font-semibold hover:bg-blue-600 text-white w-full lg:w-52 h-16 text-center  rounded-[10px]">
        Update Password
      </button>
    </div>
  );
}
