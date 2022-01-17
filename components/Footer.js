import Image from "next/image";

export default function Footer() {
  return (
    <>
      <footer className="pb-2">
        <div className="container bg-white mx-auto py-2 px-4 rounded-[15px]">
          <div className=" p-4 flex justify-between">
            <div className="flex tracking-tight	">
              <div className="pr-10 ">
                <div className="font-medium text-lg text-gray-700 font-medium cursor-pointer hover:text-red-400">
                  Quick Links
                </div>
                <ul className="text-base  pt-3 leading-extra-loose	">
                  <li>
                    <a className="text-gray-700 cursor-pointer hover:text-red-400  ">
                      About Kuku
                    </a>
                  </li>
                  <li>
                    <a className="text-gray-700  cursor-pointer hover:text-red-400">
                      My Account
                    </a>
                  </li>
                  <li>
                    <a className="text-gray-700  cursor-pointer hover:text-red-400">
                      Active Tickets
                    </a>
                  </li>
                </ul>
              </div>

              <div className="pl-20">
                <div className=" text-lg text-gray-700 font-medium cursor-pointer hover:text-red-400">
                  Customer Service
                </div>
                <ul className="text-base  pt-3 leading-extra-loose	">
                  <li>
                    <a className="text-gray-700  cursor-pointer hover:text-red-400">
                      Contact Us
                    </a>
                  </li>
                  <li>
                    <a className="text-gray-700  cursor-pointer hover:text-red-400">
                      FAQs
                    </a>
                  </li>
                  <li>
                    <a className="text-gray-700  cursor-pointer hover:text-red-400">
                      How it Works
                    </a>
                  </li>
                  <li>
                    <a className="text-gray-700  cursor-pointer hover:text-red-400">
                      Charities
                    </a>
                  </li>
                  <li>
                    <a className="text-gray-700  cursor-pointer hover:text-red-400">
                      Campaign Draw Terms &amp; Conditions
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="">
              <ul className=" flex space-x-6 justify-center pl-6">
                <li>
                  <a className="">
                    <svg
                      width="53"
                      height="52"
                      className="cursor-pointer bg-gray-100 hover:bg-red-400 rounded-full"
                    >
                      <path d="M32.477 26.485H28.62V40h-5.842V26.485H20v-5.11h2.779v-3.307c0-2.365 1.09-6.068 5.894-6.068l4.327.019v4.96h-3.14c-.515 0-1.239.265-1.239 1.393v3.008h4.366l-.51 5.105z"></path>
                    </svg>
                  </a>
                </li>
                <li>
                  <a className="">
                    <svg
                      width="53"
                      height="52"
                      className="cursor-pointer bg-gray-100 hover:bg-red-400 rounded-full"
                    >
                      <path
                        d="M41 18.486c-.993.421-2.061.707-3.182.834 1.144-.656 2.022-1.694 2.436-2.933a11.396 11.396 0 01-3.517 1.287A5.653 5.653 0 0032.692 16c-3.058 0-5.539 2.374-5.539 5.302 0 .415.05.82.144 1.208-4.604-.221-8.686-2.332-11.418-5.54a5.107 5.107 0 00-.75 2.665c0 1.84.979 3.463 2.464 4.413a5.69 5.69 0 01-2.509-.664v.067c0 2.57 1.91 4.712 4.444 5.198a5.751 5.751 0 01-2.502.092c.705 2.106 2.75 3.639 5.175 3.682a11.434 11.434 0 01-6.88 2.27c-.446 0-.889-.026-1.321-.075A16.183 16.183 0 0022.49 37c10.19 0 15.762-8.078 15.762-15.084 0-.23-.006-.46-.017-.686A10.98 10.98 0 0041 18.486z"
                        fill="#000000"
                      ></path>
                    </svg>
                  </a>
                </li>
                <li>
                  <a className="">
                    <svg
                      width="52"
                      height="51"
                      className="cursor-pointer bg-gray-100 hover:bg-red-400 rounded-full"
                    >
                      <path d="M17.17 10C15.255 10 14 11.404 14 13.25c0 1.805 1.218 3.25 3.097 3.25h.037c1.954 0 3.169-1.445 3.169-3.25-.037-1.846-1.215-3.25-3.132-3.25zM40 25.984V36h-5.42v-9.344c0-2.347-.783-3.949-2.745-3.949-1.498 0-2.387 1.079-2.78 2.123-.143.374-.18.892-.18 1.416V36h-5.42s.072-15.827 0-17.465h5.42v2.475c-.005.01-.01.018-.017.027a.326.326 0 00-.018.03h.035v-.057c.72-1.187 2.005-2.885 4.886-2.885 3.566 0 6.239 2.496 6.239 7.86zM19.515 36H14V18.937h5.515V36z"></path>
                    </svg>
                  </a>
                </li>
                <li>
                  <a className="">
                    <svg
                      width="52"
                      height="52"
                      className="cursor-pointer bg-gray-100 hover:bg-red-400 rounded-full"
                    >
                      <path d="M19.72 12h11.83c4.808 0 8.72 3.912 8.72 8.72v11.83c0 4.808-3.912 8.72-8.72 8.72H19.72c-4.808 0-8.72-3.912-8.72-8.72V20.72c0-4.808 3.912-8.72 8.72-8.72zm11.83 26.325a5.775 5.775 0 005.775-5.775V20.72a5.775 5.775 0 00-5.775-5.775H19.72a5.775 5.775 0 00-5.775 5.775v11.83a5.775 5.775 0 005.775 5.775h11.83z"></path>
                      <path d="M18.12 26.634c0-4.143 3.37-7.515 7.514-7.515s7.516 3.371 7.516 7.515-3.372 7.516-7.516 7.516c-4.143 0-7.515-3.372-7.515-7.516zm2.922 0a4.592 4.592 0 109.184 0 4.592 4.592 0 00-9.184 0z"></path>
                    </svg>
                  </a>
                </li>
                <li>
                  <a className="whatsapp">
                    <svg
                      width="52"
                      height="52"
                      className="cursor-pointer bg-gray-100 hover:bg-red-400 rounded-full"
                    >
                      <path d="M41 25.614c0 8.07-6.593 14.613-14.727 14.613-2.583 0-5.009-.66-7.12-1.818L11 41l2.658-7.84a14.46 14.46 0 01-2.113-7.546C11.545 17.543 18.139 11 26.273 11 34.408 11 41 17.543 41 25.614zM26.273 13.327c-6.828 0-12.382 5.512-12.382 12.287 0 2.688.876 5.178 2.358 7.203l-1.547 4.563 4.759-1.512a12.374 12.374 0 006.812 2.032c6.827 0 12.382-5.511 12.382-12.286 0-6.774-5.555-12.287-12.382-12.287zm6.94 15.33c.253.12.423.202.497.322.09.15.09.867-.21 1.704-.303.836-1.777 1.643-2.438 1.702-.113.01-.207.033-.304.056-.466.112-.987.237-4.028-.951-3.392-1.325-5.627-4.616-6.09-5.295-.037-.056-.063-.095-.077-.113-.184-.242-1.474-1.943-1.474-3.704 0-1.649.816-2.514 1.192-2.912a7.41 7.41 0 00.071-.076c.331-.358.722-.448.963-.448.124 0 .249.008.37.016.112.007.22.014.322.014l.08-.003c.203-.013.467-.03.732.6l.384.926c.315.76.668 1.612.73 1.734.09.18.15.388.03.627l-.05.098c-.09.186-.156.32-.311.5l-.184.218c-.124.151-.25.302-.358.41-.18.178-.369.371-.158.73.21.359.935 1.53 2.008 2.48 1.154 1.021 2.157 1.453 2.665 1.671.099.043.179.078.238.107.361.179.571.149.782-.09.211-.24.903-1.046 1.143-1.405.24-.358.482-.298.813-.179.33.12 2.105.986 2.467 1.165l.195.095z"></path>
                    </svg>
                  </a>
                </li>
              </ul>
              <p className="flex justify-center p-3 mt-2 text-sm">
                Download the Kuku app for the ultimate <br /> shopping
                experience!
              </p>
              <ul className="space-x-10 flex justify-center  pt-2">
                <li className=" h-12 w-36 relative ">
                  <Image
                    src="/icons/footerIcons/appstore.png"
                    layout="fill"
                    alt="googleplay logo"
                  />
                </li>
                <li className=" h-12 w-36 relative">
                  <Image
                    src="/icons/footerIcons/google play.png"
                    layout="fill"
                    alt="googleplay logo"
                  />
                </li>
              </ul>

              <div className="pt-5">
                <div className=" w-[23rem] h-12 relative ">
                  <Image
                    src="/icons/footerIcons/Islamic.png"
                    layout="fill"
                    alt="isalmic logo"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <footer className="py-2">
        <div className="pl-4 pr-5 container bg-white mx-auto  rounded-[15px] pb-2 ">
          <div className="flex justify-between pt-6">
            <div className=" flex space-x-6 items-center">
              <div className="flex text-center">
              <div className="flex items-center w-20 h-7 relative cursor-pointer">
                  <Image
                    src="/icons/kukudealslogo-black.png"
                    layout="fill"
                    alt="kuku logo"
                  />
                </div>
              </div>
              <p className="text-xs">© 2022. All rights reserved</p>
              <ul className="flex space-x-6 text-xs">
                <li className="cursor-pointer hover:text-red-400">
                  <a>User Agreement</a>
                </li>
                <li className="cursor-pointer hover:text-red-400">
                  <a>Privacy Policy</a>
                </li>
              </ul>
            </div>
            <div className="flex text-xs">
              <ul className="flex space-x-2 items-center">
                <li className="">We accept</li>
                <li className=" h-6  w-9 relative ">
                  <Image
                    src="/icons/footerIcons/pay.png"
                    layout="fill"
                    alt="g pay logo"
                  />
                </li>
                <li className="h-6  w-9 relative ">
                  <Image
                    src="/icons/footerIcons/Visa.png"
                    layout="fill"
                    alt="g pay logo"
                  />
                </li>
                <li className=" h-6  w-9 relative ">
                  <Image
                    src="/icons/footerIcons/Mastercard.png"
                    layout="fill"
                    alt="g pay logo"
                  />
                </li>
                <li className=" h-6  w-9 relative ">
                  <Image
                    src="/icons/footerIcons/American-express.png"
                    layout="fill"
                    alt="g pay logo"
                  />
                </li>
                <li className=" h-6  w-9 relative ">
                  <Image
                    src="/icons/footerIcons/gpay.png"
                    layout="fill"
                    alt="g pay logo"
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
