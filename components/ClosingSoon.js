import Image from "next/image";

export default function ClosingSoon() {
  return (
    <div className="w-[16rem] h-[20rem] bg-white rounded-[15px] overflow-hidden shadow-lg transition ease-in-out delay-100  hover:-translate-y-1 hover:scale-105  duration-900 ">
      <div className="pt-4 mx-auto text-center">654 sold out of 725</div>
      <div className="relative px-4">
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-[25px] bg-gray-200">
          <div
            style={{ width: "30%" }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-amber-500"
          ></div>
        </div>
      </div>
      <div className=" py-3 px-3 flex items-center w-full h-28 relative cursor-pointer">
        <Image
          src="/icons/products/product.png"
          layout="fill"
          alt="product logo"
        />
      </div>
      <div className="px-6 py-4 text-center tracking-tight ">
        <div className="font-bold text-xl ">
          Get a chance to
          <span className="text-red-500 italic">Win</span>
        </div>
        <p className="text-gray-700 text-base font-bold">AED 25,000 Cash</p>
      </div>
      <div className="  text-center">
        <button className="w-36 h-10  border-2 border-black rounded-[20px]  text-sm font-semibold hover:bg-blue-500 hover:text-white hover:font-bold hover:border-none text-gray-700 mr-2 mb-2">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
