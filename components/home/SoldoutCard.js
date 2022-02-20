import Image from "next/image";

export default function SoldoutBox() {
  return (
    <div className="grid grid-cols-4 gap-2">
      <div className="w-[16rem] h-[22rem] bg-[#2c2c2c] rounded-[25px] overflow-hidden shadow-lg ">
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
          <div className="text-center text-[1.12rem] tracking-wide">
            <p className="text-white font-semibold mt-4">AED40,000 Cash</p>
            <p className="text-white text-sm leading-4">CG-01266</p>
            <p className="text-white pl-1 text-sm">
              Draw Date:
              <span className="font-semibold text-[#ffd601]">
                13 January 2022
              </span>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
