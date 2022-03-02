import Image from "next/image";

export default function Soldout({ campaign }) {
  if(campaign?.SoldOut) {
  return (
    <div className="grid">
      <div className="w-72 h-96 bg-[#2c2c2c] rounded-[25px] overflow-hidden shadow-lg relative">
        <div>
          <div className="cursor-pointer absolute top-0 left-10 mt-12 hover:shadow-outline">
            <div className="relative w-52 h-52">
              <Image
                src={campaign?.Image}
                layout="fill"
                alt="product logo"
              />
            </div>
          </div>
          <div className="absolute items-center justify-center w-[90%] top-28 mx-4">
            <div className="relative w-full h-24">
              <Image
                src="/icons/soldout/soldout.png"
                layout="fill"
                alt="product logo"
              />
            </div>
          </div>
        </div>
        <div className="pt-64">
          <div className="text-center">
            <p className="text-white text-xl font-semibold mt-4">{campaign?.GiftName.en}</p>
            <p className="text-white text-sm leading-4">{campaign?.ProductName.en}</p>
            <p className="text-white font-medium text-sm">
              Draw Date:
              <span className="font-semibold pl-1 text-[#ffd601]">
                {campaign?.ProductName.en}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
  } else return null
}
