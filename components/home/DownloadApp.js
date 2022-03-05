import Image from "next/image";
import { useTranslation } from "next-i18next";

export default function DownloadApp() {
  const  { t, i18n } = useTranslation()

    return (
      <div className="flex flex-col lg:flex-row items-center justify-between py-6 px-8 my-3 bg-[#2c2c2c] mx-auto w-full rounded-[10px]">
          <div>
            <p className="text-2xl lg:text-3xl font-title font-semibold text-[#ffd601]">{t('download-our-app')}</p> 
            <p className="text-sm lg:text-xl font-semibold text-white">{t('available-on')}</p>
          </div>
          <div className="flex space-x-2 lg:space-x-8">
              <div className={`relative w-32 h-20 lg:w-48 lg:h-32 hover:cursor-pointer ${i18n.language === 'ar' ? 'ml-8' : null}`}>
                    <Image
                      src="/icons/footerIcons/appstore.svg"
                      layout="fill"
                      alt="googleplay logo"
                    />
              </div>
              <div className="relative w-32 h-20 lg:w-48 lg:h-32 hover:cursor-pointer">
                <Image
                    src="/icons/footerIcons/playstore.svg"
                    layout="fill"
                    alt="googleplay logo"
                />
            </div>
            
          </div>
      </div>
    );
  }