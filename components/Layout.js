import React from 'react'
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

function Layout({children}) {

    return (
        <div className="bg-[#161616] mx-auto max-w-[1266px] container px-5 pt-4 overflow-x-hidden min-h-screen">   
            <Navbar/>
                {children}               
            <Footer/>
        </div>
    )
}

export default Layout