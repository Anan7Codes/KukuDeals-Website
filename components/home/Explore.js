import Image from "next/image";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function Explore() {
  return (
    <div className="w-full relative my-10">
      <div className="flex flex-col items-center justify-around lg:flex-row h-[50vh] pb-6 bg-white cursor-pointer rounded-[15px] overflow-visible shadow-lg transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-[102%] duration-300">
        <div className="mt-[60px] lg:mt-0">
          <div className="cursor-pointer absolute top-0 left-0 mt-6 ml-4 hover:shadow-outline w-24 h-10">
            <Image
              src="/icons/explore/shop-logo.png"  
              layout="fill"
              alt="product logo"
            />
          </div>
          <div className="relative lg:top-5 lg:left-6 flex justify-center items-center lg:w-[28rem] h-36 w-60 lg:h-64">
            <Image
              src="/icons/explore/explore-banner.png"
              layout="fill"
              alt="product logo"
            />
          </div>
        </div>
        <div className="flex-col w-full pb-6 lg:pb-0">        
          <div className="justify-center">
            <div className="text-sm text-center sm:pl-4 sm:pt-2 lg:text-justify	 lg:text-3xl">
              <div className="lg:pt-8">
                <p className="text-5xl lg:text-7xl font-bold lg:leading-none italic text-[#f22]">
                  Win
                </p>
              </div>
              <p className="text-lg lg:text-3xl text-gray-600 tracking-tighter font-extrabold leading-6 lg:leading-none">
                AED 10,000 Cash
              </p>
              <p className="text-lg lg:text-3xl text-gray-700 tracking-tighter leading-4 lg:leading-none font-medium">
                Buy a Zorno Pencil and make it yours!
              </p>
              <p className="text-lg lg:text-3xl tracking-tighter font-bold text-blue-500 lg:leading-none">
                AED5.00
              </p>
              <div className="mt-4 space-x-2 text-sm lg:text-base">
                <button className="w-32 h-12 lg:w-44 lg:h-12  text-gray-700 font-semibold border border-gray-200 hover:bg-gray-200 rounded-[12px] ">
                  Prize Details
                </button>
                <button className="bg-blue-500 w-32 h-12 lg:w-44 lg:h-12 text-white font-semibold hover:bg-blue-400 rounded-[12px]">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>

          <div className="absolute -top-4 -right-4 h-20 w-28 lg:h-28 lg:w-32 p-2 bg-white rounded-full">
            <CircularProgressbar
              value={66}
              maxValue={200}
              strokeWidth={10}
              styles={buildStyles({
                pathColor: "#329b24",
                trailColor: "#e6e6e6",
              })}
            />
            <div className="flex flex-col text-center absolute top-0 h-20 w-20 mt-7 ml-2 lg:ml-4">
              <p className="text-lg lg:text-2xl font-semibold text-gray-600 leading-4 lg:leading-none">60</p>
              <p className="text-[9px] font-semibold text-gray-600 leading-3 lg:leading-1">SOLD</p>
              <p className="text-[9px] text-gray-400 leading-3 lg:leading-1">OUT OF</p>
              <p className="text-md lg:text-xl font-normal text-gray-300 leading-4 lg:leading-none">200</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
