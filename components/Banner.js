export default function Banner() {
  return (
    <div className="py-2">
      <div className="container bg-white mx-auto py-1 w-full h-80 bg-cover bg-no-repeat rounded-[30px] bg-[url('/icons/banner.png')] ">
        <div>
          <div>
            <div className="flex justify-end">
              <div className="pr-60 py-14 tracking-tight		">
                <div className="text-[#f22] font-[800] text-7xl italic">
                  Win
                </div>
                <div className="text-white font-[1000] leading-6	text-2xl flex">
                  All-new 2021 Ford Bronco
                </div>
                <div className="text-white font-medium leading-6 text-2xl pb-4">
                  Buy our Twain Set
                  <br />
                  and make it yours!
                </div>
                <button className="bg-white text-red-500 font-medium text-base hover:bg-gray-200 rounded-[10px] w-36 h-12">
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
