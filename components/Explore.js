import Image from "next/image";

export default function Explore() {
  return (
    <div className=" w-full h-96 mb-6 bg-white cursor-pointer rounded-[15px] overflow-hidden shadow-lg transition ease-in-out delay-100  hover:-translate-y-1 hover:scale-105  duration-1000 ">
      <div className="flex flex-row">
        <div className="relative justify-self-center">
          <div className=" cursor-pointer absolute top-0 left-0 mt-6  ml-4 w-32 h-11 hover:shadow-outline w-60 h-44 cursor-pointer">
            <Image
              src="/icons/explore/shop-logo.png"
              layout="fill"
              alt="product logo"
            />
          </div>
          <div className="absolute top-5 left-3 mt-6 ml-8 w-[28rem] h-72 object-cover">
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

        <div className="grid grid-rows-3 grid-flow-col gap-4">
          <div className="ml-[40rem] col-span-2 tracking-tight	leading-8">
            <div className="text-9xl pt-4 italic text-[#f22] font-black">
              Win
            </div>
            <div className="text-[35px] text-gray-600 font-black ">
              AED 10,000 Cash
            </div>
            <div className="text-4xl">
              Buy a Zorno Pencil and make it yours!
            </div>
            <div className="flex justify-between text-4xl font-bold text-blue-500">
              AED5.00
            </div>
          </div>
          <div className="row-span-2 col-span-2 space-x-4 ml-[40rem]">
            <button className="w-48 h-14 border-2 border-gray-300 hover:bg-gray-200 rounded-[20px] ">
              Prize Details
            </button>
            <button className="bg-blue-500 w-48 h-14 text-white font-bold hover:bg-blue-400 rounded-[15px]">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
