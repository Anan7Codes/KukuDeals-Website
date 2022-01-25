import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import '../pages/i18n'
import i18next from 'i18next'
import en from '../locales/en';
import ar from '../locales/ar';
import { useContext, useEffect, useState } from 'react';
import cookies from 'js-cookie'
import { MyContext } from 'pages/_app';



export default function Nav(props) {

    const val = useContext(MyContext)
    const router = useRouter();
    const { locale } = router;
    const languages = [
        {
            code: 'en-US',
            name: 'English',
            dir: 'ltr'

        },
        {
            code: 'ar',
            name: 'العربية',
            dir: 'rtl'
        }
    ]

    const currentLanguageCode = cookies.get('i18next') || 'en-US';
    const currentLanguage = languages.find(l => l.code === currentLanguageCode)

    const t = locale === 'en-US' ? en : ar

    useEffect(() => {
        document.body.dir = currentLanguage.dir || 'ltr'
        console.log("currentLanguage", currentLanguage);
        console.log("currentLanguageCode", currentLanguageCode);
        console.log(props);
    }, [currentLanguage])


    return (
        <div>
            <div className=" container bg-white mx-auto  rounded-[15px]">
                <div className=" flex justify-between text-sm">
                    <div className="flex space-x-6 pl-2 ">
                        <div className="flex text-center p-2">
                            <div className="flex items-center w-28 h-10 relative cursor-pointer">
                                <Image
                                    src="/icons/kukudealslogo-black.png"
                                    layout="fill"
                                    alt="kuku logo"
                                />
                            </div>
                        </div>
                        <div className="flex  items-center space-x-3">
                            <a
                                href=""
                                className="py-4  text-[#4a4a4a] font-bold hover:text-red-400 "
                            >
                                {t.products}
                            </a>
                            <a
                                href=""
                                className="py-4 px-3  text-[#4a4a4a] font-bold hover:text-red-400"
                            >
                                {t.winners}
                            </a>
                        </div>
                    </div>
                    <div className="flex items-center space-x-6 pr-4 ">
                        <a
                            href=""
                            className="py-4 px-3 text-[#4a4a4a] font-medium hover:text-red-400"
                        >
                            {t.need_help}
                        </a>
                        <a href="" className="py-4 px-3 font-medium text-[#0073ff] ">
                            <b>{t.call}</b>
                        </a>
                        <a href=""
                            className="py-4 px-3  text-[#4a4a4a] font-medium hover:text-red-400"
                            onClick={props.handleDirection}
                        // onClick={()=> i18next.changeLanguage(languages.code)}
                        >
                            العربية
                        </a>

                        <a
                            href=""
                            className="py-2 px-3 text-[#4a4a4a] font-medium hover:text-red-400 "
                        >
                            {t.register}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
