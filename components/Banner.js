export default function Banner() {
  return (
    <div className="py-2">
      <div className="container bg-white mx-auto py-1 w-full h-96 bg-cover bg-no-repeat  rounded-[30px] bg-[url('/icons/banner.png')] ">
        <div>
          <div>
            <div className="flex justify-end">
              <div className="pr-80 py-16">
                <div className="text-[#f22] font-[1000] text-8xl italic">
                  Win
                </div>
                <div className="text-white font-[800] text-3xl flex">
                  All-new 2021 Ford Bronco
                </div>
                <div className="text-white font-medium text-3xl pb-8">
                  Buy our Twain Set
                  <br />
                  and make it yours!
                </div>
                <button className="bg-white text-red-500 font-bold text-lg hover:bg-gray-200  rounded-[15px] w-44 h-14">
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
