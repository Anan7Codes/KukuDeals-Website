import { Fragment, useState } from "react";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { useRouter } from "next/router";
import { supabase } from "@/utils/supabaseClient";
import { Dialog, Transition } from "@headlessui/react";

function Navbar() {
  const  { t, i18n } = useTranslation()
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const userInfo = supabase.auth.user();

  return (
    <nav className="pb-2 relative">
      <div className="bg-[#2c2c2c] mx-auto rounded-[10px]">
        <div className={`flex justify-between text-sm`}>
          <div className={`flex space-x-6 pl-2`}>
            <div className="flex text-center p-2">
              <div className="flex items-center w-28 h-10 relative cursor-pointer" onClick={() => router.push('/')}>
                <Image
                  src="/icons/kukudeals-white.png"
                  layout="fill"
                  alt="kuku logo"
                />
              </div>
            </div>
            {/* <div className="hidden lg:flex items-center space-x-3">
              <a
                href=""
                className="py-4 px-3 text-white font-bold hover:text-[#ffd601]"
              >
                WINNERS
              </a>
            </div> */}
          </div>
          <div className="hidden lg:flex items-center space-x-6 pr-4">
            {/* <a
              href=""
              className="py-4 px-3 text-white font-medium hover:text-[#ffd601]"
            >
              Need Help? Contact us
            </a>
            <a href="" className="py-4 px-3 font-medium text-[#ffd601]">
              <b>Call 0800-KUKU</b>
            </a> */}

            <div
              onClick={() => router.locale === 'ar' ? router.push(`${router.asPath}`, undefined, { locale: 'en' }) : router.push(`${router.asPath}`, undefined, { locale: 'ar' }) }
              className={`py-4 px-3 hover:cursor-pointer text-white font-medium hover:text-[#ffd601]`}
            >
              {i18n.language === 'en' ? "العربية" : "English"}
            </div>
            <p
              className={`py-2 px-3 text-white font-medium hover:text-[#ffd601] hover:cursor-pointer`}
              onClick={() => userInfo ? router.push("/profile/personal-details") : router.push('/signin')}
            >
              {userInfo ? userInfo.user_metadata.name : t('login-register')}
            </p>
          </div>
          <div className={`lg:hidden flex items-center ${i18n.language === 'ar' ? 'pl-4' : 'pr-4'}`}>
            <p className={`${i18n.language === 'ar' ? 'pl-4' : 'pr-4'} text-white font-medium cursor-pointer`} onClick={() => { setIsOpen(true) }}>{t('download-app')}</p>
            <svg
              onClick={() => setShowMenu(true)}
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white hover:cursor-pointer hover:text-[#ffd601]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="fixed lg:hidden inset-0 z-10" onClose={() => { setIsOpen(false) }}>
              <div className="min-h-screen ml-6 mr-6 text-center ">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Dialog.Overlay className="fixed inset-0" />
                </Transition.Child>

                <span
                  className="inline-block h-screen align-middle"
                  aria-hidden="true"
                >
                  &#8203;
                </span>
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                  style={{ backgroundColor: "#161616" }}
                >
                  <div className="inline-block w-full max-w-md  pt-3 py-4 my-8 text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                    <div className="flex justify-end">
                      <button
                        type="button"
                        className="px-4 bg-[#161616] text-white border border-transparent rounded-md hover:text-[#ffd601] focus:outline-none  focus-visible:ring-[#ffd601]"
                        onClick={() => { setIsOpen(false) }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                    <div className="my-2">
                      <div className="relative flex justify-center items-center mb-4 h-12">
                        <Image
                          src="/icons/footerIcons/playstore.svg"
                          layout="fill"
                          alt="googleplay logo"
                        />
                      </div>
                      <div className="relative flex justify-center items-center h-12">
                        <Image
                          src="/icons/footerIcons/appstore.svg"
                          layout="fill"
                          alt="googleplay logo"
                        />
                      </div>
                    </div>
                  </div>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition>
        </div>
        {showMenu ? (
          <div className="absolute top-0 bg-[#2c2c2c] px-4 rounded-[15px] w-full z-30">
            <div className="relative h-full w-full">
              <div className="flex items-center my-2 w-28 h-10 relative cursor-pointer">
                <Image
                  src="/icons/kukudeals-white.png"
                  layout="fill"
                  alt="Kuku logo"
                />
              </div>
              {/* <p className="font-medium text-sm text-white mb-2 hover:cursor-pointer hover:text-yellow-500">
                Winners
              </p> */}
              <p
                onClick={() => router.locale === 'ar' ? router.push(`${router.asPath}`, undefined, { locale: 'en' }) : router.push(`${router.asPath}`, undefined, { locale: 'ar' }) } 
                className="font-medium text-sm text-white mb-2 hover:cursor-pointer hover:text-yellow-500">
                {i18n.language === 'en' ? "العربية" : "English"}
              </p>
              <p
                className={`font-medium text-sm text-white mb-4 hover:cursor-pointer hover:text-yellow-500`}
                onClick={() => userInfo ? router.push("/profile/personal-details") : router.push('/signin')}
              >
                {userInfo ? userInfo.user_metadata.name : t('login-register')}
              </p>

              <svg
                onClick={() => setShowMenu(false)}
                xmlns="http://www.w3.org/2000/svg"
                className={`absolute top-0 ${i18n.language === 'ar' ? 'left-0' : 'right-0'} h-6 w-6 text-white hover:cursor-pointer hover:text-yellow-500`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        ) : null}
      </div>
    </nav>
  );
}

export default Navbar;
