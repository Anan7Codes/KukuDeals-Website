import React from "react";

export default function Banner() {
  return (
    <div className="bg-gray-300 py-2">
      <div class="container bg-white mx-auto py-1 w-full h-96 bg-cover bg-no-repeat  rounded-[30px] bg-[url('/icons/banner.png')] ">
        <div>
          <div>
            <div class="flex justify-end">
              <div className="pr-96 py-20">
                <div className="text-red-600 font-bold text-7xl italic">
                  Win
                </div>
                <div className="text-white font-bold text-3xl flex">
                  All-new 2021 Ford Bronco
                </div>
                <div className="text-white text-2xl pb-8">
                  Buy our Twain Set
                  <br />
                  and make it yours!
                </div>
                <button class="bg-white text-red-500 font-medium text-xl hover:bg-gray-200  rounded-[15px] w-44 h-14">
                  See details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
