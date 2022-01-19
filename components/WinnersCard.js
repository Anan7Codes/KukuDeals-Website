import Image from 'next/image'

export default function WinnersCard() {
    return (
        <div className="grid grid-cols-4 gap-2">
            <div className="w-[16rem] h-[24rem] bg-white rounded-[25px] overflow-hidden shadow-lg ">
                <div className="relative justify-self-center">
                    <div className=" cursor-pointer absolute top-0 left-0 mt-4 ml-2 hover:shadow-outline w-60 h-44 cursor-pointer">
                        <Image
                            src="/icons/explore/explore-banner.png"
                            layout="fill"
                            alt="product logo"
                        />
                    </div>
                </div>
                <div className="col-span-2 ">
                    <div className="text-center tracking-tighter  pt-48">
                        <p className="text-[#7000ff] font-[700] leading-8 italic text-[24px] ">Congratulations</p>
                        <p className="text-gray-700 text-xl leading-5 font-medium">Riswan Khan</p>
                        <p className="text-gray-700 text-xl leading-5">on winning</p>
                        <p className="text-gray-700 text-xl font-semibold">AED20,000 Cash</p>
                    </div>
                    <div className=" pt-3 text-center">
                        <button className="w-48 h-7  border border-gray rounded-[20px]  text-[10px] font-normal  text-gray-700 mr-2 mb-2">
                            You are not participant in this
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
