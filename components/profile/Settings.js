import React from 'react'

export default function Settings() {
    return (
        <div>
            <div>
                <p className="text-3xl text-gray-700 font-bold ">Change Password</p>
          
<div className="flex">
<input
            placeholder="Current Password"
            className="border border-gray-300 placeholder:text-xs text-lg  pl-3 mr-3 w-[26rem] mt-4 outline-none  text-xs rounded-[5px]  h-14  border-gray-300 "
          />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 absolute top-44 right-[28rem] cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="#808080">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
</svg>

</div>

<input
            placeholder="New Password"
            className="border border-gray-300 placeholder:text-xs text-lg  pl-3 mr-3 w-[26rem] mt-4 outline-none  text-xs rounded-[5px]  h-14  border-gray-300 "
          />
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 absolute top-[15.5rem] right-[28rem] cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="#808080">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
</svg>

<input
            placeholder="Confirm Password"
            className="border border-gray-300 placeholder:text-xs text-lg  pl-3 mr-3 w-[26rem] mt-4 outline-none  text-xs rounded-[5px]  h-14  border-gray-300 "
          />
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 absolute top-[20rem] right-[28rem] cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="#808080">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
</svg>
</div>
<button className="bg-blue-500 mt-4 font-semibold hover:bg-blue-600 text-white w-52 h-16 text-center  rounded-[10px]">
    Update Password
</button>
            </div>
    )
}
