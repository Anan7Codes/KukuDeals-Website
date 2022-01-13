import Image from "next/image";

export default function Draw1() {
  return (
    <div>
      <div className="">
        <div className="text-white text-center font-bold">
          <div className="bg-red-600 h-9 pt-2 text-medium rounded-t-3xl">
            Draw Details :
          </div>
          <div className="bg-[#f53435] h-24 pt-2 text-2xl">
            Live on Thursday,13 Jan <br />
            2022 at Global Village
          </div>
        </div>
        <div className=" grid grid-cols-2 gap-60 w-80 h-[28rem]  rounded-[15px] overflow-hidden shadow-lg ">
          <div className="relative justify-self-center">
            <div className=" cursor-pointer absolute top-0 left-0 mt-24 ml-4 hover:shadow-outline w-60 h-44 cursor-pointer">
              <Image
                src="/icons/explore/explore-banner.png"
                layout="fill"
                alt="product logo"
              />
            </div>
            <div className="absolute top-5 left-3 mt-24 ml-4  w-48 h-28 object-cover">
              <Image
                src="/icons/soldout/soldout.png"
                layout="fill"
                alt="product logo"
              />
            </div>
          </div>
          <div className="col-span-2 ">
            <div className="text-center pt-4">
              <p className="text-black text-xl ">
                Get a chance to <span className="text-red-600">Win</span>
              </p>
              <p className="text-black text-xl ">AED40,000 Cash</p>
              <p className="text-black text-xl ">CG-01266</p>
            </div>
            <div className=" pt-3 text-center">
              <button className="w-48 h-7  border-2 border-gray rounded-[20px]  text-xs font-normal  text-gray-700 mr-2 mb-2">
                You are not participant in this
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
