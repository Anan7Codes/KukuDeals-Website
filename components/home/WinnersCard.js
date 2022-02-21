import Image from 'next/image'

export default function WinnersCard() {
    return (
        <div className="grid grid-cols-4 gap-2">
            <div className="w-[16rem] bg-[#2c2c2c] rounded-[25px] overflow-hidden shadow-lg ">
                <div className="relative justify-self-center">
                    <div className="cursor-pointer absolute top-0 left-0 mt-4 ml-2 hover:shadow-outline w-60 h-44">
                        <Image
                            src="/icons/explore/explore-banner.png"
                            layout="fill"
                            alt="product logo"
                        />
                    </div>
                </div>
                <div className="col-span-2 py-4">
                    <div className="text-center tracking-tighter pt-48">
                        <p className="text-[#ffd601] font-[700] leading-8 italic text-[24px]">Congratulations</p>
                        <p className="text-white text-md py-1 font-medium">Riswan Khan</p>
                        <p className="text-white text-sm">on winning <span className='text-[#ffd601] font-semibold'>AED20,000 Cash</span></p>
                    </div>
                </div>
            </div>
        </div>
    )
}
