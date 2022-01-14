import Image from "next/image";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function Explore() {
  return (
    <div className="w-full my-16">
      <div className="flex flex-row h-80 bg-white cursor-pointer rounded-[15px] overflow-visible shadow-lg transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-105 duration-300">
        <div className="relative justify-self-center">
          <div className="cursor-pointer absolute top-0 left-0 mt-6 ml-4 w-32 h-11 hover:shadow-outline w-60 h-44 cursor-pointer">
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

        {/* <div className="p-5 px-5">
          <div className=" absolute flex items-center w-32 h-11 relative cursor-pointer">
            <Image
              src="/icons/explore/shop-logo.png"
              layout="fill"
              alt="banner logo"
            />
          </div>
        </div>
        <div className="  w-[36rem] h-80  relative cursor-pointer">
          <Image
            src="/icons/explore/explore-banner.png"
            layout="fill"
            alt="banner logo"
          />
        </div> */}

        <div className="flex flex-col w-full relative">
          <div className="ml-[35rem]">
            <p className="text-8xl font-bold pt-4 italic text-[#f22] font-black">Win</p>
            <p className="text-3xl text-gray-600 font-extrabold leading-5 ml-4">AED 10,000 Cash</p>
            <p className="text-2xl ml-4 text-gray-700 font-medium">Buy a Zorno Pencil and make it yours!</p>
            <p className="flex justify-between text-2xl font-bold text-blue-500 leading-5 ml-4">AED5.00</p>
          </div>
          <div className="mt-10 space-x-4 ml-[35rem]">
            <button className="w-40 h-14 border-2 border-gray-300 hover:bg-gray-200 rounded-[20px] ml-4">
              Prize Details
            </button>
            <button className="bg-blue-500 w-40 h-14 text-white font-bold hover:bg-blue-400 rounded-[15px]">
              Add to Cart
            </button>
          </div>

          <div className="absolute -top-4 -right-4 h-28 w-28 p-2 bg-white rounded-full">
            <CircularProgressbar value={66} maxValue={200} strokeWidth={10} styles={buildStyles({
              pathColor: '#329b24',
              trailColor: '#e6e6e6',
            })}/>
            <div className="flex flex-col items-center absolute top-0 h-20 w-20 mt-7 ml-2">
              <p className="text-lg font-bold text-gray-800 leading-4">60</p>
              <p className="text-[8px] font-extrabold text-gray-800 leading-2">SOLD</p>
              <p className="text-[8px] text-gray-400 leading-2">OUT OF</p>
              <p className="text-sm font-bold text-gray-400 leading-4">200</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
