import Image from "next/image";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function Explore() {
  return (
    <div className="w-full h-fit relative my-10">
      <div className="sm:flex lg:flex flex-row  h-fit pb-6 bg-white cursor-pointer rounded-[15px] overflow-visible shadow-lg transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-[102%] duration-300">
        <div className=" justify-self-center">
          <div className="cursor-pointer absolute top-0 left-0 mt-6 ml-4 hover:shadow-outline w-24 h-10">
            <Image
              src="/icons/explore/shop-logo.png"
              layout="fill"
              alt="product logo"
            />
          </div>
          <div className="relative top-5 left-32 lg:left-6 flex justify-center items-center sm:left-20 sm:w-60 lg:w-[28rem] h-32 w-40  lg:h-64 ">
            <Image
              src="/icons/explore/explore-banner.png"
              layout="fill"
              alt="product logo"
            />
          </div>
        </div>
        <div className="flex-col w-full ">
        
          <div className=" justify-center ">
            <div className="text-sm text-center  sm:pl-4 sm:pt-2 lg:text-justify	 lg:text-3xl">
            <div className=" lg:pt-8">
           <p className="text-lg lg:text-[5rem] font-bold lg:leading-none italic text-[#f22]">
              Win
            </p>
           </div>

            <p className="  text-gray-600  tracking-tighter	font-extrabold lg:leading-7 ">
              AED 10,000 Cash
            </p>
            <p className="  text-gray-700 tracking-tighter lg:leading-8 font-medium">
              Buy a Zorno Pencil and make it yours!
            </p>
            <p className=" tracking-tighter font-bold text-blue-500 lg:leading-8 ">
              AED5.00
            </p>
          <div className="mt-2 lg:mt-4 space-x-2 text-sm lg:text-base ">
            <button className="w-28 h-9 lg:w-44 lg:h-12  text-gray-700 font-semibold border border-gray-200 hover:bg-gray-200 rounded-[12px] ">
              Prize Details
            </button>
            <button className="bg-blue-500 w-28 h-9 lg:w-44 lg:h-12 text-white font-semibold hover:bg-blue-400 rounded-[12px]">
              Add to Cart
            </button>
          </div>
            </div>
          </div>

          <div className="absolute -top-4 -right-4 h-28 w-32 p-2 bg-white rounded-full">
            <CircularProgressbar
              value={66}
              maxValue={200}
              strokeWidth={10}
              styles={buildStyles({
                pathColor: "#329b24",
                trailColor: "#e6e6e6",
              })}
            />
            <div className="flex flex-col text-center absolute top-0 h-20 w-20 mt-7 ml-4 ">
              <p className="text-2xl font-semibold text-gray-600 leading-6">60</p>
              <p className="text-[9px] font-semibold text-gray-600 leading-3 pb-1 ">
                SOLD
              </p><hr/>
              <p className="text-[9px] text-gray-400 leading-2 ">OUT OF</p>
              <p className="text-xl font-normal text-gray-300 leading-4">200</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
