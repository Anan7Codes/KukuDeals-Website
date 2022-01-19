import Image from "next/image";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function Explore() {
  return (
    <div className="w-full h-80 relative my-6">
      <div className="flex flex-row h-80 bg-white cursor-pointer rounded-[15px] overflow-visible shadow-lg transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-[102%] duration-300">
        <div className=" justify-self-center">
          <div className="cursor-pointer absolute top-0 left-0 mt-6 ml-4 w-24 h-9 hover:shadow-outline w-60 h-44 cursor-pointer">
            <Image
              src="/icons/explore/shop-logo.png"
              layout="fill"
              alt="product logo"
            />
          </div>
          <div className="absolute top-5 left-3 mt-6 ml-8 w-[28rem] h-64 object-cover">
            <Image
              src="/icons/explore/explore-banner.png"
              layout="fill"
              alt="product logo"
            />
          </div>
        </div>
        <div className="flex flex-col  w-full ">
          <div className="ml-[30rem] pt-8">
            <p className="text-[5rem] font-bold leading-none	 italic text-[#f22] font-[1000]">
              Win
            </p>
            <p className="text-3xl text-gray-600  tracking-tighter	font-extrabold leading-7 ml-4">
              AED 10,000 Cash
            </p>
            <p className="text-3xl ml-4 text-gray-700 tracking-tighter leading-8 font-medium">
              Buy a Zorno Pencil and make it yours!
            </p>
            <p className="flex justify-between tracking-tighter	 text-3xl font-bold text-blue-500 leading-8  ml-4">
              AED5.00
            </p>
          </div>
          <div className="mt-4 space-x-2 ml-[30rem] text-base">
            <button className="w-44 h-12 border text-gray-700 font-semibold border-gray-300 hover:bg-gray-200 rounded-[12px] ml-4">
              Prize Details
            </button>
            <button className="bg-blue-500 w-44 h-12 text-white font-semibold hover:bg-blue-400 rounded-[12px]">
              Add to Cart
            </button>
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
