import Image from "next/image";

export default function DrawBox() {
  return (
    <div className=" w-[16rem] h-[28rem]">
      <div className="text-white text-center  ">
        <div className="bg-red-600 font-semibold h-9 pt-2 text-sm rounded-t-3xl">
          Draw Details :
        </div>
        <div className="bg-[#f53435] font-bold h-16 pt-2 text-xl leading-5	">
          Live on Thursday,13 Jan <br />
          2022 at Global Village
        </div>
      </div>

      <div className=" w-[16rem] h-[20rem] bg-white rounded-b-3xl overflow-hidden shadow-lg ">
        <div className="relative justify-self-center">
          <div className=" cursor-pointer absolute top-0 left-0 opacity-50  hover:shadow-outline w-60 h-36 cursor-pointer">
            <Image
              src="/icons/explore/explore-banner.png"
              layout="fill"
              alt="product logo"
            />
          </div>
          <div className="absolute top-5 left-5  ml-8  mt-5 w-36 h-20 object-cover">
            <Image
              src="/icons/soldout/soldout.png"
              layout="fill"
              alt="product logo"
            />
          </div>
        </div>
        <div className="mt-44">
          <div className="text-center pt-4 text-lg leading-5	 ">
            <p className="text-gray-700 font-medium">
              Get a chance to{" "}
              <span className="text-[#f53435] font-bold italic">WIN:</span>
            </p>
            <p className="text-gray-600 font-bold ">AED40,000 Cash</p>
            <p className="text-gray-600 font-bold ">CG-01266</p>
          </div>
        </div>
      </div>
    </div>
  );
}
