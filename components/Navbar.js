import { useState, useContext, useEffect } from "react";
import { LanguageContext } from "@/contexts/language";
import Image from "next/image";
import { useRouter } from "next/router";
import { supabase } from "@/utils/supabaseClient";

function Navbar() {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  const { english, setEnglish } = useContext(LanguageContext);

  const userInfo = supabase.auth.user();
  return (
    <nav className="pb-3 relative">
      <div className="bg-[#2c2c2c] mx-auto rounded-[15px]">
        <div className="flex justify-between text-sm">
          <div className="flex space-x-6 pl-2">
            <div className="flex text-center p-2">
              <div className="flex items-center w-28 h-10 relative cursor-pointer" onClick={() => router.push('/')}>
                <Image
                  src="/icons/kukudeals-white.png"
                  layout="fill"
                  alt="kuku logo"
                />
              </div>
            </div>
            <div className="hidden lg:flex items-center space-x-3">
              <a
                href=""
                className="py-4 text-white font-bold hover:text-[#ffd601] "
              >
                PRODUCTS
              </a>
              <a
                href=""
                className="py-4 px-3 text-white font-bold hover:text-[#ffd601]"
              >
                WINNERS
              </a>
            </div>
          </div>
          <div className="hidden lg:flex items-center space-x-6 pr-4 ">
            <a
              href=""
              className="py-4 px-3 text-white font-medium hover:text-[#ffd601]"
            >
              Need Help? Contact us
            </a>
            <a href="" className="py-4 px-3 font-medium text-[#ffd601]">
              <b>Call 0800-KUKU</b>
            </a>

            <div
              onClick={() => setEnglish(!english)}
              className="py-4 px-3 hover:cursor-pointer text-white font-medium hover:text-[#ffd601]"
            >
              {english ? "العربية" : "English"}
            </div>
            <a
              href=""
              className="py-2 px-3 text-white font-medium hover:text-[#ffd601]"
            >
              {userInfo ? (
                <span
                  onClick={(e) => {
                    e.preventDefault();
                    router.push("/profile/personal-details");
                  }}
                >
                  {userInfo.user_metadata.name}
                </span>
              ) : (
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    router.push("/signin");
                  }}
                >
                  Login/Register
                </div>
              )}
            </a>
          </div>
          <div className="lg:hidden flex items-center pr-4">
            <p className="pr-4 text-white font-medium">Use App</p>
            <svg
              onClick={() => setShowMenu(true)}
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white hover:cursor-pointer hover:text-[#ffd601]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
        </div>
        {showMenu ? (
          <div className="absolute top-0 bg-[#2c2c2c] px-4 rounded-[15px] w-full z-30">
            <div className="relative h-full w-full">
              <div className="flex items-center my-2 w-28 h-10 relative cursor-pointer">
                <Image
                  src="/icons/kukudeals-white.png"
                  layout="fill"
                  alt="kuku logo"
                />
              </div>
              <p className="font-medium text-sm text-white mt-6 mb-2 hover:cursor-pointer hover:text-yellow-500">
                Products
              </p>
              <p className="font-medium text-sm text-white mb-2 hover:cursor-pointer hover:text-yellow-500">
                Winners
              </p>
              <p className="font-medium text-sm text-white mt-6 mb-2 hover:cursor-pointer hover:text-yellow-500">
                Need Help? Contact Us
              </p>
              <p className="font-medium text-sm text-[#ffd601] mb-2 hover:cursor-pointer hover:text-yellow-500">
                Call 0800-KUKU
              </p>
              <p className="font-medium text-sm text-white mb-2 hover:cursor-pointer hover:text-yellow-500">
                العربية
              </p>
              {userInfo ? (
                  <p onClick={() => router.push('/profile/settings')} className="font-medium text-sm text-white mb-4 hover:cursor-pointer hover:text-yellow-500">
                    {userInfo.user_metadata.name}
                  </p>
                ) : (
                  <p onClick={() => router.push('/signin')} className="font-medium text-sm text-white mb-4 hover:cursor-pointer hover:text-yellow-500">
                    Login/Register
                  </p>
                )}
              

              <svg
                onClick={() => setShowMenu(false)}
                xmlns="http://www.w3.org/2000/svg"
                className="absolute top-0 right-0 h-6 w-6 text-white hover:cursor-pointer hover:text-yellow-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        ) : null}
      </div>
    </nav>
  );
}

export default Navbar;
