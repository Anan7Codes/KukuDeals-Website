import React from "react";

export default function ChangePassword() {
  return (
    <div>
      <div>
        <p className="text-3xl font-bold font-title text-[#ffd601]">Change Password</p>

        <div className="lg:flex">
          <input
            placeholder="Current Password"
            type="password"
            className="text-white placeholder:text-xs placeholder:text-white text-lg bg-[#2c2c2c] pl-3 mr-3 w-full lg:w-[26rem] mt-4 outline-none  rounded-[5px]  h-14 "
            />
         
        </div>

        <input
          placeholder="New Password"
          type="password"
          className="text-white placeholder:text-xs placeholder:text-white text-lg bg-[#2c2c2c] pl-3 mr-3 w-full lg:w-[26rem] mt-4 outline-none  rounded-[5px]  h-14 "
          />
      

        <input
          placeholder="Confirm Password"
          type="password"
          className="text-white placeholder:text-xs placeholder:text-white text-lg bg-[#2c2c2c] pl-3 mr-3 w-full lg:w-[26rem] mt-4 outline-none  rounded-[5px]  h-14 "
          />
       
      </div>
      <button className="bg-[#ffd601] mt-4 font-semibold hover:bg-[#ceb32f] text-black w-full lg:w-52 h-16 text-center  rounded-[10px]">
        Update Password
      </button>
    </div>
  );
}
