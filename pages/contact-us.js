import React from 'react'
import Image from 'next/image'
import Layout from '@/components/Layout';

function ContactUs() {
  return (
    <Layout>
        <div className="my-3 flex flex-col lg:flex-row items-center justify-center rounded-[10px] bg-[#2c2c2c] p-4">
            <div className="flex-1 hidden lg:flex items-center justify-center w-32">
                <div className="relative w-44 h-40 mx-8">
                    <Image
                        src="/icons/contactus.png"
                        layout="fill"
                        alt="Contact Us"
                    />
                </div>
            </div>
            <div className="flex flex-col py-12">
                <p className="text-[#ffd601] font-title font-semibold text-4xl">Contact Us</p>
                <p className="text-white font-semibold text-lg">Please fill in the form below and our team will get back to you in less than 24 hours.</p>
                <input
                  type="text"
                  className="border placeholder:text-xs text-white placeholder:text-[#d3d3d3] text-xs font-semibold pl-3 mr-3 w-full lg:w-96 mt-12 outline-none rounded-[5px] h-14 border-[#d3d3d3] bg-[#2c2c2c]"
                  placeholder="Full Name"
                />
                <input
                  type="text"
                  className="border placeholder:text-xs text-white placeholder:text-[#d3d3d3] text-xs font-semibold pl-3 mr-3 w-full lg:w-96 mt-4 outline-none rounded-[5px] h-14 border-[#d3d3d3] bg-[#2c2c2c]"
                  placeholder="Email Address"
                />
                <textarea
                  className="border placeholder:text-xs text-white placeholder:text-[#d3d3d3] text-xs font-semibold pl-3 mr-3 pt-4 w-full lg:w-96 mt-4 outline-none rounded-[5px] h-28 border-[#d3d3d3] bg-[#2c2c2c]"
                  placeholder="Message"
                ></textarea>
            </div>
        </div>
    </Layout>
  )
}

export default ContactUs