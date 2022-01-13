import Image from 'next/image'

export default function Winners1() {
    return (
        <div>
            <div>
                <div className=" grid grid-cols-2 gap-60 w-80 h-[28rem] bg-white rounded-[15px] overflow-hidden shadow-lg ">
                    <div className="relative justify-self-center">
                        <div className=" cursor-pointer absolute top-0 left-0 mt-16 ml-4 hover:shadow-outline w-60 h-44 cursor-pointer">
                            <Image
                                src="/icons/explore/explore-banner.png"
                                layout="fill"
                                alt="product logo"
                            />
                        </div>

                    </div>
                    <div className="col-span-2 ">
                        <div className="text-center pt-4">
                            <p className="text-[#7000ff] font-[1000] italic text-[28px] ">Congratulations</p>
                            <p className="text-black text-xl ">Riswan Khan<br />on winning</p>
                            <p className="text-black text-xl ">AED20,000 Cash</p>
                            {/* <p className="text-black text-xl ">
              Draw Date :
              <span className=" text-xl text-red-600">13 January 2022</span>
            </p> */}
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
    )
}
