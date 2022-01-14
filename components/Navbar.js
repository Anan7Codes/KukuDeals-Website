import Link from "next/link";
import Image from "next/image";

function Navbar() {
  return (
    <nav className="pb-3">
      <div className=" container bg-white mx-auto py-2 rounded-[15px]">
        <div className=" flex justify-between ">
          <div className="flex space-x-6 pl-2 text-base">
            <div className="flex text-center p-2">
              <div className="flex items-center w-32 h-12 relative cursor-pointer">
                <Image
                  src="/icons/kukudealslogo-black.png"
                  layout="fill"
                  alt="kuku logo"
                />
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <a
                href=""
                className="py-4 px-3 text-[#4a4a4a] font-bold hover:text-red-400 "
              >
                PRODUCTS
              </a>
              <a
                href=""
                className="py-4 px-3  text-[#4a4a4a] font-bold hover:text-red-400"
              >
                WINNERS
              </a>
            </div>
          </div>
          <div className="flex items-center space-x-6 pr-4 text-base">
            <a
              href=""
              className="py-4 px-3 text-[#4a4a4a] font-medium hover:text-red-400"
            >
              Need Help? Contact us
            </a>
            <a href="" className="py-4 px-3 text-[#0073ff] ">
              <b>Call 0800-KUKU</b>
            </a>

            <a
              href=""
              className="py-4 px-3  text-[#4a4a4a] font-medium hover:text-red-400"
            >
              العربية
            </a>
            <a
              href=""
              className="py-2 px-3 text-[#4a4a4a] font-medium hover:text-red-400 "
            >
              Register/Login
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
