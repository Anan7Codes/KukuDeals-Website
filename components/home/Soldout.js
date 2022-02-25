import Image from "next/image";

export default function Soldout({ campaign }) {
  if(campaign?.SoldOut) {
  return (
    <div >
      <div className="grid  gap-2 ">
        <div className="w-[16rem] h-[24rem] bg-[#2c2c2c] rounded-[25px] overflow-hidden shadow-lg ">
          <div className="relative justify-self-center">
            <div className=" cursor-pointer absolute top-0 left-0 mt-9 ml-6 opacity-50  hover:shadow-outline w-52 h-52">
              <Image
                src={campaign?.Image}
                layout="fill"
                alt="product logo"
              />
            </div>
            <div className="absolute top-3 left-6 mt-20 ml-8 opacity-50  w-36 h-24 object-cover">
              <Image
                src="/icons/soldout/soldout.png"
                layout="fill"
                alt="product logo"
              />
            </div>
          </div>
          <div className=" pt-64  ">
            <div className="text-center text-[1.12rem] tracking-wide">
              <p className="text-white italic font-title font-bold mt-4">{campaign?.ProductName.en}</p>
              <p className="text-white text-sm leading-4">{campaign?.ProductName.en}</p>
              <p className="text-white pl-1 font-medium text-sm">
                Draw Date:
                <span className="font-extrabold text-[#ffd601]">
                  {campaign?.ProductName.en}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
  } else return null
}
