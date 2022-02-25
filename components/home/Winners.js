import Image from 'next/image'

export default function Winners({winner}) {
  return (
    <div>
         <div className="grid gap-2">
            <div className="w-[16rem] h-[24rem] bg-[#2c2c2c] rounded-[25px] overflow-hidden shadow-lg ">
                <div className="relative">
                    <div className="cursor-pointer absolute top-0 left-0  mt-4 ml-6 hover:shadow-outline w-52 h-52">
                        <Image
                            src={winner?.image}
                            layout="fill"
                            alt="product logo"
                        />
                    </div>
                </div>
                <div className="col-span-2 py-4">
                    <div className="text-center tracking-normal pt-56">
                        <p className="text-[#ffd601] font-bold font-title leading-8 italic text-[24px]">Congratulations</p>
                        <p className="text-white text-xl py-1 font-medium">{winner?.winner_name}</p>
                        <p className="text-[#fff] text-sm">on winning &nbsp;<span className='text-[#ffd601] font-extrabold'>{winner?.gift_name}</span></p>
                        <p className="text-[#fff] text-sm">Coupon no.&nbsp; <span className='text-[#fff] font-extrabold'>{winner?.coupon}</span></p>
                        <p className="text-[#fff] text-sm">Announced :&nbsp; <span className='text-[#fff] font-extrabold'>{winner?.announced}</span></p>
                    </div>
                </div>
            </div>
      </div>
    </div>
  );
}
