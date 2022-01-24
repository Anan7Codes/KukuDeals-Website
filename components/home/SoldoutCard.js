import Image from "next/image";

export default function SoldoutBox() {
  return (
    <div className="grid grid-cols-4 gap-2">

      <div className="w-[16rem] h-[22rem] bg-white rounded-[25px] overflow-hidden shadow-lg ">
      <div className="relative justify-self-center">
      <div className=" cursor-pointer absolute top-0 left-0 mt-12 opacity-60 ml-2 hover:shadow-outline w-52 h-44">
            <Image
              src="/icons/explore/explore-banner.png"
              layout="fill"
              alt="product logo"
            />
          </div>
          <div className="absolute top-3 left-6 mt-24 ml-4  w-36 h-24 object-cover">
            <Image
              src="/icons/soldout/soldout.png"
              layout="fill"
              alt="product logo"
            />
          </div>
          </div>
          <div className=" pt-56">
          <div className="text-center text-[1.12rem] font-medium tracking-wide">
            <p className="text-black ">AED40,000 Cash</p>
            <p className="text-black  ">CG-01266</p>
            <p className="text-black pl-1 ">
              Draw Date :
              <span className="  font-bold text-[#f53435]">
                13 January 2022
              </span>
            </p>
          </div>
          <div className="pt-1  text-center">
            <button className="w-48 h-7  border-2 border-gray rounded-[20px]  text-[10px]   text-gray-700 mr-2 mb-2">
              You are not participant in this
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
