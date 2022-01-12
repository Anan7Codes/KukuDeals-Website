import Link from "next/link";
import Image from "next/image";

function Navbar() {
  return (
    <nav className="bg-gray-300 py-2 font-title">
      <div className=" container bg-white mx-auto py-1  rounded-[15px]">
        <div className=" flex justify-between ">
          <div className="flex space-x-6 pl-2">
            <div className="py-3 px-3 flex items-center">
              <img src="icons/kuku deals logo file variants-4.png" className="w-14 h-14 cursor-pointer"/>
              <span className="font-bold text-3xl cursor-pointer">deals</span>
            </div>
            <div className="flex items-center space-x-3">
              <a href="" className="py-4 px-3 text-lg text-gray-400 font-medium hover:text-red-400">
                PRODUCTS
              </a>
              <a href="" className="py-4 px-3 text-lg text-gray-400 font-medium hover:text-red-400">
                WINNERS
              </a>
            </div>
          </div>
          <div className="flex items-center space-x-6 pr-4">
            <a href="" className="py-4 px-3 text-lg text-gray-400 font-medium hover:text-red-400">
              Need Help? Contact us
            </a>
            <a href="" className="py-4 px-3 text-[#0073ff] text-lg">
              <b>Call 0800-IDEALZ</b>
            </a>

            <a href="" className="py-4 px-3 text-lg text-gray-400 font-medium hover:text-red-400">
              العربية
            </a>
            <a href="" className="py-2 px-3 text-lg text-gray-400 font-medium hover:text-red-400 ">
              Register/Login
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
