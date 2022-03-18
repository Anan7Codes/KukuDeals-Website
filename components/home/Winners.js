import Image from 'next/image'
import { useTranslation } from "next-i18next";

export default function Winners({winner}) {
    const  { t, i18n } = useTranslation()

    return (
        <div>
            <div className="grid">
                <div className="w-72 h-96 bg-[#2c2c2c] rounded-[10px] overflow-hidden shadow-lg">
                    <div className="relative">
                        <div className="cursor-pointer absolute top-0 left-14 hover:shadow-outline">
                            <div className="w-48 h-48 relative">
                                <Image
                                    src={winner?.image}
                                    layout="fill"
                                    alt="winner product image"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-span-2 py-4">
                        <div className="text-center tracking-normal pt-48">
                            <p className="text-[#ffd601] font-bold font-title leading-8 italic text-[24px]">{t('congratulations')}</p>
                            <p className="text-white text-xl py-1 font-medium">{winner?.winner_name}</p>
                            <p className="text-[#fff] text-sm">{t('on-winning')} &nbsp;<span className='text-[#ffd601] font-extrabold'>{winner?.gift_name}</span></p>
                            <p className="text-[#fff] text-sm">{t('coupon-no')}&nbsp; <span className='text-[#fff] font-extrabold'>{winner?.coupon}</span></p>
                            <p className="text-[#fff] text-sm">{t('announced')}:&nbsp; <span className='text-[#fff] font-extrabold'>{winner?.announced}</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
